import React, { useState } from "react";
import {
  FileText,
  Eye,
  Download,
  Filter,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  HardHat,
  Search,
  ArrowUpDown
} from "lucide-react";
import { recentGeologicalSurveys } from "../../data/geologicalData";

const RecentSurveysTable = ({ onSelectSurvey, onViewAll }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredSurveys = recentGeologicalSurveys.filter((s) => {
    const matchesSearch =
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.block.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.surveyor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || s.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#10B981] px-2.5 py-1 rounded-lg bg-emerald-500/10 shadow-[inset_1px_1px_2px_rgba(16,185,129,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Completed
          </span>
        );
      case "Validated":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1E293B] px-2.5 py-1 rounded-lg bg-[#D5DEE8] shadow-[inset_1px_1px_2px_rgba(30,41,59,0.15)]">
            <ShieldCheck size={12} className="text-[#1E293B]" />
            Validated
          </span>
        );
      case "In Processing":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 px-2.5 py-1 rounded-lg bg-amber-500/15 shadow-[inset_1px_1px_2px_rgba(217,119,6,0.2)]">
            <Clock size={12} className="text-amber-600 animate-spin" />
            Processing
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 px-2.5 py-1 rounded-lg bg-slate-200/60 shadow-[inset_1px_1px_2px_rgba(100,116,139,0.2)]">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="neu-card p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-[#D5DEE8]/60">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[18px] font-bold text-[#1E293B] tracking-tight">
              Recent Geological Surveys
            </h2>
            <span className="text-[11px] font-semibold text-[#64748B] px-2 py-0.5 rounded-full bg-[#D5DEE8]/60">
              {recentGeologicalSurveys.length} Logs Available
            </span>
          </div>
          <p className="text-[12px] text-[#64748B] mt-0.5">
            Lithological borehole drill cores, seam thicknesses, and automated SeamNet validations
          </p>
        </div>

        {/* Action Controls & Tertiary "View All" Button */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Quick Search in table */}
          <div className="neu-inset flex items-center gap-2 px-3 py-1.5 w-44 sm:w-52">
            <Search size={14} className="text-[#64748B] shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter surveys..."
              className="w-full bg-transparent outline-none border-none text-xs text-[#1E293B] placeholder-[#64748B]"
            />
          </div>

          {/* Tertiary "View All" Button */}
          <button
            onClick={onViewAll}
            className="
              text-xs font-bold text-[#1E293B]
              px-3.5 py-2
              rounded-xl
              bg-[#E8EDF5]
              shadow-[-3px_-3px_8px_rgba(255,255,255,0.9),3px_3px_8px_rgba(163,177,198,0.45)]
              hover:shadow-[-4px_-4px_10px_rgba(255,255,255,1),4px_4px_10px_rgba(163,177,198,0.55)]
              active:shadow-[inset_2px_2px_4px_rgba(163,177,198,0.4)]
              transition-all duration-200
              flex items-center gap-1.5
              cursor-pointer
            "
          >
            <span>View All</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Table Container with Horizontal Scroll */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#CBD5E1]/60 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <th className="py-3 px-3">Borehole ID</th>
              <th className="py-3 px-3">Mining Block / Basin</th>
              <th className="py-3 px-3">Target Depth</th>
              <th className="py-3 px-3">Coal Thickness</th>
              <th className="py-3 px-3">Seam Grade</th>
              <th className="py-3 px-3">Model Accuracy</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D5DEE8]/50">
            {filteredSurveys.map((survey) => (
              <tr
                key={survey.id}
                className="group hover:bg-[#E2E8F0]/40 transition-colors duration-150 text-xs"
              >
                {/* Borehole ID */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#E8EDF5] shadow-[inset_1px_1px_3px_rgba(163,177,198,0.3),inset_-1px_-1px_3px_rgba(255,255,255,0.8)] flex items-center justify-center text-[#1E293B] font-mono font-bold text-[10px]">
                      BH
                    </div>
                    <div>
                      <span className="font-mono font-bold text-[#1E293B]">
                        {survey.id}
                      </span>
                      <p className="text-[10px] text-[#64748B]">
                        {survey.date}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Mining Block / Basin */}
                <td className="py-3.5 px-3">
                  <p className="font-bold text-[#1E293B]">{survey.block}</p>
                  <p className="text-[10px] text-[#64748B]">{survey.basin}</p>
                </td>

                {/* Target Depth */}
                <td className="py-3.5 px-3 font-mono font-bold text-[#1E293B]">
                  {survey.depth} m
                </td>

                {/* Coal Thickness */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#1E293B]">
                      {survey.thickness} m
                    </span>
                    <div className="w-12 h-1.5 rounded-full bg-[#CBD5E1] overflow-hidden">
                      <div
                        style={{ width: `${(survey.thickness / 25) * 100}%` }}
                        className="h-full bg-[#1E293B]"
                      />
                    </div>
                  </div>
                </td>

                {/* Seam Grade */}
                <td className="py-3.5 px-3">
                  <span className="font-semibold text-[#475569] px-2 py-0.5 rounded-md bg-[#D5DEE8]/70 border border-[#CBD5E1]">
                    {survey.grade}
                  </span>
                </td>

                {/* Accuracy */}
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-1.5 font-bold text-[#10B981]">
                    <Sparkles size={13} />
                    <span>{survey.accuracy}%</span>
                  </div>
                </td>

                {/* Status */}
                <td className="py-3.5 px-3">
                  {getStatusBadge(survey.status)}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onSelectSurvey && onSelectSurvey(survey)}
                      className="
                        p-1.5 rounded-xl bg-[#E8EDF5] text-[#1E293B]
                        shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(163,177,198,0.4)]
                        hover:shadow-[-3px_-3px_7px_rgba(255,255,255,1),3px_3px_7px_rgba(163,177,198,0.5)]
                        active:shadow-[inset_1px_1px_3px_rgba(163,177,198,0.4)]
                        transition-all duration-150
                        cursor-pointer
                      "
                      title="Inspect Strata Log"
                    >
                      <Eye size={15} />
                    </button>

                    <button
                      onClick={() => onSelectSurvey && onSelectSurvey(survey)}
                      className="
                        p-1.5 rounded-xl bg-[#E8EDF5] text-[#475569]
                        shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(163,177,198,0.4)]
                        hover:shadow-[-3px_-3px_7px_rgba(255,255,255,1),3px_3px_7px_rgba(163,177,198,0.5)]
                        active:shadow-[inset_1px_1px_3px_rgba(163,177,198,0.4)]
                        transition-all duration-150
                        cursor-pointer
                      "
                      title="Export Stratigraphy"
                    >
                      <Download size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentSurveysTable;
