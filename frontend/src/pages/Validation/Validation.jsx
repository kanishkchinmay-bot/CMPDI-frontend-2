import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Edit3,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  FileText,
  RotateCw,
  Maximize2,
  Sparkles,
  Check,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const Validation = () => {
  const navigate = useNavigate();
  const {
    records,
    pendingQueue,
    selectedRecordId,
    setSelectedRecordId,
    approveRecord,
    rejectRecord,
    editRecord,
  } = useApp();

  const activeList = pendingQueue.length > 0 ? pendingQueue : records;
  const initialIndex = activeList.findIndex((r) => r.id === selectedRecordId);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  useEffect(() => {
    const idx = activeList.findIndex((r) => r.id === selectedRecordId);
    if (idx >= 0) setCurrentIndex(idx);
  }, [selectedRecordId, activeList]);

  const current = activeList[currentIndex] || activeList[0];

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    project: "",
    year: "",
    production: "",
    reserve: "",
  });

  const [reviewerComment, setReviewerComment] = useState("");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (current) {
      setEditForm({
        project: current.project || "",
        year: current.year || "",
        production: current.production || "",
        reserve: current.reserve || "",
      });
      setReviewerComment(current.reviewerComment || "");
      setIsEditing(false);
    }
  }, [current?.id]);

  const handleNext = () => {
    if (currentIndex < activeList.length - 1) {
      const nextRec = activeList[currentIndex + 1];
      setSelectedRecordId(nextRec.id);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevRec = activeList[currentIndex - 1];
      setSelectedRecordId(prevRec.id);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleApprove = () => {
    if (!current) return;
    if (isEditing) {
      editRecord(current.id, editForm, reviewerComment);
    } else {
      approveRecord(current.id, reviewerComment);
    }
    setToastMessage(`Approved record for ${current.project}! Data is now in Validated Data.`);
    setTimeout(() => setToastMessage(null), 3500);

    if (currentIndex < activeList.length - 1) {
      handleNext();
    }
  };

  const handleReject = () => {
    if (!current) return;
    rejectRecord(current.id, reviewerComment);
    setToastMessage(`Record for ${current.project} quarantined.`);
    setTimeout(() => setToastMessage(null), 3500);
    if (currentIndex > 0) {
      handlePrev();
    }
  };

  if (!current) {
    return (
      <div className="neu-card p-12 text-center space-y-4">
        <CheckCircle2 size={48} className="text-[#10B981] mx-auto" />
        <h2 className="text-xl font-bold text-[#1E293B]">All Records Reviewed!</h2>
        <p className="text-xs text-[#64748B] max-w-sm mx-auto">
          No more records pending human review. Validated records are available for AI queries and report generation.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate("/validated")}
            className="neu-btn px-4 py-2.5 rounded-2xl text-xs font-bold text-[#1E293B] cursor-pointer"
          >
            View Validated Data
          </button>
          <button
            onClick={() => navigate("/reports")}
            className="neu-btn-dark px-4 py-2.5 rounded-2xl text-xs font-bold text-white cursor-pointer"
          >
            Generate Parliamentary Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {/* ── TOAST NOTIFICATION ── */}
      {toastMessage && (
        <div className="neu-card-sm p-4 text-xs font-semibold flex items-center justify-between text-[#10B981] border-l-4 border-[#10B981]">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => navigate("/validated")}
            className="underline font-bold text-[#1E293B] shrink-0 cursor-pointer"
          >
            Go to Validated Data →
          </button>
        </div>
      )}

      {/* ── TOP DOCKET BREADCRUMB & BATCH BAR ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
            <span>DOCUMENT DOCKET</span>
            <span>/</span>
            <span className="font-bold text-[#1E293B]">{current.docName}</span>
            <span className="px-1.5 py-0.5 rounded bg-[#D5DEE8]/60 text-[10px]">
              P.{String(current.sourcePage).padStart(2, "0")}/28
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-[26px] sm:text-[28px] font-extrabold text-[#1E293B] tracking-tight">
              Geological Extract Verification
            </h1>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                current.status === "validated"
                  ? "bg-emerald-500/10 text-[#10B981]"
                  : current.status === "rejected"
                  ? "bg-rose-500/10 text-rose-600"
                  : "bg-amber-500/10 text-amber-700"
              }`}
            >
              STATUS: {current.status === "validated" ? "VALIDATED" : current.status === "rejected" ? "QUARANTINED" : "PENDING REVIEW"}
            </span>
          </div>
        </div>

        {/* Batch Execution Controls */}
        <div className="neu-card-sm p-2.5 flex items-center gap-3 self-start sm:self-auto">
          <div className="text-right pr-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
              Batch Execution
            </span>
            <span className="text-xs font-bold text-[#1E293B]">
              Record {currentIndex + 1} of {activeList.length}
            </span>
          </div>
          <div className="flex items-center gap-1 border-l border-[#D5DEE8]/60 pl-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="neu-btn p-1.5 rounded-xl text-[#1E293B] disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === activeList.length - 1}
              className="neu-btn p-1.5 rounded-xl text-[#1E293B] disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── TWO-COLUMN DETAILED WORKFLOW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── LEFT COLUMN (6 cols): Original Document Page with highlighted source text ── */}
        <div className="lg:col-span-6 space-y-4">
          <div className="neu-card overflow-hidden flex flex-col">
            {/* Viewer Toolbar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#D5DEE8]/60 text-xs">
              <div className="flex items-center gap-2 text-[11px] text-[#475569]">
                <FileText size={15} className="text-[#1E293B]" />
                <span className="font-bold truncate max-w-[200px]">
                  {current.docName.replace(".pdf", "_SCAN_004.tif")}
                </span>
                <span className="text-[#64748B] text-[10px]">300 DPI · OCR-L2</span>
              </div>

              <div className="flex items-center gap-1 text-[11px]">
                <button
                  onClick={() => setZoomLevel(100)}
                  className={`px-2 py-0.5 rounded-lg text-[10.5px] font-bold cursor-pointer ${
                    zoomLevel === 100 ? "neu-inset text-[#1E293B]" : "neu-btn text-[#64748B]"
                  }`}
                >
                  100%
                </button>
                <button
                  onClick={() => setZoomLevel(125)}
                  className={`px-2 py-0.5 rounded-lg text-[10.5px] font-bold cursor-pointer ${
                    zoomLevel === 125 ? "neu-inset text-[#1E293B]" : "neu-btn text-[#64748B]"
                  }`}
                >
                  125%
                </button>
                <button
                  onClick={() => setZoomLevel(90)}
                  className="neu-btn px-2 py-0.5 rounded-lg text-[10.5px] font-bold text-[#64748B] cursor-pointer"
                >
                  FIT
                </button>
                <button className="neu-btn p-1 rounded-lg text-[#64748B]">
                  <RotateCw size={13} />
                </button>
                <button className="neu-btn p-1 rounded-lg text-[#64748B]">
                  <Maximize2 size={13} />
                </button>
              </div>
            </div>

            {/* Stylized High-Fidelity Geological Report Preview */}
            <div className="p-6 overflow-auto max-h-[520px] select-none text-[#1E293B]">
              <div
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top left" }}
                className="transition-transform duration-200"
              >
                {/* Document Letterhead */}
                <div className="border-b border-[#D5DEE8] pb-3 mb-4 text-center">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#64748B]">
                    Government of India · Ministry of Coal
                  </div>
                  <h2 className="text-base font-black uppercase tracking-wide text-[#1E293B] mt-0.5">
                    {current.subsidiary === "BCCL"
                      ? "BHARAT COKING COAL LIMITED"
                      : current.subsidiary === "SECL"
                      ? "SOUTH EASTERN COALFIELDS LIMITED"
                      : current.subsidiary === "NCL"
                      ? "NORTHERN COALFIELDS LIMITED"
                      : "EASTERN COALFIELDS LIMITED"}
                  </h2>
                  <p className="text-[10px] text-[#475569] font-semibold">
                    (A SUBSIDIARY OF COAL INDIA LIMITED - A GOVT. OF INDIA UNDERTAKING)
                  </p>
                  <p className="text-[9.5px] text-[#64748B] mt-1 font-mono">
                    {current.colliery.toUpperCase()} · OPERATIONAL REVIEW {current.year}
                  </p>
                </div>

                {/* Table Title */}
                <div className="mb-2 flex items-center justify-between text-xs">
                  <h3 className="font-bold text-[#1E293B]">
                    {current.sourceTable}
                  </h3>
                  <span className="text-[9.5px] font-mono text-[#64748B]">
                    Units: Million Metric Tonnes (MT)
                  </span>
                </div>

                {/* Document Table */}
                <table className="w-full text-left border-collapse text-[10.5px] border border-[#CBD5E1]">
                  <thead>
                    <tr className="bg-[#1E293B] text-white text-[9.5px] uppercase font-bold tracking-wider">
                      <th className="p-1.5 border border-slate-600">Seam Identification</th>
                      <th className="p-1.5 border border-slate-600">Coal Grade</th>
                      <th className="p-1.5 border border-slate-600 text-right">Target (MT)</th>
                      <th className="p-1.5 border border-slate-600 text-right">Actual Prod. (MT)</th>
                      <th className="p-1.5 border border-slate-600 text-right">Proved Reserves (MT)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#CBD5E1]">
                    <tr>
                      <td className="p-1.5 border border-[#CBD5E1] font-medium">Seam VII/VIII (Upper Block)</td>
                      <td className="p-1.5 border border-[#CBD5E1]">W-III Steel Coking</td>
                      <td className="p-1.5 border border-[#CBD5E1] text-right font-mono">3.20</td>
                      <td className="p-1.5 border border-[#CBD5E1] text-right font-mono">3.12</td>
                      <td className="p-1.5 border border-[#CBD5E1] text-right font-mono">24.50</td>
                    </tr>

                    {/* TARGET HIGHLIGHTED SOURCE ROW */}
                    <tr className="bg-amber-500/20 border-2 border-amber-500 font-semibold shadow-inner">
                      <td className="p-2 border border-amber-400 text-[#1E293B] flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500 inline-block shrink-0" />
                        <span>Seam IX/X (Deep Horizon)</span>
                      </td>
                      <td className="p-2 border border-amber-400 text-[#1E293B] font-medium">
                        W-IV Semi-Coking
                      </td>
                      <td className="p-2 border border-amber-400 text-right font-mono text-[#1E293B]">
                        4.50
                      </td>
                      <td className="p-2 border border-amber-400 text-right font-mono font-bold text-amber-700 bg-amber-500/30">
                        {current.production}
                      </td>
                      <td className="p-2 border border-amber-400 text-right font-mono font-bold text-amber-700 bg-amber-500/30">
                        {current.reserve}
                      </td>
                    </tr>

                    <tr>
                      <td className="p-1.5 border border-[#CBD5E1] font-medium">Seam XI/XII (Colliery South)</td>
                      <td className="p-1.5 border border-[#CBD5E1]">Steel Grade I</td>
                      <td className="p-1.5 border border-[#CBD5E1] text-right font-mono">2.10</td>
                      <td className="p-1.5 border border-[#CBD5E1] text-right font-mono">1.94</td>
                      <td className="p-1.5 border border-[#CBD5E1] text-right font-mono">14.10</td>
                    </tr>

                    <tr>
                      <td className="p-1.5 border border-[#CBD5E1] font-medium">Seam XIII (East Incline)</td>
                      <td className="p-1.5 border border-[#CBD5E1]">W-II Coking</td>
                      <td className="p-1.5 border border-[#CBD5E1] text-right font-mono">1.80</td>
                      <td className="p-1.5 border border-[#CBD5E1] text-right font-mono">1.75</td>
                      <td className="p-1.5 border border-[#CBD5E1] text-right font-mono">11.85</td>
                    </tr>
                  </tbody>
                </table>

                <p className="text-[9px] text-[#64748B] italic mt-3">
                  * Note 2: Longwall expansion in Seam IX/X commissioned during Q3 yielded higher extraction than initial forecast. Proved reserves certified under UNFC Code 111.
                </p>
              </div>
            </div>

            {/* Bottom OCR Bounding Box Info Card */}
            <div className="p-4 border-t border-[#D5DEE8]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E293B]">
                  <Sparkles size={13} className="text-amber-500" />
                  <span>OCR Match: {current.sourceSnippet}</span>
                </div>
                <div className="text-[10.5px] font-mono text-[#64748B] mt-0.5">
                  Spatial Coordinates: Box {current.spatialBox} · Page {current.sourcePage}
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#10B981] px-2 py-0.5 rounded-lg bg-emerald-500/10 shrink-0">
                Confidence {current.confidence}%
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN (6 cols): Structured Extraction, Warning, Comments & Actions ── */}
        <div className="lg:col-span-6 neu-card p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#D5DEE8]/60">
            <div>
              <h3 className="text-base font-bold text-[#1E293B]">Structured Extraction</h3>
              <p className="text-xs text-[#64748B]">Verify and sign off on extracted domain parameters</p>
            </div>
            <span className="text-[10px] font-mono font-semibold text-[#64748B] px-2 py-0.5 rounded-lg neu-inset">
              DOC-ID: #2023-BCCL-084
            </span>
          </div>

          {/* Form Fields: Project, Year, Production, Reserve */}
          <div className="space-y-4">
            {/* Project Name */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                <span>Project Name</span>
                <span className="text-[#10B981] text-[10px] flex items-center gap-1">
                  <CheckCircle2 size={11} /> VERIFIED NER
                </span>
              </div>
              {isEditing ? (
                <div className="neu-inset p-2">
                  <input
                    type="text"
                    value={editForm.project}
                    onChange={(e) => setEditForm({ ...editForm, project: e.target.value })}
                    className="w-full bg-transparent outline-none text-xs font-bold text-[#1E293B]"
                  />
                </div>
              ) : (
                <div className="neu-inset p-3 text-sm font-extrabold text-[#1E293B]">
                  {current.project}
                </div>
              )}
            </div>

            {/* Reporting Year */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                Reporting Year
              </label>
              {isEditing ? (
                <div className="neu-inset p-2">
                  <input
                    type="text"
                    value={editForm.year}
                    onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                    className="w-full bg-transparent outline-none text-xs font-mono font-bold text-[#1E293B]"
                  />
                </div>
              ) : (
                <div className="neu-inset p-3 text-xs font-mono font-bold text-[#1E293B]">
                  {current.year}
                </div>
              )}
            </div>

            {/* Production & Reserve */}
            <div className="grid grid-cols-2 gap-4">
              {/* Production */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                  <span>Production Val</span>
                  <span className="text-[10px] font-mono text-[#10B981]">CONF: 94%</span>
                </div>
                {isEditing ? (
                  <div className="neu-inset p-2">
                    <input
                      type="text"
                      value={editForm.production}
                      onChange={(e) => setEditForm({ ...editForm, production: e.target.value })}
                      className="w-full bg-transparent outline-none text-sm font-mono font-bold text-[#1E293B]"
                    />
                  </div>
                ) : (
                  <div className="neu-inset p-3">
                    <span className="text-lg font-mono font-extrabold text-[#1E293B] block">
                      {current.production}
                    </span>
                    <span className="text-[10px] text-[#64748B]">Metric Tonnes</span>
                  </div>
                )}
              </div>

              {/* Reserve */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                  <span>Reserve Val</span>
                  <span className="text-[10px] font-mono text-[#10B981]">CONF: 88%</span>
                </div>
                {isEditing ? (
                  <div className="neu-inset p-2">
                    <input
                      type="text"
                      value={editForm.reserve}
                      onChange={(e) => setEditForm({ ...editForm, reserve: e.target.value })}
                      className="w-full bg-transparent outline-none text-sm font-mono font-bold text-[#1E293B]"
                    />
                  </div>
                ) : (
                  <div className="neu-inset p-3">
                    <span className="text-lg font-mono font-extrabold text-[#1E293B] block">
                      {current.reserve}
                    </span>
                    <span className="text-[10px] text-[#64748B]">Proved In-Situ</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Confidence Score */}
          <div className="neu-card-sm p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E293B]">
              {current.confidence < 70 ? (
                <AlertTriangle size={15} className="text-rose-600" />
              ) : (
                <CheckCircle2 size={15} className="text-[#10B981]" />
              )}
              <span>Extraction Confidence</span>
            </div>
            <span
              className={`text-xs font-bold font-mono ${
                current.confidence < 70
                  ? "text-rose-600"
                  : current.confidence >= 90
                  ? "text-[#10B981]"
                  : "text-[#1E293B]"
              }`}
            >
              {current.confidence}% {current.confidence < 70 ? "(Low Confidence)" : "(Verified NER)"}
            </span>
          </div>

          {/* Validation Warning / Conflict / Clean Status */}
          {current.confidence < 70 && current.warnings && current.warnings.length > 0 ? (
            <div className="p-4 rounded-2xl bg-rose-500/10 space-y-1.5 text-xs border border-rose-500/20">
              <div className="flex items-center justify-between font-bold text-rose-900">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle size={15} className="text-rose-600" />
                  <span>Extraction Conflict (Score &lt; 70%)</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-800 font-bold">
                  Review Required
                </span>
              </div>
              <p className="text-rose-950 leading-relaxed text-[11.5px] font-medium">
                {current.warnings[0]}
              </p>
            </div>
          ) : current.confidence >= 90 ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-bold text-emerald-900">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-[#10B981]" />
                  <span>Confidence Score {current.confidence}% — No Flags</span>
                </div>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-[#10B981] px-2 py-0.5 rounded-md font-bold">
                  Auto-Verified
                </span>
              </div>
              <p className="text-[#475569] leading-relaxed text-[11.5px]">
                Extraction exceeds the 90% threshold. Tabular OCR and NER boundaries match source document with zero anomaly flags.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-[#E8EDF5] shadow-[inset_1px_1px_3px_rgba(163,177,198,0.4),inset_-1px_-1px_3px_rgba(255,255,255,0.8)] space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-bold text-[#1E293B]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-[#10B981]" />
                  <span>Confidence Score {current.confidence}% — Clean Record</span>
                </div>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/15 text-[#10B981] px-2 py-0.5 rounded-md font-bold">
                  Ready to Sign
                </span>
              </div>
              <p className="text-[#64748B] leading-relaxed text-[11.5px]">
                Reliable extraction score ({current.confidence}%). No tabular conflicts or baseline discrepancies detected. Ready for human validation sign-off.
              </p>
            </div>
          )}

          {/* Reviewer Comment Field */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
              <span>Reviewer Comment * (Audit Trail)</span>
              <span className="text-[10px] font-mono text-[#64748B]">
                {reviewerComment.length}/500
              </span>
            </div>
            <div className="neu-inset p-3">
              <textarea
                rows={3}
                value={reviewerComment}
                onChange={(e) => setReviewerComment(e.target.value)}
                placeholder="Enter validation notes or justification for approval/edits…"
                className="w-full bg-transparent outline-none border-none text-xs text-[#1E293B] leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* Action Buttons: Edit, Approve, Reject */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="neu-btn px-4 py-2.5 rounded-2xl text-xs font-bold text-[#1E293B] flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 size={14} className="text-[#475569]" />
                <span>{isEditing ? "Cancel Edit" : "Edit Fields"}</span>
              </button>

              <button
                onClick={handleApprove}
                className="neu-btn-dark flex-1 py-2.5 px-4 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check size={16} />
                <span>{isEditing ? "Save & Approve Record" : "Approve Record"}</span>
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={handleReject}
                className="text-xs font-semibold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer"
              >
                Reject to Quarantine
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Validation;