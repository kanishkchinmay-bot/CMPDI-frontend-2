import {
  FileText,
  ScanText,
  ShieldCheck,
  Bot,
  FileBarChart,
  Clock3,
} from "lucide-react";

const activities = [
  {
    icon: FileText,
    title: "New document uploaded",
    description: "Environmental Impact Assessment Report",
    time: "5 min ago",
  },
  {
    icon: ScanText,
    title: "OCR processing completed",
    description: "Geological Survey - Block A",
    time: "18 min ago",
  },
  {
    icon: ShieldCheck,
    title: "Validation issue detected",
    description: "Mining Feasibility Study",
    time: "32 min ago",
  },
  {
    icon: Bot,
    title: "AI query processed",
    description: "Groundwater assessment analysis",
    time: "48 min ago",
  },
  {
    icon: FileBarChart,
    title: "Report generated",
    description: "Monthly document analytics",
    time: "1 hr ago",
  },
];

const ActivityFeed = () => {
  return (
    <div className="neu-card p-6 h-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h3 className="text-lg font-semibold text-slate-700">
            Recent Activity
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            Latest platform activity
          </p>
        </div>

        <Clock3
          size={19}
          className="text-slate-400"
        />

      </div>

      {/* Activity List */}
      <div className="space-y-5">

        {activities.map((activity, index) => {

          const Icon = activity.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-3"
            >

              {/* Icon */}
              <div className="relative">

                <div
                  className="
                    w-10 h-10
                    rounded-xl
                    bg-[#eef1f4]
                    flex items-center justify-center
                    text-slate-500
                    shadow-[3px_3px_7px_rgba(163,177,198,0.2),-3px_-3px_7px_rgba(255,255,255,0.8)]
                  "
                >
                  <Icon size={17} />
                </div>

                {/* Connector */}
                {index !== activities.length - 1 && (
                  <div
                    className="
                      absolute
                      left-1/2
                      top-10
                      -translate-x-1/2
                      w-px
                      h-5
                      bg-slate-200
                    "
                  />
                )}

              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">

                <div className="flex items-start justify-between gap-3">

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {activity.title}
                    </p>

                    <p className="text-xs text-slate-400 mt-1 truncate">
                      {activity.description}
                    </p>
                  </div>

                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                    {activity.time}
                  </span>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* Footer */}
      <button
        className="
          w-full
          mt-6
          pt-4
          border-t border-slate-200
          text-xs
          font-medium
          text-slate-500
          hover:text-slate-700
          transition
        "
      >
        View all activity
      </button>

    </div>
  );
};

export default ActivityFeed;