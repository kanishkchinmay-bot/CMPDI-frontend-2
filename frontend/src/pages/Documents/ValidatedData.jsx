import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, CheckCircle2, FileText, Bot, Download } from "lucide-react";
import { useApp } from "../../context/AppContext";

const STATUSES = ["All", "validated", "rejected"];

const ValidatedData = () => {
  const navigate = useNavigate();
  const { records } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("validated");
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const filtered = records.filter((r) => {
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch =
      r.project.toLowerCase().includes(q) ||
      r.year.includes(q) ||
      r.docName.toLowerCase().includes(q) ||
      r.grade?.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const statusBadge = (s) => {
    if (s === "validated") return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#10B981] px-2 py-0.5 rounded-lg bg-emerald-500/10">
        <CheckCircle2 size={10} /> Validated
      </span>
    );
    if (s === "rejected") return (
      <span className="text-[10px] font-bold text-rose-600 px-2 py-0.5 rounded-lg bg-rose-500/10">Rejected</span>
    );
    return (
      <span className="text-[10px] font-bold text-amber-600 px-2 py-0.5 rounded-lg bg-amber-500/10">Pending</span>
    );
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-extrabold text-[#1E293B] tracking-tight">Validated Data</h1>
          <p className="text-sm text-[#64748B] mt-1">Approved records ready for AI queries and report generation.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/assistant")}
            className="neu-btn px-4 py-2.5 rounded-xl text-xs font-bold text-[#1E293B] flex items-center gap-2 cursor-pointer">
            <Bot size={14} /> Ask AI
          </button>
          <button onClick={() => navigate("/reports")}
            className="neu-btn-dark px-4 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 cursor-pointer">
            <FileText size={14} /> Generate Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="neu-inset flex items-center gap-2.5 px-4 py-2.5 flex-1 max-w-sm">
          <Search size={15} className="text-[#64748B] shrink-0" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by project, year, document…"
            className="w-full bg-transparent outline-none border-none text-xs text-[#1E293B] placeholder-[#64748B]" />
        </div>
        <div className="flex items-center gap-2">
          {STATUSES.map((s) => (
            <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer
                ${statusFilter === s
                  ? "shadow-[inset_3px_3px_6px_rgba(163,177,198,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.85)] text-[#1E293B]"
                  : "neu-btn text-[#64748B]"}`}>
              {s === "All" ? "All" : s === "validated" ? "✓ Validated" : "✗ Rejected"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {paginated.length === 0 ? (
        <div className="neu-card p-12 text-center">
          <CheckCircle2 size={32} className="text-[#D5DEE8] mx-auto mb-3" />
          <p className="text-sm font-bold text-[#475569]">No records found</p>
          <p className="text-xs text-[#64748B] mt-1">
            {statusFilter === "validated"
              ? "No validated records yet. Go to the Review Queue to approve extracted records."
              : "Try changing the filter or search term."}
          </p>
          <button onClick={() => navigate("/validation")}
            className="mt-4 neu-btn px-5 py-2 rounded-xl text-xs font-bold text-[#1E293B] cursor-pointer">
            Go to Review Queue
          </button>
        </div>
      ) : (
        <div className="neu-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-[#D5DEE8]">
                <tr>
                  {["Project / Mine Block", "Year", "Production", "Reserve", "Status", "Source Page", "Document"].map((h) => (
                    <th key={h} className="py-3.5 px-4 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EDF5]">
                {paginated.map((r) => (
                  <tr key={r.id} className="hover:bg-[#E2E8F0]/30 transition-colors">
                    <td className="py-3.5 px-4 text-xs font-bold text-[#1E293B]">{r.project}</td>
                    <td className="py-3.5 px-4 text-xs font-mono text-[#475569]">{r.year}</td>
                    <td className="py-3.5 px-4 text-xs font-mono font-bold text-[#1E293B]">{r.production}</td>
                    <td className="py-3.5 px-4 text-xs font-mono text-[#475569]">{r.reserve}</td>
                    <td className="py-3.5 px-4">{statusBadge(r.status)}</td>
                    <td className="py-3.5 px-4 text-xs text-[#64748B]">p.{r.sourcePage}</td>
                    <td className="py-3.5 px-4 text-xs text-[#64748B] truncate max-w-[160px]">{r.docName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-[#D5DEE8]">
              <span className="text-xs text-[#64748B]">
                Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
              </span>
              <div className="flex gap-1.5">
                {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer
                      ${p === page ? "bg-[#1E293B] text-white" : "neu-btn text-[#64748B]"}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="neu-card p-4 text-center">
          <p className="text-[10px] font-bold uppercase text-[#64748B]">Total Validated</p>
          <p className="text-2xl font-extrabold text-[#10B981] mt-1">
            {records.filter((r) => r.status === "validated").length}
          </p>
        </div>
        <div className="neu-card p-4 text-center">
          <p className="text-[10px] font-bold uppercase text-[#64748B]">Still Pending</p>
          <p className="text-2xl font-extrabold text-amber-600 mt-1">
            {records.filter((r) => r.status === "pending").length}
          </p>
        </div>
        <div className="neu-card p-4 text-center sm:col-span-1 col-span-2">
          <p className="text-[10px] font-bold uppercase text-[#64748B]">Source Documents</p>
          <p className="text-2xl font-extrabold text-[#1E293B] mt-1">
            {new Set(records.filter((r) => r.status === "validated").map((r) => r.docId)).size}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValidatedData;
