import React, { useState } from "react";
import {
  X,
  Layers,
  Sparkles,
  Download,
  Share2,
  FileSpreadsheet,
  CheckCircle2,
  ShieldCheck,
  Flame,
  Droplets,
  Zap,
  HardHat,
  MapPin,
  Calendar
} from "lucide-react";

const StrataDetailModal = ({ survey, onClose }) => {
  const [activeTab, setActiveTab] = useState("column"); // 'column', 'chemistry', 'logs'
  if (!survey) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-[#E8EDF5] rounded-3xl shadow-[-10px_-10px_25px_rgba(255,255,255,0.95),10px_10px_30px_rgba(163,177,198,0.6)] border border-[#D5DEE8] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-[#D5DEE8] flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#E8EDF5] shadow-[-3px_-3px_8px_rgba(255,255,255,0.9),3px_3px_8px_rgba(163,177,198,0.45)] flex items-center justify-center text-[#1E293B]">
              <Layers size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#1E293B]">
                  Borehole Stratigraphic Log: {survey.id}
                </h3>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981]">
                  {survey.accuracy}% AI Confidence
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                {survey.block} • {survey.basin} • {survey.formation}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-[#E8EDF5] shadow-[-3px_-3px_7px_rgba(255,255,255,0.9),3px_3px_7px_rgba(163,177,198,0.4)] hover:shadow-[-4px_-4px_9px_rgba(255,255,255,1),4px_4px_9px_rgba(163,177,198,0.5)] active:shadow-[inset_2px_2px_4px_rgba(163,177,198,0.4)] flex items-center justify-center text-[#475569] cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Spec Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-6 py-4 bg-[#E0E7F0]/40 border-b border-[#D5DEE8]">
          <div className="neu-inset p-2.5 text-center">
            <span className="text-[10px] font-bold text-[#64748B] uppercase">Total Depth</span>
            <p className="text-sm font-extrabold text-[#1E293B]">{survey.depth} m</p>
          </div>
          <div className="neu-inset p-2.5 text-center">
            <span className="text-[10px] font-bold text-[#64748B] uppercase">Coal Seam Thickness</span>
            <p className="text-sm font-extrabold text-[#1E293B]">{survey.thickness} m</p>
          </div>
          <div className="neu-inset p-2.5 text-center">
            <span className="text-[10px] font-bold text-[#64748B] uppercase">Seam Quality Grade</span>
            <p className="text-sm font-extrabold text-[#1E293B]">{survey.grade}</p>
          </div>
          <div className="neu-inset p-2.5 text-center">
            <span className="text-[10px] font-bold text-[#64748B] uppercase">Gross Calorific Value</span>
            <p className="text-sm font-extrabold text-[#10B981]">{survey.gcv}</p>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="flex items-center gap-3 px-6 pt-4 border-b border-[#D5DEE8]">
          <button
            onClick={() => setActiveTab("column")}
            className={`pb-3 px-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "column"
                ? "text-[#1E293B] border-b-2 border-[#1E293B]"
                : "text-[#64748B] hover:text-[#1E293B]"
            }`}
          >
            Stratigraphic Column (Core Horizon)
          </button>
          <button
            onClick={() => setActiveTab("chemistry")}
            className={`pb-3 px-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "chemistry"
                ? "text-[#1E293B] border-b-2 border-[#1E293B]"
                : "text-[#64748B] hover:text-[#1E293B]"
            }`}
          >
            Proximate & Ultimate Analysis
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`pb-3 px-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "logs"
                ? "text-[#1E293B] border-b-2 border-[#1E293B]"
                : "text-[#64748B] hover:text-[#1E293B]"
            }`}
          >
            Surveyor Metadata & Coordinates
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 max-h-[380px] overflow-y-auto">
          {activeTab === "column" && (
            <div className="space-y-4">
              <p className="text-xs font-semibold text-[#475569]">
                Vertical Core Drill Interval Breakdown & Lithology Classification:
              </p>
              <div className="space-y-2">
                {survey.layers.map((layer, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#E8EDF5] shadow-[-2px_-2px_6px_rgba(255,255,255,0.9),2px_2px_6px_rgba(163,177,198,0.35)] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-8 rounded-md shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]"
                        style={{ backgroundColor: layer.color }}
                      />
                      <div>
                        <p className="text-xs font-bold text-[#1E293B]">
                          {layer.type}
                        </p>
                        <p className="text-[11px] text-[#64748B]">
                          Depth Horizon: {layer.depth}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#D5DEE8] text-[#1E293B]">
                      Layer #{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "chemistry" && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="neu-card p-4 text-center">
                <Droplets size={20} className="mx-auto text-[#475569] mb-2" />
                <span className="text-[11px] font-bold text-[#64748B] uppercase">Moisture</span>
                <p className="text-lg font-extrabold text-[#1E293B] mt-1">{survey.moisture}</p>
                <p className="text-[10px] text-[#10B981] mt-1">Air-dried basis</p>
              </div>

              <div className="neu-card p-4 text-center">
                <Flame size={20} className="mx-auto text-amber-600 mb-2" />
                <span className="text-[11px] font-bold text-[#64748B] uppercase">Ash Content</span>
                <p className="text-lg font-extrabold text-[#1E293B] mt-1">{survey.ashContent}</p>
                <p className="text-[10px] text-[#64748B] mt-1">Grade Compliant</p>
              </div>

              <div className="neu-card p-4 text-center">
                <Zap size={20} className="mx-auto text-sky-600 mb-2" />
                <span className="text-[11px] font-bold text-[#64748B] uppercase">Volatile Matter</span>
                <p className="text-lg font-extrabold text-[#1E293B] mt-1">{survey.volatileMatter}</p>
                <p className="text-[10px] text-[#64748B] mt-1">IS 1350 Certified</p>
              </div>

              <div className="neu-card p-4 text-center">
                <Sparkles size={20} className="mx-auto text-[#10B981] mb-2" />
                <span className="text-[11px] font-bold text-[#64748B] uppercase">Gross Calorific</span>
                <p className="text-lg font-extrabold text-[#10B981] mt-1">{survey.gcv}</p>
                <p className="text-[10px] text-[#10B981] mt-1">Prime Yield</p>
              </div>
            </div>
          )}

          {activeTab === "logs" && (
            <div className="space-y-3">
              <div className="neu-card p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#1E293B]">GPS Coordinates</p>
                  <p className="text-xs text-[#64748B] mt-0.5">{survey.coordinates}</p>
                </div>
                <MapPin className="text-[#475569]" size={18} />
              </div>

              <div className="neu-card p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#1E293B]">Chief Surveyor / Geologist</p>
                  <p className="text-xs text-[#64748B] mt-0.5">{survey.surveyor}</p>
                </div>
                <HardHat className="text-[#475569]" size={18} />
              </div>

              <div className="neu-card p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#1E293B]">Logging & Sync Timestamp</p>
                  <p className="text-xs text-[#64748B] mt-0.5">{survey.date} (CMPDI GeoCloud v4.2)</p>
                </div>
                <Calendar className="text-[#475569]" size={18} />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-[#D5DEE8] flex items-center justify-between bg-[#E8EDF5]">
          <span className="text-xs font-medium text-[#64748B]">
            CMPDI Subsurface GeoIntelligence Archive
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#475569] hover:text-[#1E293B] cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert(`Exporting high-resolution LAS & Stratigraphy report for ${survey.id}...`);
              }}
              className="neu-btn px-4 py-2 rounded-xl text-xs font-bold text-[#1E293B] flex items-center gap-2 cursor-pointer"
            >
              <Download size={14} />
              <span>Export Borehole LAS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrataDetailModal;
