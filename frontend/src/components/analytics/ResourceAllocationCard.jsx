import React, { useState } from "react";
import { PieChart as PieIcon, Layers, Sparkles, Award, Compass } from "lucide-react";
import { resourceAllocationData } from "../../data/geologicalData";

const ResourceAllocationCard = () => {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const data = resourceAllocationData;

  // Calculate SVG Donut strokeDasharray offsets
  // Circumference for radius r=70 is 2 * PI * 70 = 439.82
  const radius = 72;
  const circumference = 2 * Math.PI * radius;

  // Cumulative angles
  const primaryOffset = 0;
  const primaryLength = (data.segments[0].percentage / 100) * circumference;

  const overburdenOffset = -primaryLength;
  const overburdenLength = (data.segments[1].percentage / 100) * circumference;

  const interburdenOffset = -(primaryLength + overburdenLength);
  const interburdenLength = (data.segments[2].percentage / 100) * circumference;

  return (
    <div className="neu-card p-6 flex flex-col justify-between h-full relative">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[#D5DEE8]/60">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] font-bold text-[#1E293B] tracking-tight">
                Resource Allocation
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981]">
                Optimal
              </span>
            </div>
            <p className="text-[12px] text-[#64748B] mt-0.5">
              Volumetric reserve distribution ratio
            </p>
          </div>

          <div className="w-8 h-8 rounded-xl bg-[#E8EDF5] shadow-[-2px_-2px_6px_rgba(255,255,255,0.9),2px_2px_6px_rgba(163,177,198,0.4)] flex items-center justify-center text-[#475569]">
            <PieIcon size={16} />
          </div>
        </div>
      </div>

      {/* Multi-Ring Donut Chart Area with Floating Central Square Badge */}
      <div className="my-6 relative flex items-center justify-center">
        {/* SVG Concentric Multi-Ring Donut */}
        <div className="relative w-52 h-52 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 180 180">
            {/* Background recessed ring track */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="transparent"
              stroke="#E0E6EF"
              strokeWidth="20"
              className="shadow-[inset_2px_2px_4px_rgba(163,177,198,0.4)]"
            />

            {/* Segment 1: Primary Seam (#1E293B) */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="transparent"
              stroke="#1E293B"
              strokeWidth="20"
              strokeDasharray={`${primaryLength} ${circumference}`}
              strokeDashoffset={primaryOffset}
              strokeLinecap="round"
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onMouseEnter={() => setSelectedSegment(data.segments[0])}
              onMouseLeave={() => setSelectedSegment(null)}
            />

            {/* Segment 2: Overburden (#475569) */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="transparent"
              stroke="#475569"
              strokeWidth="20"
              strokeDasharray={`${overburdenLength} ${circumference}`}
              strokeDashoffset={overburdenOffset}
              strokeLinecap="round"
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onMouseEnter={() => setSelectedSegment(data.segments[1])}
              onMouseLeave={() => setSelectedSegment(null)}
            />

            {/* Segment 3: Interburden (#94A3B8) */}
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="transparent"
              stroke="#94A3B8"
              strokeWidth="20"
              strokeDasharray={`${interburdenLength} ${circumference}`}
              strokeDashoffset={interburdenOffset}
              strokeLinecap="round"
              className="cursor-pointer transition-all duration-300 hover:opacity-90"
              onMouseEnter={() => setSelectedSegment(data.segments[2])}
              onMouseLeave={() => setSelectedSegment(null)}
            />
          </svg>

          {/* Floating Elevated Central Square Badge: "100% Coverage" */}
          <div
            className="
              absolute
              w-24 h-24
              rounded-2xl
              bg-[#E8EDF5]
              neu-floating
              flex flex-col items-center justify-center
              text-center
              border border-[#D5DEE8]/80
              p-2
              transition-transform duration-200
              hover:scale-105
            "
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              {selectedSegment ? selectedSegment.name : "Coverage"}
            </span>
            <span className="text-[17px] font-extrabold text-[#1E293B] leading-tight mt-0.5">
              {selectedSegment ? `${selectedSegment.percentage}%` : "100%"}
            </span>
            <span className="text-[9.5px] font-bold text-[#10B981] mt-0.5">
              {selectedSegment ? selectedSegment.volume : "4.82 MT"}
            </span>
          </div>
        </div>
      </div>

      {/* Legend below: Primary Seam, Overburden, Interburden */}
      <div className="space-y-2.5 pt-2 border-t border-[#D5DEE8]/60">
        {data.segments.map((seg) => {
          const isSelected = selectedSegment?.name === seg.name;
          return (
            <div
              key={seg.name}
              onMouseEnter={() => setSelectedSegment(seg)}
              onMouseLeave={() => setSelectedSegment(null)}
              className={`
                flex items-center justify-between p-2 rounded-xl transition-all duration-150 cursor-pointer
                ${
                  isSelected
                    ? "bg-[#E8EDF5] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]"
                    : "hover:bg-[#E8EDF5]/50"
                }
              `}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-3 h-3 rounded-md shrink-0 shadow-[-1px_-1px_2px_rgba(255,255,255,0.8),1px_1px_2px_rgba(0,0,0,0.2)]"
                  style={{ backgroundColor: seg.color }}
                />
                <div>
                  <p className="text-xs font-bold text-[#1E293B] leading-tight">
                    {seg.name}
                  </p>
                  <p className="text-[10px] text-[#64748B]">
                    {seg.volume}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-extrabold text-[#1E293B]">
                  {seg.percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Benchmarks Strip */}
      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#D5DEE8]/60 text-center">
        {data.benchmarks.map((bm) => (
          <div
            key={bm.label}
            className="p-1.5 rounded-lg bg-[#E8EDF5] shadow-[inset_1px_1px_2px_rgba(163,177,198,0.25)]"
          >
            <p className="text-[9px] font-bold text-[#64748B] uppercase">{bm.label}</p>
            <p className="text-[11px] font-extrabold text-[#1E293B]">{bm.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceAllocationCard;
