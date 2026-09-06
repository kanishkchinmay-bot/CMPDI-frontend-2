import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Download, CheckSquare, Square, Eye, Sparkles, AlertCircle } from "lucide-react";
import { useApp } from "../../context/AppContext";

const generatePreview = (question, records) => {
  if (!question.trim() || records.length === 0) return null;
  return `MINISTRY OF COAL
Parliamentary Standing Committee on Energy & Mining
STARRED QUESTION

Q: ${question}

ANSWER (as on ${new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}):

${records.map((r, i) =>
  `(${i + 1}) ${r.project}: Production for FY ${r.year} was ${r.production}. Geological reserves stand at ${r.reserve}. (Source: ${r.docName}, Page ${r.sourcePage})`
).join("\n\n")}

NOTES:
• All figures sourced from validated CMPDI geological survey documents.
• Data extracted and validated through AI-assisted document processing.
• For further details, refer to the individual survey reports cited above.`;
};

const Reports = () => {
  const navigate = useNavigate();
  const { records } = useApp();
  const validated = records.filter((r) => r.status === "validated");

  const [question, setQuestion] = useState("");
  const [selected, setSelected] = useState([]);
  const [preview, setPreview] = useState(null);
  const [downloading, setDownloading] = useState(null);

  const toggle = (id) => {
    setSelected((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
    setPreview(null);
  };

  const selectAll = () => {
    setSelected(validated.map((r) => r.id));
    setPreview(null);
  };
  const clearAll = () => { setSelected([]); setPreview(null); };

  const selectedRecords = validated.filter((r) => selected.includes(r.id));

  const handlePreview = () => {
    const text = generatePreview(question, selectedRecords);
    setPreview(text);
  };

  const handleDownload = (fmt) => {
    if (!preview) return;
    setDownloading(fmt);
    setTimeout(() => {
      // Simulate download by creating a blob
      const blob = new Blob([preview], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `CMPDI_Parliamentary_Report.${fmt === "DOCX" ? "txt" : "txt"}`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloading(null);
    }, 800);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-[28px] font-extrabold text-[#1E293B] tracking-tight">Report Generator</h1>
        <p className="text-sm text-[#64748B] mt-1">Generate formatted parliamentary answers from validated geological records.</p>
      </div>

      {validated.length === 0 ? (
        <div className="neu-card p-12 text-center space-y-3">
          <AlertCircle size={32} className="text-[#D5DEE8] mx-auto" />
          <h3 className="text-base font-bold text-[#475569]">No Validated Records Available</h3>
          <p className="text-sm text-[#64748B]">Approve records in the Review Queue to use them in reports.</p>
          <button onClick={() => navigate("/validation")}
            className="mt-2 neu-btn px-5 py-2 rounded-xl text-xs font-bold text-[#1E293B] cursor-pointer">
            Go to Review Queue
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* LEFT: Inputs */}
          <div className="xl:col-span-2 space-y-5">
            {/* Parliamentary Question */}
            <div className="neu-card p-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-3">
                Parliamentary Question Text
              </label>
              <textarea
                value={question}
                onChange={(e) => { setQuestion(e.target.value); setPreview(null); }}
                rows={5}
                placeholder="e.g. Will the Minister of Coal please state the total coal production and reserves of CMPDI-surveyed mines during FY 2021-23?"
                className="w-full neu-inset p-3 rounded-xl text-xs text-[#1E293B] bg-transparent outline-none resize-none leading-relaxed placeholder-[#64748B]"
              />
            </div>

            {/* Record Selection */}
            <div className="neu-card p-5">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  Select Validated Records ({selected.length}/{validated.length})
                </label>
                <div className="flex gap-2">
                  <button onClick={selectAll} className="text-[10px] font-bold text-[#1E293B] cursor-pointer">All</button>
                  <span className="text-[#D5DEE8]">|</span>
                  <button onClick={clearAll} className="text-[10px] font-bold text-[#64748B] cursor-pointer">None</button>
                </div>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {validated.map((r) => {
                  const isSelected = selected.includes(r.id);
                  return (
                    <div key={r.id} onClick={() => toggle(r.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
                        ${isSelected
                          ? "shadow-[inset_2px_2px_4px_rgba(163,177,198,0.35),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] text-[#1E293B]"
                          : "neu-btn text-[#64748B] hover:text-[#1E293B]"
                        }`}>
                      {isSelected ? <CheckSquare size={16} className="text-[#1E293B] shrink-0" /> : <Square size={16} className="shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate">{r.project}</p>
                        <p className="text-[10px] text-[#64748B]">{r.year} · {r.production} · {r.docName}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handlePreview}
              disabled={!question.trim() || selected.length === 0}
              className={`w-full py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer
                ${!question.trim() || selected.length === 0
                  ? "bg-[#E8EDF5] text-[#94A3B8] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3)] cursor-not-allowed"
                  : "neu-btn-dark text-white"}`}>
              <Eye size={15} />
              Preview Answer
            </button>
          </div>

          {/* RIGHT: Preview Pane */}
          <div className="xl:col-span-3 space-y-4">
            {!preview ? (
              <div className="neu-card p-8 h-full min-h-[400px] flex flex-col items-center justify-center text-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#E8EDF5] shadow-[-3px_-3px_8px_rgba(255,255,255,0.9),3px_3px_8px_rgba(163,177,198,0.4)] flex items-center justify-center">
                  <Sparkles size={24} className="text-[#475569]" />
                </div>
                <p className="text-sm font-bold text-[#475569]">Preview will appear here</p>
                <p className="text-xs text-[#64748B] max-w-xs">
                  Enter a parliamentary question, select records, then click "Preview Answer".
                </p>
              </div>
            ) : (
              <div className="neu-card p-6 space-y-4 h-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#1E293B] flex items-center gap-2">
                    <Eye size={15} /> Answer Preview
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownload("PDF")}
                      disabled={!!downloading}
                      className="neu-btn px-3.5 py-2 rounded-xl text-xs font-bold text-[#475569] flex items-center gap-1.5 cursor-pointer">
                      <Download size={13} />
                      {downloading === "PDF" ? "Generating…" : "PDF"}
                    </button>
                    <button
                      onClick={() => handleDownload("DOCX")}
                      disabled={!!downloading}
                      className="neu-btn-dark px-3.5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer">
                      <Download size={13} />
                      {downloading === "DOCX" ? "Generating…" : "DOCX"}
                    </button>
                  </div>
                </div>

                {/* Preview content */}
                <div className="neu-inset p-5 rounded-2xl font-mono text-[11px] leading-relaxed text-[#1E293B] whitespace-pre-wrap max-h-[480px] overflow-y-auto">
                  {preview}
                </div>

                {/* Source summary */}
                <div className="pt-3 border-t border-[#D5DEE8] text-[10px] text-[#64748B]">
                  Based on <strong>{selectedRecords.length}</strong> validated records from{" "}
                  <strong>{new Set(selectedRecords.map((r) => r.docId)).size}</strong> source documents.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;