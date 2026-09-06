import { Sparkles, ArrowRight } from "lucide-react";

const AIInsights = () => {
  return (
    <div className="neu-card p-6 h-full">

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">

          <div
            className="
              w-10 h-10
              flex items-center justify-center
              rounded-xl
              bg-[#eef1f4]
              text-slate-500
              shadow-[3px_3px_7px_rgba(163,177,198,0.2),-3px_-3px_7px_rgba(255,255,255,0.8)]
            "
          >
            <Sparkles size={19} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-700">
              AI Insights
            </h3>

            <p className="text-xs text-slate-400">
              Automated document intelligence
            </p>
          </div>

        </div>

        <span className="text-xs text-emerald-600 font-medium">
          Updated
        </span>
      </div>

      <div className="space-y-4">

        <div className="p-4 rounded-2xl bg-[#eef1f4]">
          <p className="text-sm leading-6 text-slate-600">
            Environmental assessment reports show an increase
            in recurring groundwater-related observations.
          </p>

          <button className="mt-3 flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700">
            Explore insight
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-[#eef1f4]">
          <p className="text-sm leading-6 text-slate-600">
            14 documents contain fields requiring validation
            before final reporting.
          </p>

          <button className="mt-3 flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700">
            Review documents
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default AIInsights;