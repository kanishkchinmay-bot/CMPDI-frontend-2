import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Upload,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    documents,
    pendingQueue,
    pendingCount,
    validatedCount,
    conflictCount,
    setSelectedRecordId,
  } = useApp();

  const handleReviewClick = (recordId) => {
    setSelectedRecordId(recordId);
    navigate("/validation");
  };

  return (
    <div className="space-y-6 sm:space-y-7 pb-10">
      {/* ── STATUTORY PROTOCOL BANNER ── */}
      <div className="neu-card-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E8EDF5] shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(163,177,198,0.4)] flex items-center justify-center text-[#1E293B] shrink-0">
            <ShieldCheck size={16} className="text-[#10B981]" />
          </div>
          <div>
            <span className="font-bold text-[#1E293B] block uppercase tracking-wider text-[11px]">
              Statutory Integrity Protocol
            </span>
            <span className="text-[#64748B] text-[11.5px]">
              All geological and production records require validated human sign-off before aggregation into parliamentary inquiry reports.
            </span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#10B981] px-2.5 py-1 rounded-xl bg-emerald-500/10 shadow-[inset_1px_1px_2px_rgba(16,185,129,0.2)] shrink-0 self-start sm:self-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          Air-Gap Node Active
        </span>
      </div>

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
        <div>
          <h1 className="text-[26px] sm:text-[28px] font-extrabold text-[#1E293B] tracking-tight leading-tight">
            Operational Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Linear extraction, algorithmic reconciliation, and strict human validation pipeline for verified parliamentary reporting.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => navigate("/documents")}
            className="neu-btn px-4 py-2.5 rounded-2xl text-xs font-bold text-[#1E293B] flex items-center gap-2 cursor-pointer"
          >
            <Upload size={15} className="text-[#475569]" />
            <span>Upload Dossier</span>
          </button>

          <button
            onClick={() => navigate("/validation")}
            className="neu-btn-dark px-4 py-2.5 rounded-2xl text-xs font-bold text-white flex items-center gap-2 cursor-pointer"
          >
            <span>Review Pending Records ({pendingCount})</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* ── FOUR KPI CARDS ONLY ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* 1. Processed */}
        <div className="neu-card p-5.5 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[11.5px] font-bold uppercase tracking-[0.06em] text-[#64748B] block">
                Processed Documents
              </span>
              <div className="text-[32px] sm:text-[34px] font-extrabold text-[#1E293B] tracking-tight mt-1 leading-none">
                {144 + documents.length}
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#E8EDF5] shadow-[-3px_-3px_8px_rgba(255,255,255,0.9),3px_3px_8px_rgba(163,177,198,0.4)] flex items-center justify-center shrink-0">
              <FileText size={20} className="text-[#1E293B]" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#D5DEE8]/50">
            <div className="flex items-center gap-1 text-[12px] font-bold text-[#10B981] px-2 py-0.5 rounded-lg bg-emerald-500/10 shadow-[inset_1px_1px_2px_rgba(16,185,129,0.2)]">
              <span>97.4% pass</span>
            </div>
            <span className="text-[11px] font-medium text-[#64748B] truncate">
              Parsed successfully
            </span>
          </div>
        </div>

        {/* 2. Pending Review */}
        <div
          onClick={() => navigate("/validation")}
          className="neu-card p-5.5 flex flex-col justify-between cursor-pointer hover:translate-y-[-2px] transition-all"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[11.5px] font-bold uppercase tracking-[0.06em] text-amber-700 block">
                Pending Review
              </span>
              <div className="text-[32px] sm:text-[34px] font-extrabold text-amber-600 tracking-tight mt-1 leading-none">
                {pendingCount}
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#E8EDF5] shadow-[-3px_-3px_8px_rgba(255,255,255,0.9),3px_3px_8px_rgba(163,177,198,0.4)] flex items-center justify-center shrink-0">
              <Clock size={20} className="text-amber-600" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#D5DEE8]/50 text-[11px]">
            <span className="text-[#64748B]">Open queue →</span>
            <span className="font-bold text-amber-700 px-2 py-0.5 rounded-lg bg-amber-500/15 uppercase text-[10px]">
              {pendingCount} Awaiting
            </span>
          </div>
        </div>

        {/* 3. Validated */}
        <div
          onClick={() => navigate("/validated")}
          className="neu-card p-5.5 flex flex-col justify-between cursor-pointer hover:translate-y-[-2px] transition-all"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[11.5px] font-bold uppercase tracking-[0.06em] text-[#64748B] block">
                Validated Records
              </span>
              <div className="text-[32px] sm:text-[34px] font-extrabold text-[#1E293B] tracking-tight mt-1 leading-none">
                {1243 + validatedCount}
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#E8EDF5] shadow-[-3px_-3px_8px_rgba(255,255,255,0.9),3px_3px_8px_rgba(163,177,198,0.4)] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} className="text-[#10B981]" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#D5DEE8]/50">
            <div className="flex items-center gap-1 text-[12px] font-bold text-[#10B981] px-2 py-0.5 rounded-lg bg-emerald-500/10 shadow-[inset_1px_1px_2px_rgba(16,185,129,0.2)]">
              <span>99.2% Acc.</span>
            </div>
            <span className="text-[11px] font-medium text-[#64748B] truncate">
              CIL Golden DB
            </span>
          </div>
        </div>

        {/* 4. Conflicts */}
        <div className="neu-card p-5.5 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[11.5px] font-bold uppercase tracking-[0.06em] text-rose-700 block">
                Conflicts
              </span>
              <div className="text-[32px] sm:text-[34px] font-extrabold text-rose-600 tracking-tight mt-1 leading-none">
                {conflictCount}
              </div>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#E8EDF5] shadow-[-3px_-3px_8px_rgba(255,255,255,0.9),3px_3px_8px_rgba(163,177,198,0.4)] flex items-center justify-center shrink-0">
              <AlertTriangle size={20} className="text-rose-600" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#D5DEE8]/50 text-[11px]">
            <span className="text-[#64748B]">Discrepancies</span>
            <span className="font-bold text-rose-700 px-2 py-0.5 rounded-lg bg-rose-500/15 uppercase text-[10px]">
              Action Needed
            </span>
          </div>
        </div>
      </div>

      {/* ── ONE SMALL PRODUCTION TREND CHART ── */}
      <div className="neu-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#D5DEE8]/60">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#1E293B]">
              <TrendingUp size={16} className="text-[#10B981]" />
              <span>Monthly Coal Production Trend</span>
            </div>
            <p className="text-[11px] text-[#64748B] mt-0.5">
              Reconciled extraction volume (Million Tonnes) across operational subsidiaries (FY 2023-24)
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-[#64748B]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#94A3B8]" />
              <span>Target: 780 MT</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#10B981]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span>Reconciled: 752.4 MT</span>
            </div>
          </div>
        </div>

        {/* Soft Neumorphic SVG Trend Curve */}
        <div className="pt-5 pb-2">
          <div className="relative h-44 w-full">
            <svg viewBox="0 0 900 160" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="neuTrendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2="900" y2="30" stroke="#CBD5E1" strokeDasharray="3 3" opacity="0.6" />
              <line x1="0" y1="70" x2="900" y2="70" stroke="#CBD5E1" strokeDasharray="3 3" opacity="0.6" />
              <line x1="0" y1="110" x2="900" y2="110" stroke="#CBD5E1" strokeDasharray="3 3" opacity="0.6" />
              <line x1="0" y1="150" x2="900" y2="150" stroke="#CBD5E1" />

              {/* Target baseline */}
              <line x1="0" y1="45" x2="900" y2="45" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="5 5" />

              {/* Area under curve */}
              <path
                d="M 20 120 Q 100 115 180 110 T 340 100 T 500 90 T 660 82 T 820 62 L 870 56 L 870 150 L 20 150 Z"
                fill="url(#neuTrendGrad)"
              />

              {/* Trend line */}
              <path
                d="M 20 120 Q 100 115 180 110 T 340 100 T 500 90 T 660 82 T 820 62 L 870 56"
                fill="none"
                stroke="#1E293B"
                strokeWidth="2.5"
              />

              {/* Monthly Points */}
              {[
                { x: 20, y: 120, m: "Apr", v: "52.4 MT" },
                { x: 100, y: 115, m: "May", v: "54.1 MT" },
                { x: 180, y: 110, m: "Jun", v: "56.0 MT" },
                { x: 260, y: 105, m: "Jul", v: "58.2 MT" },
                { x: 340, y: 100, m: "Aug", v: "60.4 MT" },
                { x: 420, y: 95, m: "Sep", v: "62.1 MT" },
                { x: 500, y: 90, m: "Oct", v: "64.0 MT" },
                { x: 580, y: 86, m: "Nov", v: "65.5 MT" },
                { x: 660, y: 82, m: "Dec", v: "67.2 MT" },
                { x: 740, y: 72, m: "Jan", v: "70.1 MT" },
                { x: 820, y: 62, m: "Feb", v: "72.8 MT" },
                { x: 870, y: 56, m: "Mar", v: "74.2 MT" },
              ].map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="4.5" fill="#1E293B" stroke="#FFFFFF" strokeWidth="2" />
                  <text x={pt.x} y="160" textAnchor="middle" fontSize="10.5" fill="#64748B" fontWeight="600">
                    {pt.m}
                  </text>
                  {i === 11 && (
                    <g>
                      <rect x={pt.x - 30} y={pt.y - 28} width="60" height="22" rx="6" fill="#1E293B" />
                      <text x={pt.x} y={pt.y - 13} textAnchor="middle" fontSize="10.5" fill="#FFFFFF" fontWeight="bold">
                        {pt.v}
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* ── TWO SECTIONS: Urgent Review Queue & Recent Uploads ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (6 cols): Urgent Review Queue */}
        <div className="lg:col-span-6 neu-card p-6 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-[#D5DEE8]/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <h3 className="text-sm font-bold text-[#1E293B]">Urgent Review Queue</h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700">
              {pendingCount} Priority
            </span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-2 mb-4">
            Flagged records requiring immediate human sign-off before aggregation.
          </p>

          {pendingQueue.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#64748B]">
              <CheckCircle2 size={32} className="text-[#10B981] mb-2" />
              <p className="text-xs font-bold text-[#1E293B]">Queue is clear</p>
              <p className="text-[11px]">All extracted records have been reviewed.</p>
            </div>
          ) : (
            <div className="space-y-3 flex-1">
              {pendingQueue.map((item) => (
                <div
                  key={item.id}
                  className="neu-card-sm p-4 hover:shadow-[-5px_-5px_12px_rgba(255,255,255,1),5px_5px_14px_rgba(163,177,198,0.5)] transition-all flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-[#1E293B]">
                        {item.project}
                      </h4>
                      <p className="text-[10.5px] text-[#64748B] mt-0.5">
                        {item.subsidiary} · {item.year}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#1E293B]">
                      {item.production}
                    </span>
                  </div>

                  {item.warnings && item.warnings.length > 0 && (
                    <div className="flex items-start gap-1.5 p-2 rounded-xl bg-amber-500/10 text-[10.5px] text-amber-900 font-medium">
                      <AlertTriangle size={13} className="text-amber-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{item.warnings[0]}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-[#64748B]">
                      Page {item.sourcePage} ({item.sourceTable.split(":")[0]})
                    </span>
                    <button
                      onClick={() => handleReviewClick(item.id)}
                      className="neu-btn px-3 py-1 rounded-xl text-[11px] font-bold text-[#1E293B] hover:text-[#10B981] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Review</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right (6 cols): Recent Uploads */}
        <div className="lg:col-span-6 neu-card p-6 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-[#D5DEE8]/60">
            <h3 className="text-sm font-bold text-[#1E293B]">Recent Uploads</h3>
            <button
              onClick={() => navigate("/documents")}
              className="text-xs font-bold text-[#1E293B] hover:text-[#10B981] flex items-center gap-1 cursor-pointer"
            >
              <span>View Documents</span>
              <ArrowRight size={12} />
            </button>
          </div>
          <p className="text-[11px] text-[#64748B] mt-2 mb-3">
            File, date, and processing status log
          </p>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D5DEE8]/60 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  <th className="pb-2.5">File Name</th>
                  <th className="pb-2.5">Date</th>
                  <th className="pb-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D5DEE8]/40 text-xs">
                {documents.slice(0, 5).map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-200/30 transition-colors">
                    <td className="py-3 pr-2">
                      <div className="flex items-center gap-2">
                        <FileText size={15} className="text-[#1E293B] shrink-0" />
                        <span className="font-semibold text-[#1E293B] truncate max-w-[180px]">
                          {doc.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#64748B] pl-5 block">
                        {doc.type} · {doc.size}
                      </span>
                    </td>
                    <td className="py-3 text-[11px] text-[#64748B] whitespace-nowrap">
                      {doc.uploadedAt}
                    </td>
                    <td className="py-3 text-right">
                      {doc.status === "Completed" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#10B981] px-2.5 py-0.5 rounded-full bg-emerald-500/10">
                          <CheckCircle2 size={11} /> Validated
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 px-2.5 py-0.5 rounded-full bg-amber-500/10 animate-pulse">
                          Processing ({doc.recordsExtracted ? "100%" : "78%"})
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
