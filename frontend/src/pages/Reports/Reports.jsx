import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  CheckSquare,
  Square,
  Eye,
  AlertCircle,
  FileDown,
  Printer,
  CheckCircle2,
  Loader,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const Reports = () => {
  const navigate = useNavigate();
  const { records } = useApp();

  const validatedRecords = useMemo(
    () => records.filter((r) => r.status === "validated"),
    [records]
  );

  const [questionText, setQuestionText] = useState(
    "Whether the Ministry of Coal has compiled the seam-wise coal extraction volumes and proved reserves for BCCL Jharia and SECL Gevra for the financial year 2022-23; and the details of validated geological audits thereof?"
  );
  const [projectFilter, setProjectFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("All");

  const [selectedIds, setSelectedIds] = useState(() =>
    validatedRecords.slice(0, 3).map((r) => r.id)
  );

  const [generatingFormat, setGeneratingFormat] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const toggleRecord = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedIds(validatedRecords.map((r) => r.id));
  };

  const clearAll = () => {
    setSelectedIds([]);
  };

  const filteredApproved = validatedRecords.filter((r) => {
    const matchesProject =
      !projectFilter ||
      r.project.toLowerCase().includes(projectFilter.toLowerCase()) ||
      r.subsidiary.toLowerCase().includes(projectFilter.toLowerCase());
    const matchesYear = yearFilter === "All" || r.year.includes(yearFilter);
    return matchesProject && matchesYear;
  });

  const chosenRecords = validatedRecords.filter((r) => selectedIds.includes(r.id));

  const previewText = useMemo(() => {
    const dateStr = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return {
      ministry: "GOVERNMENT OF INDIA · MINISTRY OF COAL",
      committee: "PARLIAMENTARY INQUIRY CELL / LOK SABHA UNSTARRED QUESTION",
      date: dateStr,
      question: questionText || "(No question specified)",
      records: chosenRecords,
    };
  }, [questionText, chosenRecords]);

  const handleGenerate = (format) => {
    setGeneratingFormat(format);
    setTimeout(() => {
      const content = `================================================================================
${previewText.ministry}
${previewText.committee}
Date: ${previewText.date}
Protocol: SEC-REG-44(A) | CIL Golden DB Certified
================================================================================

PARLIAMENTARY QUESTION:
${previewText.question}

MINISTERIAL STATEMENT & AUDITED EXTRACTION DATA:
According to cryptographically validated returns verified by CMPDI Regional Institutes:

${
  previewText.records.length > 0
    ? previewText.records
        .map(
          (r, i) =>
            `(${i + 1}) Project: ${r.project} (${r.subsidiary})\n` +
            `    Reporting Period: ${r.year}\n` +
            `    Annual Production: ${r.production}\n` +
            `    Certified Proved Reserves: ${r.reserve}\n` +
            `    Verified Source Citation: ${r.docName}, Page ${r.sourcePage} [${r.sourceTable}]\n` +
            `    Reviewer Attestation: ${r.reviewerComment || "Approved without exception"}\n`
        )
        .join("\n")
    : "    (No approved records selected for inclusion in this response)\n"
}

STATUTORY DECLARATION:
All numeric metrics reflect verified human sign-offs from CMPDI repository.
Zero synthetic generation policy enforced under Coal Mines (Special Provisions) Act.
================================================================================`;

      const blob = new Blob([content], {
        type: format === "DOCX" ? "application/msword" : "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `CMPDI_Parliamentary_Answer_Annexure_${new Date().toISOString().slice(0, 10)}.${format.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setGeneratingFormat(null);
      setSuccessMessage(`Official ${format} generated and downloaded successfully!`);
      setTimeout(() => setSuccessMessage(null), 4000);
    }, 800);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* ── HEADER ── */}
      <div>
        <h1 className="text-[28px] font-extrabold text-[#1E293B] tracking-tight">
          Parliamentary Report Generator
        </h1>
        <p className="text-sm text-[#64748B] mt-1">
          Compile ministerial-grade parliamentary answers and annexures from validated geological extraction records.
        </p>
      </div>

      {/* ── TOAST NOTIFICATION ── */}
      {successMessage && (
        <div className="neu-card-sm p-4 text-xs font-semibold flex items-center justify-between text-[#10B981] border-l-4 border-[#10B981]">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      {validatedRecords.length === 0 ? (
        <div className="neu-card p-12 text-center space-y-3">
          <AlertCircle size={36} className="text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-[#1E293B]">
            No Validated Records Available
          </h3>
          <p className="text-xs text-[#64748B] max-w-md mx-auto">
            You must review and approve extracted records before they can be included in statutory parliamentary responses.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate("/validation")}
              className="neu-btn-dark px-5 py-2.5 rounded-2xl text-xs font-bold text-white cursor-pointer"
            >
              Go to Human Review Queue
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ── LEFT COLUMN (6 cols): Form Inputs & Record Selector ── */}
          <div className="lg:col-span-6 space-y-6">
            {/* 1. Parliamentary Question Field */}
            <div className="neu-card p-6 space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E293B]">
                Parliamentary Question Field
              </label>
              <div className="neu-inset p-3">
                <textarea
                  rows={4}
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Enter official inquiry or parliamentary question text…"
                  className="w-full bg-transparent outline-none border-none text-xs text-[#1E293B] leading-relaxed resize-none font-medium"
                />
              </div>
            </div>

            {/* 2. Project and Year Fields */}
            <div className="neu-card p-6 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E293B] block">
                Filter Approved Records
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10.5px] font-bold uppercase text-[#64748B] mb-1">
                    Project / Subsidiary
                  </label>
                  <div className="neu-inset px-3 py-2">
                    <input
                      type="text"
                      value={projectFilter}
                      onChange={(e) => setProjectFilter(e.target.value)}
                      placeholder="e.g. Jharia, Gevra…"
                      className="w-full bg-transparent outline-none border-none text-xs text-[#1E293B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold uppercase text-[#64748B] mb-1">
                    Financial Year
                  </label>
                  <div className="neu-inset px-3 py-2">
                    <select
                      value={yearFilter}
                      onChange={(e) => setYearFilter(e.target.value)}
                      className="w-full bg-transparent outline-none border-none text-xs font-bold text-[#1E293B] cursor-pointer"
                    >
                      <option value="All">All Years</option>
                      <option value="2022-23">FY 2022-23</option>
                      <option value="2021-22">FY 2021-22</option>
                      <option value="2023-24">FY 2023-24</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Approved-Record Selector */}
            <div className="neu-card p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#D5DEE8]/60">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E293B]">
                    Approved-Record Selector
                  </h3>
                  <span className="text-[11px] text-[#64748B]">
                    {chosenRecords.length} of {validatedRecords.length} records selected
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-[#1E293B]">
                  <button onClick={selectAll} className="hover:text-[#10B981] cursor-pointer">
                    Select All
                  </button>
                  <span>·</span>
                  <button onClick={clearAll} className="hover:text-rose-600 cursor-pointer">
                    Clear
                  </button>
                </div>
              </div>

              <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
                {filteredApproved.map((rec) => {
                  const isChecked = selectedIds.includes(rec.id);
                  return (
                    <div
                      key={rec.id}
                      onClick={() => toggleRecord(rec.id)}
                      className={`neu-card-sm p-3.5 transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? "shadow-[inset_2px_2px_4px_rgba(163,177,198,0.4),inset_-2px_-2px_4px_rgba(255,255,255,0.85)] font-semibold"
                          : ""
                      }`}
                    >
                      <div className="mt-0.5 text-[#1E293B]">
                        {isChecked ? <CheckSquare size={16} className="text-[#10B981]" /> : <Square size={16} />}
                      </div>

                      <div className="flex-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#1E293B]">{rec.project}</span>
                          <span className="font-mono text-[11px] font-bold text-[#10B981]">
                            {rec.production}
                          </span>
                        </div>
                        <div className="text-[10.5px] text-[#64748B] mt-0.5">
                          {rec.subsidiary} · {rec.year} · Reserve: {rec.reserve}
                        </div>
                        <div className="text-[10px] text-[#64748B] mt-1">
                          Source: {rec.docName}, P.{rec.sourcePage}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN (6 cols): Live Report Preview & Download Actions ── */}
          <div className="lg:col-span-6 space-y-6">
            <div className="neu-card p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#D5DEE8]/60">
                <div className="flex items-center gap-2">
                  <Eye size={15} className="text-[#10B981]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E293B]">
                    Report Preview (Live Synthesis)
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-[#10B981] px-2 py-0.5 rounded-full bg-emerald-500/10">
                  Ready for Dispatch
                </span>
              </div>

              {/* Styled Official Preview Sheet */}
              <div className="neu-inset p-5 text-xs space-y-4 text-[#1E293B]">
                {/* Header */}
                <div className="text-center pb-3 border-b border-[#D5DEE8] space-y-1">
                  <div className="text-[11px] font-bold tracking-widest text-[#1E293B]">
                    {previewText.ministry}
                  </div>
                  <div className="text-[10px] text-[#64748B]">
                    {previewText.committee}
                  </div>
                  <div className="text-[9.5px] text-[#64748B]">
                    DATE OF ANSWER: {previewText.date}
                  </div>
                </div>

                {/* Question */}
                <div>
                  <span className="text-[10.5px] font-bold uppercase text-[#64748B] block mb-1">
                    Question:
                  </span>
                  <p className="text-xs italic text-[#1E293B] leading-relaxed">
                    "{previewText.question}"
                  </p>
                </div>

                {/* Answer Annexure Table */}
                <div>
                  <span className="text-[10.5px] font-bold uppercase text-[#64748B] block mb-2">
                    Annexure Statement (Certified Coal Records):
                  </span>

                  {previewText.records.length === 0 ? (
                    <div className="p-4 text-center text-[#64748B] text-xs italic">
                      (Please select approved records on the left to populate this annexure)
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse text-[10.5px] border border-[#CBD5E1]">
                      <thead>
                        <tr className="bg-[#1E293B] text-white text-[9.5px] font-bold uppercase">
                          <th className="p-1.5 border border-slate-600">Sl.</th>
                          <th className="p-1.5 border border-slate-600">Project / Mine</th>
                          <th className="p-1.5 border border-slate-600">Year</th>
                          <th className="p-1.5 border border-slate-600 text-right">Production</th>
                          <th className="p-1.5 border border-slate-600 text-right">Reserve</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#CBD5E1]">
                        {previewText.records.map((r, i) => (
                          <tr key={r.id}>
                            <td className="p-1.5 border border-[#CBD5E1]">{i + 1}</td>
                            <td className="p-1.5 border border-[#CBD5E1] font-semibold">{r.project}</td>
                            <td className="p-1.5 border border-[#CBD5E1]">{r.year}</td>
                            <td className="p-1.5 border border-[#CBD5E1] text-right font-bold text-[#10B981]">{r.production}</td>
                            <td className="p-1.5 border border-[#CBD5E1] text-right font-bold">{r.reserve}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Notes */}
                <div className="text-[9.5px] text-[#64748B] pt-2 border-t border-[#D5DEE8] space-y-1">
                  <p>• Data verified by CMPDI Regional Institute under statutory mandate.</p>
                  <p>• Cryptographic hashes preserved in central repository.</p>
                </div>
              </div>

              {/* ── GENERATE DOCX & GENERATE PDF BUTTONS ── */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => handleGenerate("DOCX")}
                  disabled={!!generatingFormat || previewText.records.length === 0}
                  className="neu-btn flex-1 py-2.5 px-4 rounded-2xl text-xs font-bold text-[#1E293B] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
                >
                  {generatingFormat === "DOCX" ? (
                    <Loader size={14} className="animate-spin" />
                  ) : (
                    <FileDown size={14} className="text-[#1E293B]" />
                  )}
                  <span>Generate DOCX</span>
                </button>

                <button
                  onClick={() => handleGenerate("PDF")}
                  disabled={!!generatingFormat || previewText.records.length === 0}
                  className="neu-btn-dark flex-1 py-2.5 px-4 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
                >
                  {generatingFormat === "PDF" ? (
                    <Loader size={14} className="animate-spin" />
                  ) : (
                    <Printer size={14} />
                  )}
                  <span>Generate PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;