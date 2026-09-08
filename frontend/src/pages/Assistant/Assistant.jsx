import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bot,
  Send,
  Sparkles,
  FileText,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Copy,
  Loader,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const SUGGESTED_QUERIES = [
  "BCCL Jharia Seam IX/X FY22-23 Production & Reserves",
  "Compare FY23: SECL Gevra vs Kusmunda OCP",
];

const Assistant = () => {
  const navigate = useNavigate();
  const { records, pendingCount } = useApp();

  const [question, setQuestion] = useState(
    "What was the total coal production and estimated reserves for BCCL Jharia Seam IX/X in FY 2022-23, and how does it compare with SECL Gevra?"
  );

  const [activeResponse, setActiveResponse] = useState({
    text: "According to verified audit records, BCCL Jharia Seam IX/X recorded an actual production of 4.85 Million Tonnes (MT) with estimated proved reserves of 38.20 MT in FY 2022-23. By comparison, SECL Gevra Expansion OCP produced 52.50 MT with reserves of 410.00 MT.",
    citations: [
      {
        docName: "CMPDI_BCCL_Jharia_Coalfield_FY23.pdf",
        page: 4,
        location: "Table 2.1, Row 3",
        snippet: "...Seam IX/X - Grade W-IV | Actual: 4.85 MT | Reserve: 38.20 MT...",
        status: "Validated Record",
      },
      {
        docName: "SECL_Gevra_Annual_2023.pdf",
        page: 12,
        location: "Section 4 Summary",
        snippet: "...Gevra OCP FY23 dispatch and extraction total: 52.50 MT...",
        status: "Validated Record",
      },
    ],
    notFound: false,
  });

  const [isQuerying, setIsQuerying] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAsk = (queryToAsk) => {
    const q = queryToAsk || question;
    if (!q.trim()) return;

    setIsQuerying(true);
    setTimeout(() => {
      const qLower = q.toLowerCase();

      if (qLower.includes("block 7") || qLower.includes("projected") || qLower.includes("unapproved")) {
        setActiveResponse({
          text: null,
          citations: [],
          notFound: true,
          queryTerm: "Block 7",
        });
        setIsQuerying(false);
        return;
      }

      const validatedRecords = records.filter((r) => r.status === "validated");

      if (qLower.includes("jharia") && qLower.includes("gevra")) {
        setActiveResponse({
          text: "According to verified audit records, BCCL Jharia Seam IX/X recorded an actual production of 4.85 Million Tonnes (MT) with estimated proved reserves of 38.20 MT in FY 2022-23. By comparison, SECL Gevra Expansion OCP produced 52.50 MT with reserves of 410.00 MT.",
          citations: [
            {
              docName: "CMPDI_BCCL_Jharia_Coalfield_FY23.pdf",
              page: 4,
              location: "Table 2.1, Row 3",
              snippet: "...Seam IX/X - Grade W-IV | Actual: 4.85 MT | Reserve: 38.20 MT...",
              status: "Validated Record",
            },
            {
              docName: "SECL_Gevra_Annual_2023.pdf",
              page: 12,
              location: "Section 4 Summary",
              snippet: "...Gevra OCP FY23 dispatch and extraction total: 52.50 MT...",
              status: "Validated Record",
            },
          ],
          notFound: false,
        });
      } else if (qLower.includes("gevra") && qLower.includes("kusmunda")) {
        setActiveResponse({
          text: "In FY 2022-23, SECL Gevra Expansion OCP recorded total production of 52.50 MT against certified proved reserves of 410.00 MT. SECL Kusmunda Opencast reported an annual extraction of 43.20 MT with proved reserves of 320.50 MT.",
          citations: [
            {
              docName: "SECL_Gevra_2023.pdf",
              page: 12,
              location: "Section 4 Summary",
              snippet: "...Gevra OCP FY23 dispatch and extraction total: 52.50 MT...",
              status: "Validated Record",
            },
            {
              docName: "SECL_Kusmunda.pdf",
              page: 8,
              location: "Table 3.2: Production & Stock",
              snippet: "...Kusmunda Opencast Pit #3 extraction reached 43.20 MT. Block proved geological reserve: 320.50 MT...",
              status: "Validated Record",
            },
          ],
          notFound: false,
        });
      } else {
        const matched = validatedRecords.filter((r) =>
          qLower.split(" ").some((w) => w.length > 3 && r.project.toLowerCase().includes(w))
        );

        if (matched.length > 0) {
          const rec = matched[0];
          setActiveResponse({
            text: `Based on verified audit records, ${rec.project} (${rec.subsidiary}) reported production of ${rec.production} and proved geological reserves of ${rec.reserve} in ${rec.year}.`,
            citations: [
              {
                docName: rec.docName,
                page: rec.sourcePage,
                location: rec.sourceTable,
                snippet: rec.sourceSnippet,
                status: "Validated Record",
              },
            ],
            notFound: false,
          });
        } else {
          setActiveResponse({
            text: null,
            citations: [],
            notFound: true,
            queryTerm: q,
          });
        }
      }

      setIsQuerying(false);
    }, 600);
  };

  const handleCopy = () => {
    if (activeResponse.text) {
      navigator.clipboard.writeText(activeResponse.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* ── STATUTORY NOTICE BANNER ── */}
      <div className="neu-card-sm p-4 text-xs space-y-1">
        <div className="flex items-center gap-2 text-[#1E293B] font-extrabold uppercase tracking-wide">
          <ShieldCheck size={16} className="text-[#10B981]" />
          <span>Notice: AI Explains Validated Records. It Does Not Create Numerical Data.</span>
        </div>
        <p className="text-[#64748B] text-[11.5px] leading-relaxed">
          All numeric metrics, tonnage calculations, and mine parameters reflect cryptographically hashed, signed audits from GeoMine Insights repository.
        </p>
      </div>

      {/* ── TWO-COLUMN LAYOUT: Assistant Query & Strict Guardrails ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (8 cols): Query Input & Answer Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Query Box */}
          <div className="neu-card p-6 space-y-4">
            <div>
              <h2 className="text-xl font-extrabold text-[#1E293B]">
                Validated Inquiry Assistant
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Rapid natural-language retrieval over verified coal reserves and production data
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-2">
                Natural Language Query
              </label>
              <div className="relative">
                <div className="neu-inset p-3.5">
                  <textarea
                    rows={3}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask about coal production, verified reserves, or colliery comparisons…"
                    className="w-full bg-transparent outline-none border-none text-xs text-[#1E293B] resize-none leading-relaxed font-medium"
                  />
                </div>
                <button
                  onClick={() => handleAsk()}
                  disabled={isQuerying}
                  className="neu-btn-dark absolute bottom-3 right-3 px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isQuerying ? <Loader size={13} className="animate-spin" /> : <Send size={13} />}
                  <span>Ask AI</span>
                </button>
              </div>
            </div>

            {/* Exactly TWO suggested queries */}
            <div className="pt-2 border-t border-[#D5DEE8]/60">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block mb-2">
                Suggested Queries:
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {SUGGESTED_QUERIES.map((qText, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuestion(qText);
                      handleAsk(qText);
                    }}
                    className="neu-btn px-3.5 py-2 rounded-xl text-xs font-bold text-[#1E293B] hover:text-[#10B981] cursor-pointer transition-all"
                  >
                    {qText}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Answer Area */}
          {activeResponse.notFound ? (
            /* Empty / Not Found State */
            <div className="neu-card p-6 border-l-4 border-rose-500 space-y-3">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
                <AlertTriangle size={16} />
                <span className="uppercase tracking-wide font-extrabold">No Validated Data Found</span>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                Queried entity exists only in raw draft uploads or has not passed mandatory Human Review. Unverified data cannot be synthesized, calculated, or cited in official GeoMine Insights/Coal India responses.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate("/validation")}
                  className="neu-btn-dark px-4 py-2 rounded-2xl text-xs font-bold text-white flex items-center gap-2 cursor-pointer"
                >
                  <span>Check Pending Review Queue ({pendingCount} Pending)</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ) : (
            /* Grounded Answer Card */
            <div className="neu-card p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#D5DEE8]/60">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#1E293B]">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="uppercase tracking-wider">Synthesized Official Response</span>
                  <span className="text-[10px] font-bold text-[#10B981] bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    100% Provenance Backed
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="neu-btn px-3 py-1 rounded-xl text-xs text-[#64748B] hover:text-[#1E293B] flex items-center gap-1 cursor-pointer"
                >
                  <Copy size={13} />
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#1E293B] leading-relaxed">
                {activeResponse.text}
              </p>

              {/* Source Evidence & Traceability Chain */}
              <div className="pt-4 border-t border-[#D5DEE8]/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E293B]">
                    <FileText size={14} />
                    <span>Source Evidence & Traceability Chain</span>
                  </div>
                  <span className="text-[10px] text-[#64748B]">
                    {activeResponse.citations.length} Verified Source Citations
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {activeResponse.citations.map((cite, idx) => (
                    <div key={idx} className="neu-card-sm p-4 space-y-2 text-xs">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5 font-bold text-[#1E293B]">
                          <FileText size={14} className="shrink-0" />
                          <span className="truncate max-w-[170px] text-[11.5px]">
                            {cite.docName}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold neu-inset px-2 py-0.5 rounded text-[#475569]">
                          Page {cite.page}
                        </span>
                      </div>

                      <div className="text-[10.5px] text-[#64748B]">
                        {cite.location}
                      </div>

                      <div className="neu-inset p-2.5 text-[11px] text-[#1E293B] italic leading-relaxed">
                        "{cite.snippet}"
                      </div>

                      <div className="flex items-center gap-1 text-[10px] font-bold text-[#10B981]">
                        <CheckCircle2 size={12} />
                        <span>{cite.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right (4 cols): Guardrails / Governance Info */}
        <div className="lg:col-span-4 neu-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#D5DEE8]/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E293B]">
              System Guardrails
            </h3>
            <span className="text-[10px] font-bold text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded-full">
              Strict Reject
            </span>
          </div>

          <p className="text-[11px] text-[#64748B] leading-relaxed">
            Strict governance simulation demonstrating retrieval refusal whenever queries target unapproved geological logs or raw draft field surveys.
          </p>

          <div className="neu-card-sm p-3.5 text-xs">
            <span className="text-[10px] font-bold uppercase text-[#64748B] block">
              Simulated Prohibited Inquiry:
            </span>
            <span className="text-xs italic text-[#1E293B] mt-1 block">
              "What is the projected 2025 output for unapproved Block 7?"
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-500/10 space-y-1.5 text-xs text-rose-900">
            <div className="flex items-center gap-1.5 font-bold text-rose-700">
              <AlertTriangle size={14} />
              <span>No Validated Data Found</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Queried entity 'Block 7' exists only in raw draft uploads and has not passed mandatory Human Review.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate("/validation")}
              className="neu-btn-dark w-full py-2.5 px-4 rounded-2xl text-xs font-bold text-white flex items-center justify-between cursor-pointer"
            >
              <span>Check Pending Review Queue</span>
              <span>{pendingCount} Pending →</span>
            </button>
          </div>

          <div className="pt-3 border-t border-[#D5DEE8]/60 text-[10.5px] text-[#64748B] leading-relaxed">
            <strong>Statutory Mandate:</strong> Zero synthetic generation policy strictly enforced under Coal Mines (Special Provisions) Act & GeoMine Insights Data Verification Standard.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;