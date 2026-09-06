import {
  ShieldCheck,
  AlertTriangle,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const stats = [
  {
    title: "Total Validated",
    value: "1,183",
    description: "Documents checked",
    icon: ShieldCheck,
  },
  {
    title: "Critical Issues",
    value: "4",
    description: "Require immediate attention",
    icon: AlertTriangle,
  },
  {
    title: "Pending Review",
    value: "11",
    description: "Issues awaiting review",
    icon: Clock3,
  },
  {
    title: "Validation Passed",
    value: "92%",
    description: "Documents with no issues",
    icon: CheckCircle2,
  },
];

const ValidationStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="neu-card p-5"
          >

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

            <p className="text-xs text-slate-400 mt-4">
              {stat.description}
            </p>

          </div>
        );
      })}

    </div>
  );
};

export default ValidationStats;