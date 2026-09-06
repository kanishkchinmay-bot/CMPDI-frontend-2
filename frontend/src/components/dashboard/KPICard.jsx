import React from "react";
import {
  TrendingUp,
  Minus,
  Layers,
  FlaskConical,
  ShieldCheck,
  Building2,
  HardHat,
  Sparkles
} from "lucide-react";

export const KPICard = ({
  title,
  value,
  trend,
  trendPeriod = "this month",
  trendPositive = true,
  iconType = "architecture",
  description = ""
}) => {
  // Select icon based on iconType
  const renderIcon = () => {
    switch (iconType) {
      case "architecture":
        return <Building2 size={20} className="text-[#1E293B]" />;
      case "layers":
        return <Layers size={20} className="text-[#1E293B]" />;
      case "science":
        return <FlaskConical size={20} className="text-[#1E293B]" />;
      case "verified":
        return <ShieldCheck size={20} className="text-[#1E293B]" />;
      default:
        return <Sparkles size={20} className="text-[#1E293B]" />;
    }
  };

  return (
    <div className="neu-card p-5.5 relative group hover:translate-y-[-2px] transition-all duration-200">
      {/* Top row: Metric Title + Neumorphic Icon Badge */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[11.5px] font-bold uppercase tracking-[0.06em] text-[#64748B] block">
            {title}
          </span>
          {/* Main Metric Value: 32px-36px, Bold */}
          <div className="text-[32px] sm:text-[34px] font-extrabold text-[#1E293B] tracking-tight mt-1 leading-none">
            {value}
          </div>
        </div>

        {/* Soft Neumorphic Icon Badge */}
        <div className="w-11 h-11 rounded-2xl bg-[#E8EDF5] shadow-[-3px_-3px_8px_rgba(255,255,255,0.9),3px_3px_8px_rgba(163,177,198,0.4)] flex items-center justify-center shrink-0">
          {renderIcon()}
        </div>
      </div>

      {/* Bottom row: Trend indicator & description */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#D5DEE8]/50">
        {trendPositive === true ? (
          <div className="flex items-center gap-1 text-[12px] font-bold text-[#10B981] px-2 py-0.5 rounded-lg bg-emerald-500/10 shadow-[inset_1px_1px_2px_rgba(16,185,129,0.2)]">
            <TrendingUp size={13} strokeWidth={2.5} />
            <span>{trend}</span>
          </div>
        ) : trendPositive === false ? (
          <div className="flex items-center gap-1 text-[12px] font-bold text-rose-600 px-2 py-0.5 rounded-lg bg-rose-500/10 shadow-[inset_1px_1px_2px_rgba(225,29,72,0.2)]">
            <span>{trend}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[12px] font-bold text-[#64748B] px-2 py-0.5 rounded-lg bg-[#D5DEE8]/50">
            <Minus size={13} strokeWidth={2.5} />
            <span>{trend}</span>
          </div>
        )}

        <span className="text-[11px] font-medium text-[#64748B] truncate">
          {trendPeriod}
        </span>
      </div>
    </div>
  );
};

export const KPIGrid = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
      {metrics.map((item) => (
        <KPICard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default KPICard;