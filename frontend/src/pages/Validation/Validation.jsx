import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, Edit3, ChevronLeft, ChevronRight, AlertTriangle, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { useApp } from "../../context/AppContext";

const ConfidenceBar = ({ value }) => {
  const color = value >= 90 ? "#10B981" : value >= 75 ? "#F59E0B" : "#EF4444";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-[#D5DEE8] shadow-[inset_1px_1px_2px_rgba(163,177,198,0.4)] overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold" style={{ color }}>{value}%</span>
    </div>
  );
};

const Validation = () => {
  const navigate = useNavigate();
  const { records, approveRecord, rejectRecord, editRecord } = useApp();

  const queue = records.filter((r) => r.status === "pending");
  const [idx, setIdx] = useState(0);
  const [editing, setEditing] = useState(false);
  const [editFields, setEditFields] = useState({});
  const [done, setDone] = useState(false);

  const current = queue[idx];

  const handleApprove = () => {
    approveRecord(current.id);
    if (idx < queue.length - 1) setIdx(idx);
    else { setDone(true); }
    setEditing(false);
  };

  const handleReject = () => {
    rejectRecord(current.id);
    if (idx >= queue.length - 1 && idx > 0) setIdx(idx - 1);
    setEditing(false);
  };

  const handleSaveEdit = () => {
    editRecord(current.id, editFields);
    setEditing(false);
    setEditFields({});
    if (idx < queue.length - 1) setIdx(idx);
    else setDone(true);
  };

  const startEdit = () => {
    setEditFields({
      project: current.project,
      year: current.year,
      production: current.production,
      reserve: current.reserve,
    });
    setEditing(true);
  };

  // All done state
  const allDone = queue.length === 0 || done;

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-extrabold text-[#1E293B] tracking-tight">Human Review</h1>
          <p className="text-sm text-[#64748B] mt-1">Verify AI-extracted records before approving them.</p>
        </div>
        {queue.length > 0 && (
          <div className="self-start neu-inset px-4 py-2 rounded-xl text-xs font-bold text-[#1E293B]">
            {idx + 1} / {queue.length} records
          </div>
        )}
      </div>

      {/* Empty state */}
      {allDone ? (
        <div className="neu-card p-12 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 flex items-center justify-center">
            <CheckCircle2 size={36} className="text-[#10B981]" />
          </div>
          <h2 className="text-xl font-bold text-[#1E293B]">All Records Reviewed!</h2>
          <p className="text-sm text-[#64748B] max-w-sm">
            No more records pending review. Validated records are ready for AI queries and report generation.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <button onClick={() => navigate("/validated")}
              className="neu-btn px-5 py-2.5 rounded-xl text-xs font-bold text-[#1E293B] cursor-pointer">
              View Validated Data
            </button>
            <button onClick={() => navigate("/assistant")}
              className="neu-btn-dark px-5 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer">
              Ask AI Assistant
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* LEFT: Document "Preview" + Source Text */}
          <div className="xl:col-span-2 space-y-4">
            <div className="neu-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={16} className="text-[#475569]" />
                <div>
                  <p className="text-xs font-bold text-[#1E293B]">{current.docName}</p>
                  <p className="text-[10px] text-[#64748B]">Page {current.sourcePage}</p>
                </div>
              </div>

              {/* Simulated document page */}
              <div className="relative bg-white rounded-xl border border-[#D5DEE8] p-5 font-mono text-[11px] leading-relaxed text-[#475569] min-h-[200px]">
                <div className="absolute top-2 right-2 text-[9px] bg-[#E8EDF5] px-2 py-0.5 rounded text-[#64748B]">
                  Page {current.sourcePage}
                </div>
                <p className="text-[#CBD5E1] mb-2">
                  {Array(3).fill("Lorem ipsum dolor sit amet, consectetur adipiscing elit.").join(" ")}
                </p>
                {/* Highlighted source snippet */}
                <span className="bg-amber-200/80 text-[#92400E] px-1 rounded font-semibold leading-loose">
                  {current.sourceSnippet}
                </span>
                <p className="text-[#CBD5E1] mt-2">
                  {Array(2).fill("Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.").join(" ")}
                </p>
              </div>
              <p className="text-[10px] text-amber-700 mt-2 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-amber-200 inline-block" />
                Highlighted: AI extracted source text
              </p>
            </div>

            {/* Navigation between records */}
            <div className="flex items-center justify-between">
              <button onClick={() => { setIdx(Math.max(0, idx - 1)); setEditing(false); }}
                disabled={idx === 0}
                className="neu-btn px-4 py-2 rounded-xl text-xs font-bold text-[#1E293B] flex items-center gap-1.5 cursor-pointer disabled:opacity-40">
                <ChevronLeft size={14} /> Prev
              </button>
              <div className="flex gap-1.5">
                {queue.map((_, i) => (
                  <button key={i} onClick={() => { setIdx(i); setEditing(false); }}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${i === idx ? "bg-[#1E293B]" : "bg-[#D5DEE8]"}`} />
                ))}
              </div>
              <button onClick={() => { setIdx(Math.min(queue.length - 1, idx + 1)); setEditing(false); }}
                disabled={idx === queue.length - 1}
                className="neu-btn px-4 py-2 rounded-xl text-xs font-bold text-[#1E293B] flex items-center gap-1.5 cursor-pointer disabled:opacity-40">
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* RIGHT: Extracted Fields + Actions */}
          <div className="xl:col-span-3 space-y-4">
            {/* Confidence */}
            <div className="neu-card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[#10B981]" />
                  <span className="text-sm font-bold text-[#1E293B]">AI Confidence Score</span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  current.confidence >= 90 ? "bg-emerald-500/10 text-[#10B981]"
                  : current.confidence >= 75 ? "bg-amber-500/10 text-amber-700"
                  : "bg-rose-500/10 text-rose-700"
                }`}>
                  {current.confidence >= 90 ? "High" : current.confidence >= 75 ? "Medium" : "Low"} Confidence
                </span>
              </div>
              <ConfidenceBar value={current.confidence} />
            </div>

            {/* Warnings */}
            {current.warnings.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
                  <AlertTriangle size={14} /> Validation Warnings
                </div>
                {current.warnings.map((w, i) => (
                  <p key={i} className="text-xs text-amber-700 pl-5">• {w}</p>
                ))}
              </div>
            )}

            {/* Extracted Fields */}
            <div className="neu-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#1E293B]">Extracted Fields</h3>
                {!editing && (
                  <button onClick={startEdit}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#475569] hover:text-[#1E293B] cursor-pointer">
                    <Edit3 size={13} /> Edit Fields
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "project",    label: "Project / Mine Block" },
                  { key: "year",       label: "Financial Year" },
                  { key: "production", label: "Production (MT)" },
                  { key: "reserve",    label: "Reserve (MT)" },
                ].map(({ key, label }) => (
                  <div key={key} className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">{label}</label>
                    {editing ? (
                      <div className="neu-inset px-3 py-2">
                        <input
                          value={editFields[key] ?? ""}
                          onChange={(e) => setEditFields((p) => ({ ...p, [key]: e.target.value }))}
                          className="w-full bg-transparent outline-none border-none text-xs font-bold text-[#1E293B]"
                        />
                      </div>
                    ) : (
                      <div className="neu-inset px-3 py-2">
                        <p className="text-xs font-bold text-[#1E293B]">{current[key]}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Source reference */}
              <div className="mt-4 pt-3 border-t border-[#D5DEE8]/60 flex items-center justify-between text-[10px] text-[#64748B]">
                <span>Source: <strong className="text-[#475569]">{current.docName}</strong></span>
                <span>Page {current.sourcePage}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {editing ? (
                <>
                  <button onClick={() => setEditing(false)}
                    className="flex-1 neu-btn py-3 rounded-2xl text-xs font-bold text-[#475569] flex items-center justify-center gap-2 cursor-pointer">
                    <X size={15} /> Cancel
                  </button>
                  <button onClick={handleSaveEdit}
                    className="flex-1 neu-btn-dark py-3 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer">
                    <Check size={15} /> Save & Approve
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleReject}
                    className="flex-1 py-3 rounded-2xl text-xs font-bold text-rose-700 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all">
                    <X size={15} /> Reject
                  </button>
                  <button onClick={startEdit}
                    className="flex-1 neu-btn py-3 rounded-2xl text-xs font-bold text-[#475569] flex items-center justify-center gap-2 cursor-pointer">
                    <Edit3 size={15} /> Edit
                  </button>
                  <button onClick={handleApprove}
                    className="flex-1 neu-btn-dark py-3 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer">
                    <Check size={15} /> Approve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Validation;