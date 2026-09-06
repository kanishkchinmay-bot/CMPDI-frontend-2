import React, { useState } from "react";
import { X, Filter, Check, RotateCcw } from "lucide-react";

const FilterModal = ({ isOpen, onClose, onApply }) => {
  const [selectedBasin, setSelectedBasin] = useState("All");
  const [minThickness, setMinThickness] = useState(10);
  const [minAccuracy, setMinAccuracy] = useState(90);
  const [selectedGrades, setSelectedGrades] = useState(["G-2", "G-3", "G-4"]);

  if (!isOpen) return null;

  const toggleGrade = (g) => {
    if (selectedGrades.includes(g)) {
      setSelectedGrades(selectedGrades.filter((x) => x !== g));
    } else {
      setSelectedGrades([...selectedGrades, g]);
    }
  };

  const handleReset = () => {
    setSelectedBasin("All");
    setMinThickness(10);
    setMinAccuracy(90);
    setSelectedGrades(["G-2", "G-3", "G-4"]);
  };

  const handleApply = () => {
    if (onApply) {
      onApply({
        basin: selectedBasin,
        minThickness,
        minAccuracy,
        grades: selectedGrades
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#E8EDF5] rounded-3xl shadow-[-10px_-10px_25px_rgba(255,255,255,0.95),10px_10px_30px_rgba(163,177,198,0.6)] border border-[#D5DEE8] p-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D5DEE8]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E8EDF5] shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(163,177,198,0.4)] flex items-center justify-center text-[#1E293B]">
              <Filter size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E293B]">Filter Data</h3>
              <p className="text-[11px] text-[#64748B]">Subsurface parameter constraints</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#E8EDF5] shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(163,177,198,0.4)] flex items-center justify-center text-[#475569] cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Filters */}
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
              Coalfield Basin
            </label>
            <div className="neu-inset px-3.5 py-2">
              <select
                value={selectedBasin}
                onChange={(e) => setSelectedBasin(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xs font-bold text-[#1E293B]"
              >
                <option value="All">All Basins (Damodar, Jharia, Raniganj, Son)</option>
                <option value="Damodar Valley">Damodar Valley Basin</option>
                <option value="Jharia Coalfield">Jharia Coalfield</option>
                <option value="Raniganj">Raniganj Coalfield</option>
                <option value="Son Valley">Son Valley Coalfield</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Min Coal Seam Thickness: {minThickness}m
              </label>
            </div>
            <input
              type="range"
              min="2"
              max="25"
              value={minThickness}
              onChange={(e) => setMinThickness(Number(e.target.value))}
              className="w-full accent-[#1E293B] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Min AI Confidence: {minAccuracy}%
              </label>
            </div>
            <input
              type="range"
              min="80"
              max="99"
              value={minAccuracy}
              onChange={(e) => setMinAccuracy(Number(e.target.value))}
              className="w-full accent-[#10B981] cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
              Coal Seam Quality Grades
            </label>
            <div className="flex flex-wrap gap-2">
              {["G-1", "G-2", "G-3", "G-4", "G-5", "G-6"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => toggleGrade(g)}
                  className={`
                    px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer
                    ${
                      selectedGrades.includes(g)
                        ? "neu-inset text-[#1E293B]"
                        : "neu-btn text-[#64748B]"
                    }
                  `}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#D5DEE8]">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#1E293B] cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 text-xs font-bold text-[#64748B] cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="neu-btn px-4 py-2 text-xs font-bold text-[#1E293B] cursor-pointer"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
