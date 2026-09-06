import {
  ScanText,
  Bot,
  ShieldCheck,
  Clock3,
} from "lucide-react";

const metrics = [
  {
    title: "OCR Accuracy",
    value: "98.4%",
    description: "Average extraction accuracy",
    icon: ScanText,
    progress: 98.4,
  },
  {
    title: "AI Query Success",
    value: "96.8%",
    description: "Queries successfully resolved",
    icon: Bot,
    progress: 96.8,
  },
  {
    title: "Validation Accuracy",
    value: "94.2%",
    description: "Issues correctly identified",
    icon: ShieldCheck,
    progress: 94.2,
  },
  {
    title: "Avg. Processing Time",
    value: "42 sec",
    description: "Average document processing",
    icon: Clock3,
    progress: 84,
  },
];

const PerformanceOverview = () => {
  return (
    <div className="neu-card p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-700">
          System Performance
        </h2>

        <p className="text-xs text-slate-400 mt-1">
          Overview of AI and document processing performance
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.title}
              className="
                p-4
                rounded-2xl
                bg-[#eef1f4]
                shadow-[inset_3px_3px_6px_rgba(163,177,198,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]
              "
            >

              {/* Top */}
              <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10 h-10
                      rounded-xl
                      bg-[#f4f6f8]
                      flex items-center justify-center
                      text-slate-500
                      shadow-[3px_3px_7px_rgba(163,177,198,0.2),-3px_-3px_7px_rgba(255,255,255,0.8)]
                    "
                  >
                    <Icon size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      {metric.title}
                    </p>

                    <p className="text-[10px] text-slate-400 mt-1">
                      {metric.description}
                    </p>
                  </div>

                </div>

                <span className="text-lg font-bold text-slate-700">
                  {metric.value}
                </span>

              </div>


              {/* Progress */}
              <div className="mt-4">

                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-slate-500 transition-all duration-500"
                    style={{
                      width: `${metric.progress}%`,
                    }}
                  />

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default PerformanceOverview;