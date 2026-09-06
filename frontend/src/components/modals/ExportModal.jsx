import React, { useState } from "react";
import { X, Download, FileSpreadsheet, FileCode, CheckCircle2, Image as ImageIcon } from "lucide-react";

const ExportModal = ({ isOpen, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  if (!isOpen) return null;

  const formats = [
    { id: "pdf", name: "Comprehensive PDF Report", desc: "Stratigraphy maps, seam profiles & charts", icon: FileSpreadsheet },
    { id: "csv", name: "Borehole CSV / Excel", desc: "Raw lithology horizons & chemical assays", icon: FileSpreadsheet },
    { id: "geotiff", name: "GeoTIFF Elevation Grid", desc: "GIS raster for ArcMap & QGIS", icon: ImageIcon },
    { id: "dxf", name: "AutoCAD DXF Mine Plan", desc: "3D vectors & seam boundary contours", icon: FileCode }
  ];

  const handleTriggerExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExported(true);
      setTimeout(() => {
        setExported(false);
        onClose();
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#E8EDF5] rounded-3xl shadow-[-10px_-10px_25px_rgba(255,255,255,0.95),10px_10px_30px_rgba(163,177,198,0.6)] border border-[#D5DEE8] p-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D5DEE8]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E8EDF5] shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(163,177,198,0.4)] flex items-center justify-center text-[#1E293B]">
              <Download size={16} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E293B]">Export Analytics</h3>
              <p className="text-[11px] text-[#64748B]">Download formatted geological intelligence</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#E8EDF5] shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(163,177,198,0.4)] flex items-center justify-center text-[#475569] cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Format Selection */}
        <div className="space-y-2.5 py-4">
          {formats.map((fmt) => {
            const Icon = fmt.icon;
            const isSelected = selectedFormat === fmt.id;

            return (
              <div
                key={fmt.id}
                onClick={() => setSelectedFormat(fmt.id)}
                className={`
                  p-3 rounded-2xl flex items-center justify-between transition-all cursor-pointer
                  ${
                    isSelected
                      ? "neu-inset border border-[#CBD5E1]"
                      : "neu-btn"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E8EDF5] shadow-[inset_1px_1px_2px_rgba(163,177,198,0.3)] flex items-center justify-center text-[#1E293B]">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1E293B]">{fmt.name}</p>
                    <p className="text-[10px] text-[#64748B]">{fmt.desc}</p>
                  </div>
                </div>

                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? "border-[#1E293B] bg-[#1E293B]" : "border-[#94A3B8]"
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#D5DEE8] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-[#64748B] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleTriggerExport}
            disabled={isExporting}
            className="neu-btn-dark px-5 py-2.5 text-xs font-bold text-white flex items-center gap-2 cursor-pointer"
          >
            {isExporting ? (
              <span>Generating {selectedFormat.toUpperCase()}...</span>
            ) : exported ? (
              <>
                <CheckCircle2 size={14} className="text-[#10B981]" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download size={14} />
                <span>Download Now</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
