import { ShieldCheck, AlertTriangle } from "lucide-react";

const ValidationSummary = () => {
  return (
    <div className="neu-card p-6">

      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-slate-700">
            Validation Summary
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            Current document quality status
          </p>
        </div>

        <ShieldCheck size={20} className="text-slate-500" />
      </div>

      <div className="space-y-5">

        {/* Critical */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-xs text-slate-500">
              Critical Issues
            </span>

            <span className="text-xs font-semibold text-slate-600">
              4
            </span>
          </div>

          <div className="h-2 rounded-full bg-[#e2e6ea] overflow-hidden">
            <div
              className="h-full rounded-full bg-slate-500"
              style={{ width: "18%" }}
            />
          </div>
        </div>

        {/* Medium */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-xs text-slate-500">
              Medium Issues
            </span>

            <span className="text-xs font-semibold text-slate-600">
              11
            </span>
          </div>

          <div className="h-2 rounded-full bg-[#e2e6ea] overflow-hidden">
            <div
              className="h-full rounded-full bg-slate-400"
              style={{ width: "42%" }}
            />
          </div>
        </div>

        {/* Valid */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-xs text-slate-500">
              Valid Documents
            </span>

            <span className="text-xs font-semibold text-slate-600">
              92%
            </span>
          </div>

          <div className="h-2 rounded-full bg-[#e2e6ea] overflow-hidden">
            <div
              className="h-full rounded-full bg-slate-600"
              style={{ width: "92%" }}
            />
          </div>
        </div>

      </div>

      <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2">
        <AlertTriangle size={15} className="text-slate-400" />

        <span className="text-xs text-slate-400">
          15 documents require attention
        </span>
      </div>

    </div>
  );
};

export default ValidationSummary;