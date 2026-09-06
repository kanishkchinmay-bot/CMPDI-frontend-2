import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Bot, User, FileText, ChevronDown, Sparkles, AlertCircle } from "lucide-react";
import { useApp } from "../../context/AppContext";

/* Very simple keyword-based mock AI responses */
const generateAnswer = (question, records) => {
  const q = question.toLowerCase();
  const validated = records.filter((r) => r.status === "validated");

  if (validated.length === 0) return null; // triggers empty state

  // Production questions
  if (q.includes("production") || q.includes("produced") || q.includes("output")) {
    const sorted = [...validated].sort((a, b) => parseFloat(b.production) - parseFloat(a.production));
    const top = sorted[0];
    return {
      answer: `The highest production on record is **${top.production}** from **${top.project}** (${top.year}). Across all ${validated.length} validated records, total production sums to approximately ${validated.reduce((s, r) => s + parseFloat(r.production), 0).toFixed(2)} MT.`,
      sources: sorted.slice(0, 3).map((r) => ({ docName: r.docName, page: r.sourcePage, snippet: r.sourceSnippet })),
    };
  }

  // Reserve questions
  if (q.includes("reserve") || q.includes("reserves") || q.includes("resource")) {
    const sorted = [...validated].sort((a, b) => parseFloat(b.reserve) - parseFloat(a.reserve));
    const top = sorted[0];
    return {
      answer: `The largest reserve is **${top.reserve}** at **${top.project}**. Total combined reserves across validated records: **${validated.reduce((s, r) => s + parseFloat(r.reserve), 0).toFixed(1)} MT**.`,
      sources: sorted.slice(0, 2).map((r) => ({ docName: r.docName, page: r.sourcePage, snippet: r.sourceSnippet })),
    };
  }

  // Specific project lookup
  const projectMatch = validated.find((r) =>
    r.project.toLowerCase().split(" ").some((w) => q.includes(w) && w.length > 3)
  );
  if (projectMatch) {
    return {
      answer: `**${projectMatch.project}** (${projectMatch.year}): Production = ${projectMatch.production}, Reserve = ${projectMatch.reserve}.`,
      sources: [{ docName: projectMatch.docName, page: projectMatch.sourcePage, snippet: projectMatch.sourceSnippet }],
    };
  }

  // Summary / generic
  return {
    answer: `Based on ${validated.length} validated records from ${new Set(validated.map((r) => r.docId)).size} documents:\n\n• Total Production: ${validated.reduce((s, r) => s + parseFloat(r.production), 0).toFixed(2)} MT\n• Total Reserves: ${validated.reduce((s, r) => s + parseFloat(r.reserve), 0).toFixed(1)} MT\n• Projects covered: ${validated.map((r) => r.project).join(", ")}`,
    sources: validated.slice(0, 2).map((r) => ({ docName: r.docName, page: r.sourcePage, snippet: r.sourceSnippet })),
  };
};

const SUGGESTIONS = [
  "What is the total production across all projects?",
  "Which project has the largest coal reserve?",
  "Show me Jharia Block IV production figures",
  "Summarize all validated records",
];

const Assistant = () => {
  const navigate = useNavigate();
  const { records } = useApp();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const validated = records.filter((r) => r.status === "validated");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (question) => {
    const q = question || input.trim();
    if (!q) return;
    setInput("");

    const userMsg = { role: "user", text: q, id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    setTimeout(() => {
      const result = generateAnswer(q, records);
      if (!result) {
        setMessages((prev) => [...prev, {
          role: "assistant", id: Date.now() + 1,
          text: "No validated data found. Please upload documents and approve records before asking questions.",
          sources: [], empty: true,
        }]);
      } else {
        setMessages((prev) => [...prev, {
          role: "assistant", id: Date.now() + 1,
          text: result.answer, sources: result.sources,
        }]);
      }
      setLoading(false);
    }, 900);
  };

  return (
    <div className="space-y-5 pb-10 flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-extrabold text-[#1E293B] tracking-tight">AI Assistant</h1>
          <p className="text-sm text-[#64748B] mt-1">Ask questions about validated geological records.</p>
        </div>
        <div className="self-start neu-inset px-4 py-2 rounded-xl text-xs font-bold text-[#1E293B] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          {validated.length} validated records available
        </div>
      </div>

      {/* No validated data warning */}
      {validated.length === 0 && (
        <div className="neu-card p-8 text-center space-y-3">
          <AlertCircle size={32} className="text-[#94A3B8] mx-auto" />
          <h3 className="text-base font-bold text-[#1E293B]">No Validated Data Found</h3>
          <p className="text-sm text-[#64748B] max-w-sm mx-auto">
            Upload documents and approve extracted records before asking questions.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => navigate("/documents")}
              className="neu-btn px-4 py-2 rounded-xl text-xs font-bold text-[#1E293B] cursor-pointer">
              Upload Document
            </button>
            <button onClick={() => navigate("/validation")}
              className="neu-btn-dark px-4 py-2 rounded-xl text-xs font-bold text-white cursor-pointer">
              Review Queue
            </button>
          </div>
        </div>
      )}

      {/* Chat Area */}
      {validated.length > 0 && (
        <>
          {/* Suggestion chips */}
          {messages.length === 0 && (
            <div className="neu-card p-5">
              <p className="text-xs font-bold text-[#64748B] mb-3 uppercase tracking-wider">Suggested Questions</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => sendMessage(s)}
                    className="neu-btn px-3.5 py-2 rounded-xl text-xs font-semibold text-[#475569] hover:text-[#1E293B] cursor-pointer">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="neu-inset rounded-2xl p-4 space-y-4 min-h-[280px] max-h-[420px] overflow-y-auto flex flex-col">
            {messages.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 opacity-50">
                <Bot size={32} className="text-[#94A3B8]" />
                <p className="text-sm text-[#64748B]">Ask a question about the validated records above.</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0
                  ${msg.role === "user"
                    ? "bg-[#1E293B] text-white"
                    : "bg-[#E8EDF5] shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(163,177,198,0.4)] text-[#475569]"
                  }`}>
                  {msg.role === "user" ? <User size={15} /> : <Sparkles size={15} />}
                </div>
                <div className={`flex-1 max-w-xl ${msg.role === "user" ? "text-right" : ""}`}>
                  <div className={`inline-block p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap
                    ${msg.role === "user"
                      ? "bg-[#1E293B] text-white shadow-[2px_2px_8px_rgba(30,41,59,0.3)]"
                      : msg.empty
                        ? "bg-amber-500/10 border border-amber-500/20 text-amber-800"
                        : "bg-[#E8EDF5] shadow-[-2px_-2px_6px_rgba(255,255,255,0.9),2px_2px_6px_rgba(163,177,198,0.35)] text-[#1E293B]"
                    }`}>
                    {msg.text}
                  </div>
                  {/* Source citations */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {msg.sources.map((src, i) => (
                        <div key={i} className="text-[10px] text-[#64748B] bg-[#E8EDF5] rounded-lg px-3 py-2 border border-[#D5DEE8] text-left">
                          <span className="font-bold text-[#475569]">📄 {src.docName}</span>
                          {" "}· Page {src.page}
                          <p className="mt-0.5 italic text-[#94A3B8] line-clamp-2">{src.snippet}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#E8EDF5] shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(163,177,198,0.4)] flex items-center justify-center text-[#475569] shrink-0">
                  <Sparkles size={15} />
                </div>
                <div className="neu-card px-4 py-3 flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-3">
            <div className="neu-inset flex items-center gap-3 flex-1 px-4 py-3 rounded-2xl">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Ask about production, reserves, or specific projects…"
                className="flex-1 bg-transparent outline-none border-none text-xs text-[#1E293B] placeholder-[#64748B]"
              />
            </div>
            <button onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-11 h-11 rounded-2xl neu-btn-dark text-white flex items-center justify-center disabled:opacity-50 cursor-pointer">
              <Send size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Assistant;