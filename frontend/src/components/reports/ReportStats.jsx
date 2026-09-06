import {
  FileBarChart,
  CheckCircle2,
  Clock3,
  FileText,
} from "lucide-react";

const stats = [
  {
    title: "Total Reports",
    value: "186",
    description: "Reports generated",
    icon: FileBarChart,
  },
  {
    title: "Generated Today",
    value: "12",
    description: "Reports created today",
    icon: CheckCircle2,
  },
  {
    title: "In Progress",
    value: "4",
    description: "Reports being generated",
    icon: Clock3,
  },
  {
    title: "Source Documents",
    value: "1,248",
    description: "Available for reporting",
    icon: FileText,
  },
];

const ReportStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="neu-card p-5"
          >

            {/* Top */}
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h2 className="text-2xl font-bold text-slate-700 mt-2">
                  {stat.value}
                </h2>
              </div>

              <div
                className="
                  w-11 h-11
                  rounded-2xl
                  bg-[#eef1f4]
                  flex items-center justify-center
                  text-slate-500
                  shadow-[4px_4px_8px_rgba(163,177,198,0.25),-4px_-4px_8px_rgba(255,255,255,0.85)]
                "
              >
                <Icon size={20} />
              </div>

            </div>

            {/* Description */}
            <p className="text-xs text-slate-400 mt-4">
              {stat.description}
            </p>

          </div>
        );
      })}

    </div>
  );
};

export default ReportStats;