import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  FileText,
  X,
  Clock,
  Download,
  AlertTriangle,
  Bot,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const ValidatedData = () => {
  const navigate = useNavigate();
  const { records, setSelectedRecordId } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Approved");
  const [selectedDrawerRecord, setSelectedDrawerRecord] = useState(null);

  const handleSourceClick = (e, record) => {
    e.stopPropagation();
    setSelectedRecordId(record.id);
    navigate("/validation");
  };

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.colliery?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subsidiary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.docName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.year.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Approved" && r.status === "validated") ||
      (statusFilter === "Pending" && r.status === "pending") ||
      (statusFilter === "Quarantined" && r.status === "rejected");

    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = ["Project", "Colliery", "Subsidiary", "Year", "Production", "Reserve", "Status", "Source Document", "Page"];
    const rows = filteredRecords.map((r) => [
      `"${r.project}"`,
      `"${r.colliery || ""}"`,
      `"${r.subsidiary || ""}"`,
      `"${r.year}"`,
      `"${r.production}"`,
      `"${r.reserve}"`,
      `"${r.status}"`,
      `"${r.docName}"`,
      r.sourcePage,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CMPDI_Validated_Master_Repository_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-extrabold text-[#1E293B] tracking-tight">
            Validated Records Master Repository
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Verified geological extraction data authorized for parliamentary inquiries and ministerial reports.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => navigate("/assistant")}
            className="neu-btn px-4 py-2.5 rounded-2xl text-xs font-bold text-[#1E293B] flex items-center gap-2 cursor-pointer"
          >
            <Bot size={14} />
            <span>Ask AI</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="neu-btn-dark px-4 py-2.5 rounded-2xl text-xs font-bold text-white flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="neu-card p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
            Total Audited Coal Output
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-[#1E293B] mt-1 block">
            124.05 MT
          </span>
          <span className="text-[10.5px] text-[#10B981] font-semibold block mt-0.5">
            ✓ Reconciled 100%
          </span>
        </div>

        <div className="neu-card p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
            Total Certified Reserves
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-[#1E293B] mt-1 block">
            999.50 MT
          </span>
          <span className="text-[10.5px] text-[#64748B] font-semibold block mt-0.5">
            UNFC Standard Cat. 111
          </span>
        </div>

        <div className="neu-card p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
            Human Verification Ratio
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-[#10B981] mt-1 block">
            98.4%
          </span>
          <span className="text-[10.5px] text-[#10B981] font-semibold block mt-0.5">
            Senior Geologists Validated
          </span>
        </div>

        <div className="neu-card p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
            Source Citations
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-[#1E293B] mt-1 block">
            1,248 / 1,248
          </span>
          <span className="text-[10.5px] text-[#64748B] font-semibold block mt-0.5">
            Direct Page Index Linked
          </span>
        </div>
      </div>

      {/* ── SEARCH & FILTER BAR ── */}
      <div className="neu-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="neu-inset flex items-center gap-2 px-3.5 py-2 flex-1 max-w-md">
            <Search size={15} className="text-[#64748B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search verified projects, collieries, subsidiaries…"
              className="bg-transparent outline-none border-none text-[#1E293B] text-xs placeholder-[#64748B] w-full"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-2">
            {["Approved", "Pending", "All"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === s
                    ? "shadow-[inset_3px_3px_6px_rgba(163,177,198,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.85)] text-[#1E293B] font-extrabold"
                    : "neu-btn text-[#64748B]"
                }`}
              >
                {s === "Approved" ? "✓ Approved" : s === "Pending" ? "Pending" : "All Records"}
              </button>
            ))}
          </div>
        </div>

        {/* ── SEARCHABLE TABLE ── */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#D5DEE8]/60 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                <th className="py-3 px-3">Project</th>
                <th className="py-3 px-3">Year</th>
                <th className="py-3 px-3">Production</th>
                <th className="py-3 px-3">Reserve</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D5DEE8]/40 text-xs">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#64748B]">
                    No records found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelectedDrawerRecord(r)}
                    className="hover:bg-slate-200/30 transition-colors cursor-pointer"
                  >
                    {/* Project */}
                    <td className="py-3.5 px-3">
                      <div className="font-extrabold text-[#1E293B] text-xs">
                        {r.project}
                      </div>
                      <div className="text-[10.5px] text-[#64748B] mt-0.5">
                        {r.colliery} · <span className="font-semibold">{r.subsidiary}</span>
                      </div>
                    </td>

                    {/* Year */}
                    <td className="py-3.5 px-3 font-medium text-[#475569] whitespace-nowrap">
                      {r.year}
                    </td>

                    {/* Production */}
                    <td className="py-3.5 px-3 font-bold text-[#1E293B]">
                      {r.production}
                    </td>

                    {/* Reserve */}
                    <td className="py-3.5 px-3 font-bold text-[#1E293B]">
                      {r.reserve}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3">
                      {r.status === "validated" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#10B981] px-2.5 py-0.5 rounded-full bg-emerald-500/10">
                          <CheckCircle2 size={10} /> Approved
                        </span>
                      ) : r.status === "pending" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 px-2.5 py-0.5 rounded-full bg-amber-500/10">
                          <Clock size={10} /> Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-600 px-2.5 py-0.5 rounded-full bg-rose-500/10">
                          <AlertTriangle size={10} /> Quarantined
                        </span>
                      )}
                    </td>

                    {/* Source Link */}
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={(e) => handleSourceClick(e, r)}
                        className="neu-btn px-2.5 py-1 rounded-xl text-[11px] font-semibold text-[#1E293B] hover:text-[#10B981] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <FileText size={12} />
                        <span className="truncate max-w-[140px]">
                          {r.docName.replace("CMPDI_", "")}, P.{r.sourcePage}
                        </span>
                        <ExternalLink size={11} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── DETAIL DRAWER ── */}
      {selectedDrawerRecord && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-[#E8EDF5] h-full shadow-2xl p-6 overflow-y-auto space-y-5 border-l border-[#D5DEE8]">
            <div className="flex items-center justify-between pb-3 border-b border-[#D5DEE8]/60">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#64748B]">
                  Record Details
                </span>
                <h3 className="text-base font-bold text-[#1E293B]">
                  {selectedDrawerRecord.project}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDrawerRecord(null)}
                className="neu-btn p-1.5 rounded-xl text-[#64748B]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="neu-card-sm p-4">
                <span className="text-[10px] font-bold uppercase text-[#64748B] block">Reporting Division</span>
                <span className="text-xs font-bold text-[#1E293B]">
                  {selectedDrawerRecord.colliery} ({selectedDrawerRecord.subsidiary})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="neu-card-sm p-4">
                  <span className="text-[10px] font-bold uppercase text-[#64748B] block">Production</span>
                  <span className="text-sm font-bold text-[#1E293B]">
                    {selectedDrawerRecord.production}
                  </span>
                </div>
                <div className="neu-card-sm p-4">
                  <span className="text-[10px] font-bold uppercase text-[#64748B] block">Reserve</span>
                  <span className="text-sm font-bold text-[#1E293B]">
                    {selectedDrawerRecord.reserve}
                  </span>
                </div>
              </div>

              <div className="neu-card-sm p-4">
                <span className="text-[10px] font-bold uppercase text-[#64748B] block">Extraction Confidence</span>
                <span className="text-xs font-bold text-[#10B981]">
                  {selectedDrawerRecord.confidence}% High Confidence
                </span>
              </div>

              <div className="neu-card-sm p-4">
                <span className="text-[10px] font-bold uppercase text-[#64748B] block">Verified Source Snippet</span>
                <p className="text-xs text-[#1E293B] mt-1 italic leading-relaxed">
                  "{selectedDrawerRecord.sourceSnippet}"
                </p>
                <div className="text-[10px] text-[#64748B] mt-2">
                  Document: {selectedDrawerRecord.docName} · Page {selectedDrawerRecord.sourcePage}
                </div>
              </div>

              {selectedDrawerRecord.reviewerComment && (
                <div className="neu-card-sm p-4">
                  <span className="text-[10px] font-bold uppercase text-[#64748B] block">Reviewer Notes</span>
                  <p className="text-xs text-[#1E293B] mt-1">
                    {selectedDrawerRecord.reviewerComment}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#D5DEE8]/60">
              <button
                onClick={(e) => handleSourceClick(e, selectedDrawerRecord)}
                className="neu-btn-dark w-full py-3 px-4 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText size={14} />
                <span>Open Exact Source Page in Review</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidatedData;
