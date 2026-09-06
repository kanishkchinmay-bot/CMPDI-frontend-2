import {
  AlertTriangle,
  AlertCircle,
  Clock3,
  FileText,
  ChevronRight,
} from "lucide-react";

const issues = [
  {
    id: 1,
    document: "Mining Feasibility Study",
    issue: "Missing groundwater analysis section",
    type: "Critical",
    confidence: "96.2%",
    time: "10 min ago",
  },
  {
    id: 2,
    document: "Coal Reserve Estimation Report",
    issue: "Inconsistent reserve values detected",
    type: "Critical",
    confidence: "93.8%",
    time: "32 min ago",
  },
  {
    id: 3,
    document: "Environmental Impact Assessment",
    issue: "Location details differ across sections",
    type: "Medium",
    confidence: "89.4%",
    time: "1 hour ago",
  },
  {
    id: 4,
    document: "Geological Survey - Block A",
    issue: "Low OCR confidence on page 27",
    type: "Medium",
    confidence: "87.6%",
    time: "2 hours ago",
  },
  {
    id: 5,
    document: "Mine Safety Assessment",
    issue: "Safety compliance reference not found",
    type: "Medium",
    confidence: "91.3%",
    time: "3 hours ago",
  },
  {
    id: 6,
    document: "Groundwater Assessment Report",
    issue: "Incomplete monitoring data",
    type: "Review",
    confidence: "84.9%",
    time: "5 hours ago",
  },
];

const typeConfig = {
  Critical: {
    icon: AlertTriangle,
    badge:
      "bg-[#e9edf1] text-slate-700 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.15),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]",
  },

  Medium: {
    icon: AlertCircle,
    badge:
      "bg-[#eef1f4] text-slate-600 shadow-[inset_2px_2px_4px_rgba(163,177,198,0.12),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]",
  },

  Review: {
    icon: Clock3,
    badge:
      "bg-[#f4f6f8] text-slate-500 border border-slate-200",
  },
};

const ValidationIssues = () => {
  return (
    <div className="neu-card p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
          <h2 className="text-lg font-semibold text-slate-700">
            Validation Issues
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            AI-detected inconsistencies and missing information
          </p>
        </div>

        <div
          className="
            px-4 py-2
            rounded-xl
            bg-[#eef1f4]
            text-xs
            font-medium
            text-slate-500
            shadow-[3px_3px_7px_rgba(163,177,198,0.2),-3px_-3px_7px_rgba(255,255,255,0.8)]
          "
        >
          15 Issues
        </div>

      </div>


      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b border-slate-200">

              <th className="text-left py-3 px-3 text-[11px] font-semibold text-slate-400">
                Document
              </th>

              <th className="text-left py-3 px-3 text-[11px] font-semibold text-slate-400">
                Detected Issue
              </th>

              <th className="text-left py-3 px-3 text-[11px] font-semibold text-slate-400">
                Severity
              </th>

              <th className="text-left py-3 px-3 text-[11px] font-semibold text-slate-400">
                Confidence
              </th>

              <th className="text-left py-3 px-3 text-[11px] font-semibold text-slate-400">
                Detected
              </th>

              <th className="py-3 px-3"></th>

            </tr>
          </thead>

          <tbody>

            {issues.map((item) => {

              const config = typeConfig[item.type];
              const Icon = config.icon;

              return (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-[#f7f9fc] transition"
                >

                  {/* Document */}
                  <td className="py-4 px-3">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-9 h-9
                          rounded-xl
                          bg-[#eef1f4]
                          flex items-center justify-center
                          text-slate-500
                        "
                      >
                        <FileText size={16} />
                      </div>

                      <span className="text-sm font-medium text-slate-600">
                        {item.document}
                      </span>

                    </div>

                  </td>


                  {/* Issue */}
                  <td className="py-4 px-3">

                    <p className="text-sm text-slate-500 max-w-xs">
                      {item.issue}
                    </p>

                  </td>


                  {/* Severity */}
                  <td className="py-4 px-3">

                    <span
                      className={`
                        inline-flex items-center gap-1.5
                        px-3 py-1.5
                        rounded-xl
                        text-[11px]
                        font-medium
                        ${config.badge}
                      `}
                    >
                      <Icon size={13} />
                      {item.type}
                    </span>

                  </td>


                  {/* Confidence */}
                  <td className="py-4 px-3">

                    <span className="text-xs font-semibold text-slate-600">
                      {item.confidence}
                    </span>

                  </td>


                  {/* Time */}
                  <td className="py-4 px-3">

                    <span className="text-xs text-slate-400">
                      {item.time}
                    </span>

                  </td>


                  {/* Action */}
                  <td className="py-4 px-3">

                    <button
                      className="
                        w-8 h-8
                        rounded-lg
                        flex items-center justify-center
                        text-slate-400
                        hover:text-slate-600
                        hover:bg-[#eef1f4]
                        transition
                      "
                      title="Review issue"
                    >
                      <ChevronRight size={17} />
                    </button>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>


      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">

        {issues.map((item) => {

          const config = typeConfig[item.type];
          const Icon = config.icon;

          return (
            <div
              key={item.id}
              className="
                p-4
                rounded-2xl
                bg-[#eef1f4]
                shadow-[inset_3px_3px_6px_rgba(163,177,198,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]
              "
            >

              {/* Document */}
              <div className="flex items-start gap-3">

                <div
                  className="
                    w-10 h-10
                    shrink-0
                    rounded-xl
                    bg-[#f4f6f8]
                    flex items-center justify-center
                    text-slate-500
                  "
                >
                  <FileText size={17} />
                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-sm font-semibold text-slate-600">
                    {item.document}
                  </p>

                  <p className="text-xs text-slate-400 mt-1 leading-5">
                    {item.issue}
                  </p>

                </div>

              </div>


              {/* Bottom Info */}
              <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-200">

                <span
                  className={`
                    inline-flex items-center gap-1.5
                    px-3 py-1.5
                    rounded-xl
                    text-[10px]
                    font-medium
                    ${config.badge}
                  `}
                >
                  <Icon size={12} />
                  {item.type}
                </span>

                <div className="text-right">

                  <p className="text-[10px] text-slate-400">
                    Confidence
                  </p>

                  <p className="text-xs font-semibold text-slate-600">
                    {item.confidence}
                  </p>

                </div>

                <button
                  className="
                    w-8 h-8
                    rounded-lg
                    flex items-center justify-center
                    text-slate-400
                    bg-[#f4f6f8]
                  "
                >
                  <ChevronRight size={16} />
                </button>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default ValidationIssues;