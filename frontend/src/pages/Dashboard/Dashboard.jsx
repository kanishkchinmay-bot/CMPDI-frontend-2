
import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  Download,
  Filter,
} from "lucide-react";

import { kpiMetrics } from "../../data/geologicalData";
import { KPIGrid } from "../../components/dashboard/KPICard";
import StrataDistributionCard from "../../components/analytics/StrataDistributionCard";
import ResourceAllocationCard from "../../components/analytics/ResourceAllocationCard";
import RecentSurveysTable from "../../components/dashboard/RecentSurveysTable";
import StrataDetailModal from "../../components/modals/StrataDetailModal";

const GeologicalDashboard = () => {
  const {
    onOpenFilter,
    onOpenExport,
  } = useOutletContext() || {};

  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="space-y-6 sm:space-y-7 pb-10">

      {/* =========================
          HEADER
         ========================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">

        <div>
          <h1 className="text-[26px] sm:text-[28px] font-extrabold text-[#1E293B] tracking-tight leading-tight">
            Analytics Overview
          </h1>

          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Comprehensive geological data analysis and modeling metrics.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">

          {/* Filter */}
          <button
            onClick={onOpenFilter}
            className="
              neu-btn
              px-4 py-2.5
              rounded-2xl
              text-xs font-bold text-[#1E293B]
              flex items-center gap-2
              cursor-pointer
            "
          >
            <Filter size={15} className="text-[#475569]" />
            <span>Filter Data</span>
          </button>

          {/* Export */}
          <button
            onClick={onOpenExport}
            className="
              neu-btn
              px-4 py-2.5
              rounded-2xl
              text-xs font-bold text-[#1E293B]
              flex items-center gap-2
              cursor-pointer
            "
          >
            <Download size={15} className="text-[#475569]" />
            <span>Export</span>
          </button>

        </div>
      </div>


      {/* =========================
          KPI CARDS
         ========================= */}
      <KPIGrid metrics={kpiMetrics} />


      {/* =========================
          ANALYTICS CARDS
         ========================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Strata Distribution */}
        <div className="lg:col-span-8 h-full">
          <StrataDistributionCard />
        </div>

        {/* Resource Allocation */}
        <div className="lg:col-span-4 h-full">
          <ResourceAllocationCard />
        </div>

      </div>


      {/* =========================
          RECENT SURVEYS
         ========================= */}
      <RecentSurveysTable
        onSelectSurvey={(survey) => setSelectedSurvey(survey)}
        onViewAll={() => navigate("/documents")}
      />


      {/* =========================
          SURVEY DETAIL MODAL
         ========================= */}
      {selectedSurvey && (
        <StrataDetailModal
          survey={selectedSurvey}
          onClose={() => setSelectedSurvey(null)}
        />
      )}

    </div>
  );
};

export default GeologicalDashboard;
