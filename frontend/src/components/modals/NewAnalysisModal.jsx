import React, { useState } from "react";
import {
  X,
  Plus,
  Layers,
  Sparkles,
  Play,
  Cpu,
  MapPin,
  CheckCircle2,
  HardHat,
  Database
} from "lucide-react";

const NewAnalysisModal = ({ isOpen, onClose, onComplete }) => {
  const [blockName, setBlockName] = useState("North Karanpura Block V");
  const [modelType, setModelType] = useState("SeamNet-v4.2");
  const [targetDepth, setTargetDepth] = useState(450);
  const [coreSamplesCount, setCoreSamplesCount] = useState(24);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successResult, setSuccessResult] = useState(null);

  if (!isOpen) return null;

  const handleRunAnalysis = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessResult({
        id: `BH-2026-NK-${Math.floor(100 + Math.random() * 900)}`,
        seamThickness: "17.8 m",
        grade: "G-3 Semi-Coking",
        confidence: "97.4%"
      });
    }, 1500);
  };

  const handleFinish = () => {
    if (onComplete && successResult) {
      onComplete(successResult);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#E8EDF5] rounded-3xl shadow-[-10px_-10px_25px_rgba(255,255,255,0.95),10px_10px_30px_rgba(163,177,198,0.6)] border border-[#D5DEE8] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-[#D5DEE8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E8EDF5] shadow-[-3px_-3px_8px_rgba(255,255,255,0.9),3px_3px_8px_rgba(163,177,198,0.45)] flex items-center justify-center text-[#1E293B]">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1E293B]">
                New Geological Analysis
              </h3>
              <p className="text-xs text-[#64748B]">
                Launch AI Borehole Stratification & Seam Inversion
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#E8EDF5] shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(163,177,198,0.4)] flex items-center justify-center text-[#475569] cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!successResult ? (
            <form onSubmit={handleRunAnalysis} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
                  Exploration Mining Block
                </label>
                <div className="neu-inset px-4 py-2.5">
                  <select
                    value={blockName}
                    onChange={(e) => setBlockName(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-xs font-bold text-[#1E293B]"
                  >
                    <option>North Karanpura Block V</option>
                    <option>Jharia Coalfield Deep Seam</option>
                    <option>Raniganj East Horizon</option>
                    <option>Bokaro South Basin</option>
                    <option>Singrauli Thermal Seam</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
                    Target Depth (m)
                  </label>
                  <div className="neu-inset px-4 py-2.5">
                    <input
                      type="number"
                      value={targetDepth}
                      onChange={(e) => setTargetDepth(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-xs font-bold text-[#1E293B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
                    Core Samples Loaded
                  </label>
                  <div className="neu-inset px-4 py-2.5">
                    <input
                      type="number"
                      value={coreSamplesCount}
                      onChange={(e) => setCoreSamplesCount(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-xs font-bold text-[#1E293B]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
                  AI Modeling Engine
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "SeamNet-v4.2", label: "SeamNet v4.2", desc: "Recommended" },
                    { id: "Hybrid-Kriging", label: "3D Kriging", desc: "Spatial Grid" },
                    { id: "Seismic-AI", label: "Seismic Invert", desc: "Acoustic ML" }
                  ].map((engine) => (
                    <button
                      key={engine.id}
                      type="button"
                      onClick={() => setModelType(engine.id)}
                      className={`
                        p-3 rounded-xl text-left transition-all cursor-pointer
                        ${
                          modelType === engine.id
                            ? "neu-inset text-[#1E293B] font-bold"
                            : "neu-btn text-[#64748B]"
                        }
                      `}
                    >
                      <p className="text-xs font-bold">{engine.label}</p>
                      <p className="text-[10px] text-[#10B981] mt-0.5">{engine.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="
                    w-full py-3.5 px-4
                    rounded-2xl
                    neu-btn-dark
                    text-white font-bold text-xs
                    flex items-center justify-center gap-2
                    cursor-pointer
                  "
                >
                  {isProcessing ? (
                    <>
                      <Cpu size={16} className="animate-spin" />
                      <span>Processing Geological Simulation...</span>
                    </>
                  ) : (
                    <>
                      <Play size={16} fill="currentColor" />
                      <span>Run Subsurface Analysis</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E8EDF5] shadow-[-3px_-3px_8px_rgba(255,255,255,0.9),3px_3px_8px_rgba(163,177,198,0.4)] flex items-center justify-center text-[#10B981]">
                <CheckCircle2 size={32} />
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#1E293B]">
                  Analysis Successfully Generated!
                </h4>
                <p className="text-xs text-[#64748B] mt-1">
                  Stratigraphic layer horizons identified and validated.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                <div className="neu-inset p-3">
                  <span className="text-[10px] text-[#64748B] font-bold uppercase">Borehole ID</span>
                  <p className="text-xs font-mono font-bold text-[#1E293B] mt-0.5">{successResult.id}</p>
                </div>
                <div className="neu-inset p-3">
                  <span className="text-[10px] text-[#64748B] font-bold uppercase">Coal Thickness</span>
                  <p className="text-xs font-mono font-bold text-[#1E293B] mt-0.5">{successResult.seamThickness}</p>
                </div>
                <div className="neu-inset p-3">
                  <span className="text-[10px] text-[#64748B] font-bold uppercase">Seam Grade</span>
                  <p className="text-xs font-bold text-[#1E293B] mt-0.5">{successResult.grade}</p>
                </div>
                <div className="neu-inset p-3">
                  <span className="text-[10px] text-[#64748B] font-bold uppercase">Accuracy</span>
                  <p className="text-xs font-bold text-[#10B981] mt-0.5">{successResult.confidence}</p>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3 rounded-xl neu-btn text-xs font-bold text-[#1E293B] mt-4 cursor-pointer"
              >
                Done & View in Survey Register
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewAnalysisModal;
