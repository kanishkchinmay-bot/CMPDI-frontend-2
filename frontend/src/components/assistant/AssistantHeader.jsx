import {
  Bot,
  Sparkles,
  Database,
  ShieldCheck,
} from "lucide-react";

const AssistantHeader = () => {
  return (
    <div className="neu-card p-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        {/* Left */}
        <div className="flex items-center gap-4">

          <div
            className="
              w-14 h-14
              shrink-0
              rounded-2xl
              bg-[#eef1f4]
              flex items-center justify-center
              text-slate-500
              shadow-[4px_4px_8px_rgba(163,177,198,0.25),-4px_-4px_8px_rgba(255,255,255,0.85)]
            "
          >
            <Bot size={25} strokeWidth={1.8} />
          </div>

          <div>
            <div className="flex items-center gap-2">

              <h2 className="text-lg font-semibold text-slate-700">
                GeoMine Insights AI Assistant
              </h2>

              <span className="w-2 h-2 rounded-full bg-emerald-500" />

              <span className="text-[10px] font-medium text-slate-400">
                Online
              </span>

            </div>

            <p className="text-xs text-slate-400 mt-1.5">
              Ask questions and retrieve insights from your document repository.
            </p>
          </div>

        </div>


        {/* Capabilities */}
        <div className="flex flex-wrap gap-2">

          <div
            className="
              flex items-center gap-2
              px-3 py-2
              rounded-xl
              bg-[#eef1f4]
              text-[10px]
              font-medium
              text-slate-500
            "
          >
            <Sparkles size={14} />
            AI Analysis
          </div>

          <div
            className="
              flex items-center gap-2
              px-3 py-2
              rounded-xl
              bg-[#eef1f4]
              text-[10px]
              font-medium
              text-slate-500
            "
          >
            <Database size={14} />
            Document Search
          </div>

          <div
            className="
              flex items-center gap-2
              px-3 py-2
              rounded-xl
              bg-[#eef1f4]
              text-[10px]
              font-medium
              text-slate-500
            "
          >
            <ShieldCheck size={14} />
            Source Verified
          </div>

        </div>

      </div>

    </div>
  );
};

export default AssistantHeader;