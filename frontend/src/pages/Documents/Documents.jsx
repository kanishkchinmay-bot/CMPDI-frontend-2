import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, Image, FileSpreadsheet, CheckCircle2, X, Loader, AlertCircle, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";

const ACCEPTED = ["application/pdf", "image/png", "image/jpeg", "image/jpg",
  "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

const fileIcon = (type) => {
  if (type === "PDF") return <FileText size={18} className="text-rose-600" />;
  if (type === "Excel") return <FileSpreadsheet size={18} className="text-emerald-600" />;
  return <Image size={18} className="text-sky-600" />;
};

const UploadDocuments = () => {
  const navigate = useNavigate();
  const { uploadDocument, documents } = useApp();
  const inputRef = useRef(null);

  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [lastResult, setLastResult] = useState(null); // {doc, records}
  const [error, setError] = useState("");

  const handleFiles = async (files) => {
    const file = files[0];
    if (!file) return;
    if (!ACCEPTED.includes(file.type) && !file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      setError("Unsupported file type. Please upload a PDF, image (PNG/JPG), or Excel file.");
      return;
    }
    setError("");
    setLastResult(null);
    setUploading(true);
    try {
      const result = await uploadDocument(file);
      setLastResult(result);
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const steps = [
    { label: "Upload", done: true },
    { label: "OCR Extraction", done: !!lastResult },
    { label: "AI Field Parse", done: !!lastResult },
    { label: "Ready for Review", done: !!lastResult },
  ];

  return (
    <div className="space-y-7 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-extrabold text-[#1E293B] tracking-tight">Upload Document</h1>
          <p className="text-sm text-[#64748B] mt-1">Upload a PDF, image, or Excel file. AI will extract records automatically.</p>
        </div>
        {lastResult && (
          <button onClick={() => navigate("/validation")}
            className="neu-btn-dark self-start px-4 py-2.5 rounded-2xl text-xs font-bold text-white flex items-center gap-2 cursor-pointer">
            Review Extracted Records <ArrowRight size={14} />
          </button>
        )}
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-4 p-12 rounded-3xl cursor-pointer transition-all duration-200
          ${dragOver
            ? "shadow-[inset_4px_4px_10px_rgba(163,177,198,0.5),inset_-4px_-4px_10px_rgba(255,255,255,0.9)] border-2 border-dashed border-[#1E293B]/30"
            : "neu-card border-2 border-dashed border-[#D5DEE8] hover:border-[#1E293B]/20"
          }
          ${uploading ? "pointer-events-none opacity-75" : ""}
        `}
      >
        <input ref={inputRef} type="file" accept=".pdf,.png,.jpg,.jpeg,.xls,.xlsx" className="hidden"
          onChange={(e) => handleFiles(e.target.files)} />

        <div className="w-16 h-16 rounded-3xl bg-[#E8EDF5] shadow-[-4px_-4px_12px_rgba(255,255,255,0.9),4px_4px_12px_rgba(163,177,198,0.45)] flex items-center justify-center">
          {uploading
            ? <Loader size={28} className="text-[#1E293B] animate-spin" />
            : <Upload size={28} className="text-[#1E293B]" />
          }
        </div>

        <div className="text-center">
          <p className="text-base font-bold text-[#1E293B]">
            {uploading ? "Processing document…" : "Drag & drop or click to upload"}
          </p>
          <p className="text-sm text-[#64748B] mt-1">
            Supports PDF, PNG, JPG, XLS, XLSX · Max 50 MB
          </p>
        </div>

        {!uploading && (
          <div className="flex items-center gap-3 mt-2">
            {[
              { ext: "PDF", icon: <FileText size={16} className="text-rose-600" /> },
              { ext: "Image", icon: <Image size={16} className="text-sky-600" /> },
              { ext: "Excel", icon: <FileSpreadsheet size={16} className="text-emerald-600" /> },
            ].map((f) => (
              <div key={f.ext} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E8EDF5] shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(163,177,198,0.35)]">
                {f.icon}
                <span className="text-xs font-bold text-[#475569]">{f.ext}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-200">
          <AlertCircle size={18} className="text-rose-600 shrink-0" />
          <p className="text-sm text-rose-700 font-medium">{error}</p>
          <button onClick={() => setError("")} className="ml-auto"><X size={16} className="text-rose-600" /></button>
        </div>
      )}

      {/* Processing Steps (shown while uploading) */}
      {uploading && (
        <div className="neu-card p-6">
          <p className="text-sm font-bold text-[#1E293B] mb-5">Processing Pipeline</p>
          <div className="flex items-center gap-0">
            {steps.map((s, i) => (
              <React.Fragment key={s.label}>
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                    ${s.done ? "bg-[#10B981] text-white" : i === steps.findIndex(x => !x.done) ? "bg-[#1E293B] text-white animate-pulse" : "bg-[#D5DEE8] text-[#94A3B8]"}`}>
                    {s.done ? <CheckCircle2 size={14} /> : i + 1}
                  </div>
                  <span className="text-[10px] font-semibold text-[#64748B] text-center">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mb-5 transition-all ${s.done ? "bg-[#10B981]" : "bg-[#D5DEE8]"}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Success Card */}
      {lastResult && !uploading && (
        <div className="neu-card p-6 border border-emerald-500/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
              <CheckCircle2 size={24} className="text-[#10B981]" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-[#1E293B]">Extraction Complete!</h3>
              <p className="text-sm text-[#64748B] mt-0.5">{lastResult.doc.name}</p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="neu-inset p-3 text-center">
                  <p className="text-[10px] font-bold text-[#64748B] uppercase">Pages</p>
                  <p className="text-lg font-extrabold text-[#1E293B]">{lastResult.doc.pages}</p>
                </div>
                <div className="neu-inset p-3 text-center">
                  <p className="text-[10px] font-bold text-[#64748B] uppercase">Records Found</p>
                  <p className="text-lg font-extrabold text-[#10B981]">{lastResult.records.length}</p>
                </div>
                <div className="neu-inset p-3 text-center">
                  <p className="text-[10px] font-bold text-[#64748B] uppercase">Status</p>
                  <p className="text-lg font-extrabold text-amber-600">Pending</p>
                </div>
              </div>
              <p className="text-xs text-[#64748B] mt-3">Records need human review before they can be used for AI queries or reports.</p>
              <button onClick={() => navigate("/validation")}
                className="mt-4 neu-btn-dark px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 cursor-pointer">
                Review Now <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Uploaded Documents List */}
      {documents.length > 0 && (
        <div className="neu-card p-5">
          <h2 className="text-[16px] font-bold text-[#1E293B] mb-4">All Uploaded Documents</h2>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3.5 rounded-xl bg-[#E8EDF5] shadow-[-2px_-2px_6px_rgba(255,255,255,0.9),2px_2px_6px_rgba(163,177,198,0.3)]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E8EDF5] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3)] flex items-center justify-center">
                    {fileIcon(doc.type)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1E293B]">{doc.name}</p>
                    <p className="text-[10px] text-[#64748B]">{doc.type} · {doc.size} · {doc.uploadedAt}</p>
                  </div>
                </div>
                <div className="shrink-0">
                  {doc.status === "processing" ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 px-2.5 py-1 rounded-lg bg-amber-500/10">
                      <Loader size={11} className="animate-spin" /> Processing
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-[#10B981] px-2.5 py-1 rounded-lg bg-emerald-500/10">
                      {doc.recordsExtracted} records extracted
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDocuments;