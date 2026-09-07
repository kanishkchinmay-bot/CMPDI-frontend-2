import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  FileSpreadsheet,
  Image,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  AlertCircle,
  Loader,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const ACCEPTED_EXTENSIONS = [".pdf", ".xlsx", ".xls", ".csv", ".jpg", ".jpeg", ".png"];

const Documents = () => {
  const navigate = useNavigate();
  const { documents, uploadDocument, setSelectedRecordId, records } = useApp();
  const fileInputRef = useRef(null);

  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [notification, setNotification] = useState(null);

  const handleFiles = async (files) => {
    const file = files[0];
    if (!file) return;

    const ext = "." + file.name.split(".").pop().toLowerCase();
    if (!ACCEPTED_EXTENSIONS.includes(ext)) {
      setNotification({
        type: "error",
        message: "Unsupported file format. Please upload PDF, Excel (XLSX/CSV), or Scanned Image.",
      });
      return;
    }

    setIsUploading(true);
    setNotification(null);
    try {
      const result = await uploadDocument(file);
      setNotification({
        type: "success",
        message: `Successfully ingested "${file.name}". Extracted record ready for review.`,
        recordId: result.record.id,
      });
    } catch (err) {
      setNotification({
        type: "error",
        message: "Upload failed: " + (err.message || "Unknown error"),
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleOpenDoc = (doc) => {
    const match = records.find((r) => r.docName === doc.name || r.docId === doc.id);
    if (match) {
      setSelectedRecordId(match.id);
    }
    navigate("/validation");
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Completed" && doc.status === "Completed") ||
      (statusFilter === "Processing" && doc.status === "Processing");
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-10">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-extrabold text-[#1E293B] tracking-tight">
            Document Upload & Processing
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Ingest scanned geological survey PDFs, statutory yield forms, and tabular Excel reports.
          </p>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="neu-btn-dark px-4 py-2.5 rounded-2xl text-xs font-bold text-white flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Upload size={15} />
          <span>Upload Document</span>
        </button>
      </div>

      {/* ── NOTIFICATION / ALERT ── */}
      {notification && (
        <div
          className={`neu-card p-4 rounded-2xl text-xs flex items-center justify-between gap-3 ${
            notification.type === "success"
              ? "text-[#10B981] border-l-4 border-[#10B981]"
              : "text-rose-600 border-l-4 border-rose-600"
          }`}
        >
          <div className="flex items-center gap-2 font-medium">
            {notification.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{notification.message}</span>
          </div>
          {notification.recordId && (
            <button
              onClick={() => {
                setSelectedRecordId(notification.recordId);
                navigate("/validation");
              }}
              className="font-bold underline text-[#1E293B] shrink-0 cursor-pointer"
            >
              Open in Human Review →
            </button>
          )}
        </div>
      )}

      {/* ── DRAG & DROP UPLOAD AREA ── */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-4 p-12 rounded-3xl cursor-pointer transition-all duration-200
          ${
            dragActive
              ? "shadow-[inset_4px_4px_10px_rgba(163,177,198,0.5),inset_-4px_-4px_10px_rgba(255,255,255,0.9)] border-2 border-dashed border-[#1E293B]/40"
              : "neu-card border-2 border-dashed border-[#D5DEE8] hover:border-[#1E293B]/30"
          }
          ${isUploading ? "pointer-events-none opacity-75" : ""}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.xlsx,.xls,.csv,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="w-16 h-16 rounded-3xl bg-[#E8EDF5] shadow-[-4px_-4px_12px_rgba(255,255,255,0.9),4px_4px_12px_rgba(163,177,198,0.45)] flex items-center justify-center">
          {isUploading ? (
            <Loader size={28} className="text-[#1E293B] animate-spin" />
          ) : (
            <Upload size={28} className="text-[#1E293B]" />
          )}
        </div>

        <div className="text-center">
          <p className="text-base font-bold text-[#1E293B]">
            {isUploading
              ? "Extracting Project, Year, Production & Reserve…"
              : "Drag & drop coal documents here, or click to browse"}
          </p>
          <p className="text-sm text-[#64748B] mt-1">
            Supports PDF, XLSX, CSV, JPG · Max 50MB per file
          </p>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <button
            type="button"
            className="neu-btn px-5 py-2.5 rounded-2xl text-xs font-bold text-[#1E293B] flex items-center gap-2 cursor-pointer"
          >
            <Upload size={14} />
            <span>Browse Files</span>
          </button>
        </div>
      </div>

      {/* ── SIMPLE DOCUMENT TABLE ── */}
      <div className="neu-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-[#1E293B]">All Documents</h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Showing {filteredDocs.length} documents in intake repository
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3">
            <div className="neu-inset flex items-center gap-2 px-3.5 py-2 w-44 sm:w-56">
              <Search size={14} className="text-[#64748B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents…"
                className="bg-transparent outline-none border-none text-xs text-[#1E293B] placeholder-[#64748B] w-full"
              />
            </div>

            <div className="neu-inset px-3 py-1.5 flex items-center">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-xs font-bold text-[#1E293B] outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Processing">Processing</option>
              </select>
            </div>
          </div>
        </div>

        {/* Columns: File Name, Type, Date, Status, Pages, Action */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#D5DEE8]/60 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                <th className="py-3 px-3">File Name</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Pages</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D5DEE8]/40 text-xs">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#64748B]">
                    No documents found matching your filter.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-200/30 transition-colors">
                    {/* File Name */}
                    <td className="py-3.5 px-3 font-semibold text-[#1E293B]">
                      <div className="flex items-center gap-2.5">
                        {doc.type === "PDF" ? (
                          <FileText size={16} className="text-rose-600 shrink-0" />
                        ) : doc.type === "Excel" ? (
                          <FileSpreadsheet size={16} className="text-emerald-600 shrink-0" />
                        ) : (
                          <Image size={16} className="text-sky-600 shrink-0" />
                        )}
                        <span className="truncate max-w-[260px]">{doc.name}</span>
                      </div>
                      <span className="text-[10px] text-[#64748B] pl-6 block">
                        Size: {doc.size}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="py-3.5 px-3 font-semibold text-[#475569]">
                      {doc.type}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-3 text-[11px] text-[#64748B] whitespace-nowrap">
                      {doc.uploadedAt}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3">
                      {doc.status === "Completed" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#10B981] px-2.5 py-0.5 rounded-lg bg-emerald-500/10">
                          <CheckCircle2 size={11} /> Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 px-2.5 py-0.5 rounded-lg bg-amber-500/10 animate-pulse">
                          <Clock size={11} /> Processing
                        </span>
                      )}
                    </td>

                    {/* Pages */}
                    <td className="py-3.5 px-3 font-bold text-[#1E293B]">
                      {doc.pages}
                    </td>

                    {/* Action: Open */}
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => handleOpenDoc(doc)}
                        className="neu-btn px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#1E293B] hover:text-[#10B981] cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>Open</span>
                        <ExternalLink size={12} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Documents;