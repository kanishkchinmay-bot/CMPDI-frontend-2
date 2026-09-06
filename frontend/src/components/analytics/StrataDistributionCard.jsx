import React, { useState } from "react";
import {
  ChevronDown,
  Layers,
  Info,
  Maximize2,
  SlidersHorizontal,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { strataDistributionDataByQuarter } from "../../data/geologicalData";

const StrataDistributionCard = () => {
  const [selectedQuarter, setSelectedQuarter] = useState("Q3 2023");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredBlock, setHoveredBlock] = useState(null);
  const [activeMetric, setActiveMetric] = useState("all"); // 'all', 'coal', 'sandstone'

  const quarters = ["Q3 2023", "Q2 2023", "Q1 2023", "Q4 2022"];
  const currentData = strataDistributionDataByQuarter[selectedQuarter] || strataDistributionDataByQuarter["Q3 2023"];

  // Find max value to scale chart bars proportionally (max ~ 300)
  const maxScaleValue = 300;

  return (
    <div className="neu-card p-6 flex flex-col justify-between h-full relative">
      {/* Top Header: Title, Subtitle, Quarter Dropdown & Legend */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#D5DEE8]/60">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] font-bold text-[#1E293B] tracking-tight">
                Strata Distribution Analysis
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1E293B] text-white">
                SeamNet 3D
              </span>
            </div>
            <p className="text-[12px] text-[#64748B] mt-0.5">
              Vertical lithological depth & thickness across exploration blocks A–F
            </p>
          </div>

          {/* Quarter Dropdown Badge & Legend */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Quarter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="
                  flex items-center gap-2
                  px-3.5 py-1.5
                  rounded-xl
                  bg-[#E8EDF5]
                  text-xs font-bold text-[#1E293B]
                  shadow-[-3px_-3px_8px_rgba(255,255,255,0.9),3px_3px_8px_rgba(163,177,198,0.4)]
                  hover:shadow-[-4px_-4px_10px_rgba(255,255,255,1),4px_4px_10px_rgba(163,177,198,0.5)]
                  active:shadow-[inset_2px_2px_4px_rgba(163,177,198,0.4)]
                  transition-all duration-200
                  cursor-pointer
                "
              >
                <span>{selectedQuarter}</span>
                <ChevronDown size={14} className={`text-[#64748B] transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-xl bg-[#E8EDF5] shadow-[-6px_-6px_16px_rgba(255,255,255,0.95),6px_6px_16px_rgba(163,177,198,0.45)] border border-[#D5DEE8] p-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
                  {quarters.map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setSelectedQuarter(q);
                        setDropdownOpen(false);
                      }}
                      className={`
                        w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer
                        ${
                          selectedQuarter === q
                            ? "bg-[#1E293B] text-white"
                            : "text-[#475569] hover:bg-[#D5DEE8]/50"
                        }
                      `}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dual-color Legend */}
        <div className="flex items-center justify-between mt-4 mb-2">
          <div className="flex items-center gap-5">
            {/* Coal Seam Legend (#1E293B) */}
            <div
              onClick={() => setActiveMetric(activeMetric === "coal" ? "all" : "coal")}
              className={`flex items-center gap-2 cursor-pointer select-none px-2 py-1 rounded-lg transition-all ${
                activeMetric === "coal" ? "bg-[#1E293B]/10 shadow-[inset_1px_1px_3px_rgba(30,41,59,0.2)]" : ""
              }`}
            >
              <div className="w-3.5 h-3.5 rounded-md bg-[#1E293B] shadow-[-1px_-1px_3px_rgba(255,255,255,0.8),1px_1px_3px_rgba(0,0,0,0.25)]" />
              <span className="text-xs font-bold text-[#1E293B]">Coal Seam</span>
              <span className="text-[10px] text-[#64748B] font-mono">(#1E293B)</span>
            </div>

            {/* Sandstone Legend (#475569) */}
            <div
              onClick={() => setActiveMetric(activeMetric === "sandstone" ? "all" : "sandstone")}
              className={`flex items-center gap-2 cursor-pointer select-none px-2 py-1 rounded-lg transition-all ${
                activeMetric === "sandstone" ? "bg-[#475569]/10 shadow-[inset_1px_1px_3px_rgba(71,85,105,0.2)]" : ""
              }`}
            >
              <div className="w-3.5 h-3.5 rounded-md bg-[#475569] shadow-[-1px_-1px_3px_rgba(255,255,255,0.8),1px_1px_3px_rgba(0,0,0,0.25)]" />
              <span className="text-xs font-bold text-[#475569]">Sandstone</span>
              <span className="text-[10px] text-[#64748B] font-mono">(#475569)</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-[#64748B]">
            <span>Unit: Depth in Meters (m)</span>
          </div>
        </div>
      </div>

      {/* Main Vertical Grouped Bar Chart Area */}
      <div className="my-6 relative">
        {/* Hover Tooltip Overlay */}
        {hoveredBlock && (
          <div
            className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 rounded-xl bg-[#E8EDF5] shadow-[-4px_-4px_10px_rgba(255,255,255,0.95),4px_4px_10px_rgba(163,177,198,0.5)] border border-[#D5DEE8] flex items-center gap-4 animate-in fade-in duration-150"
          >
            <div>
              <span className="text-xs font-bold text-[#1E293B]">
                {hoveredBlock.block}
              </span>
              <span className="text-[10px] text-[#10B981] font-semibold ml-2">
                {hoveredBlock.confidence}% Confidence
              </span>
            </div>
            <div className="h-4 w-px bg-[#CBD5E1]" />
            <div className="flex items-center gap-3 text-xs">
              <span className="text-[#1E293B] font-bold">
                Coal: {hoveredBlock.coalSeam}m
              </span>
              <span className="text-[#475569] font-bold">
                Sandstone: {hoveredBlock.sandstone}m
              </span>
              <span className="text-[#64748B]">
                Avg Thickness: {hoveredBlock.avgThickness}
              </span>
            </div>
          </div>
        )}

        {/* Chart Container */}
        <div className="h-64 sm:h-72 w-full pt-8 pb-2 flex items-end justify-between gap-2 sm:gap-4">
          {/* Y-Axis Guidelines & Labels */}
          <div className="h-full flex flex-col justify-between text-[10px] font-mono font-bold text-[#94A3B8] pr-2 pb-6 shrink-0 select-none">
            <span>300m</span>
            <span>225m</span>
            <span>150m</span>
            <span>75m</span>
            <span>0m</span>
          </div>

          {/* Grouped Bars Grid across Blocks A through F */}
          <div className="flex-1 h-full flex items-end justify-around gap-2 sm:gap-6 border-b border-[#CBD5E1] pb-2 relative">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="border-b border-dashed border-[#CBD5E1] w-full" />
              <div className="border-b border-dashed border-[#CBD5E1] w-full" />
              <div className="border-b border-dashed border-[#CBD5E1] w-full" />
              <div className="border-b border-dashed border-[#CBD5E1] w-full" />
            </div>

            {currentData.map((item) => {
              const coalHeightPercent = Math.min((item.coalSeam / maxScaleValue) * 100, 100);
              const sandstoneHeightPercent = Math.min((item.sandstone / maxScaleValue) * 100, 100);
              const isHovered = hoveredBlock?.block === item.block;

              return (
                <div
                  key={item.block}
                  onMouseEnter={() => setHoveredBlock(item)}
                  onMouseLeave={() => setHoveredBlock(null)}
                  className="flex flex-col items-center h-full justify-end group cursor-pointer z-10 flex-1 max-w-[64px]"
                >
                  {/* Pair of Grouped Bars */}
                  <div className="w-full flex items-end justify-center gap-1.5 h-full pb-1">
                    {/* Bar 1: Coal Seam (#1E293B) */}
                    <div
                      className="w-1/2 flex flex-col justify-end items-center h-full relative"
                      style={{ opacity: activeMetric === "sandstone" ? 0.3 : 1 }}
                    >
                      {/* Recessed Track for tactile neumorphic depth */}
                      <div className="w-full h-full rounded-t-lg bg-[#E0E6EF] shadow-[inset_1px_1px_3px_rgba(163,177,198,0.4),inset_-1px_-1px_3px_rgba(255,255,255,0.8)] flex flex-col justify-end overflow-hidden p-0.5">
                        <div
                          style={{ height: `${coalHeightPercent}%` }}
                          className={`
                            w-full bg-[#1E293B] rounded-t-md transition-all duration-500 ease-out shadow-[-2px_-2px_5px_rgba(255,255,255,0.3),2px_2px_5px_rgba(0,0,0,0.3)]
                            ${isHovered ? "bg-[#0F172A] scale-y-105" : ""}
                          `}
                        />
                      </div>
                    </div>

                    {/* Bar 2: Sandstone (#475569) */}
                    <div
                      className="w-1/2 flex flex-col justify-end items-center h-full relative"
                      style={{ opacity: activeMetric === "coal" ? 0.3 : 1 }}
                    >
                      {/* Recessed Track */}
                      <div className="w-full h-full rounded-t-lg bg-[#E0E6EF] shadow-[inset_1px_1px_3px_rgba(163,177,198,0.4),inset_-1px_-1px_3px_rgba(255,255,255,0.8)] flex flex-col justify-end overflow-hidden p-0.5">
                        <div
                          style={{ height: `${sandstoneHeightPercent}%` }}
                          className={`
                            w-full bg-[#475569] rounded-t-md transition-all duration-500 ease-out shadow-[-2px_-2px_5px_rgba(255,255,255,0.3),2px_2px_5px_rgba(0,0,0,0.25)]
                            ${isHovered ? "bg-[#334155] scale-y-105" : ""}
                          `}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Block Label (Block A - Block F) */}
                  <span
                    className={`
                      text-[11px] font-bold tracking-tight mt-2 transition-colors duration-150
                      ${isHovered ? "text-[#1E293B] scale-105" : "text-[#64748B]"}
                    `}
                  >
                    {item.block}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="grid grid-cols-3 gap-3 pt-3.5 border-t border-[#D5DEE8]/60 text-center">
        <div className="p-2.5 rounded-xl bg-[#E8EDF5] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.25),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
            Max Seam Depth
          </p>
          <p className="text-sm font-extrabold text-[#1E293B] mt-0.5">
            260m (Block E)
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-[#E8EDF5] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.25),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
            Avg Coal Thickness
          </p>
          <p className="text-sm font-extrabold text-[#1E293B] mt-0.5">
            18.4m
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-[#E8EDF5] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.25),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
            Dominant Lithology
          </p>
          <p className="text-sm font-extrabold text-[#1E293B] mt-0.5">
            Bituminous Coal
          </p>
        </div>
      </div>
    </div>
  );
};

export default StrataDistributionCard;
