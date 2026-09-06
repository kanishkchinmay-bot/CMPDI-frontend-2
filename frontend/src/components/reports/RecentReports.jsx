import {
  FileBarChart,
  Download,
  Eye,
  CheckCircle2,
  Clock3,
  LoaderCircle,
} from "lucide-react";

const reports = [
  {
    id: 1,
    name: "Environmental Impact Assessment Summary",
    type: "Environmental",
    date: "02 Sep 2026",
    pages: 24,
    status: "Generated",
  },
  {
    id: 2,
    name: "Block A Geological Survey Report",
    type: "Geological",
    date: "01 Sep 2026",
    pages: 18,
    status: "Generated",
  },
  {
    id: 3,
    name: "Mining Feasibility Analysis",
    type: "Technical",
    date: "31 Aug 2026",
    pages: 31,
    status: "Generating",
  },
  {
    id: 4,
    name: "Document Validation Findings",
    type: "Validation",
    date: "30 Aug 2026",
    pages: 12,
    status: "Generated",
  },
  {
    id: 5,
    name: "Groundwater Assessment Summary",
    type: "Environmental",
    date: "29 Aug 2026",
    pages: 16,
    status: "Review",
  },
];

const statusConfig = {
  Generated: {
    icon: CheckCircle2,
    className: "text-slate-600 bg-[#eef1f4]",
  },

  Generating: {
    icon: LoaderCircle,
    className: "text-slate-500 bg-[#eef1f4]",
  },

  Review: {
    icon: Clock3,
    className: "text-slate-500 bg-[#f4f6f8]",
  },
};

const RecentReports = () => {
  return (
    <div className="neu-card p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
          <h2 className="text-lg font-semibold text-slate-700">
            Recent Reports
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Recently generated and processed reports
          </p>
        </div>

        <span
          className="
            self-start
            px-3 py-2
            rounded-xl
            bg-[#eef1f4]
            text-[11px]
            font-medium
            text-slate-500
          "
        >
          186 Reports
        </span>

      </div>


      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b border-slate-200">

              <th className="text-left py-3 px-3 text-[11px] font-semibold text-slate-400">
                Report
              </th>

              <th className="text-left py-3 px-3 text-[11px] font-semibold text-slate-400">
                Type
              </th>

              <th className="text-left py-3 px-3 text-[11px] font-semibold text-slate-400">
                Generated
              </th>

              <th className="text-left py-3 px-3 text-[11px] font-semibold text-slate-400">
                Pages
              </th>

              <th className="text-left py-3 px-3 text-[11px] font-semibold text-slate-400">
                Status
              </th>

              <th className="text-right py-3 px-3 text-[11px] font-semibold text-slate-400">
                Actions
              </th>

            </tr>
          </thead>


          <tbody>

            {reports.map((report) => {

              const config = statusConfig[report.status];
              const StatusIcon = config.icon;

              return (
                <tr
                  key={report.id}
                  className="
                    border-b
                    border-slate-100
                    last:border-0
                    hover:bg-[#f7f9fc]
                    transition
                  "
                >

                  {/* Report */}
                  <td className="py-4 px-3">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-10 h-10
                          rounded-xl
                          bg-[#eef1f4]
                          flex items-center justify-center
                          text-slate-500
                        "
                      >
                        <FileBarChart size={17} />
                      </div>

                      <div>

                        <p className="text-sm font-medium text-slate-600">
                          {report.name}
                        </p>

                        <p className="text-[10px] text-slate-400 mt-1">
                          AI Generated Report
                        </p>

                      </div>

                    </div>

                  </td>


                  {/* Type */}
                  <td className="py-4 px-3">

                    <span className="text-xs text-slate-500">
                      {report.type}
                    </span>

                  </td>


                  {/* Date */}
                  <td className="py-4 px-3">

                    <span className="text-xs text-slate-400">
                      {report.date}
                    </span>

                  </td>


                  {/* Pages */}
                  <td className="py-4 px-3">

                    <span className="text-xs text-slate-500">
                      {report.pages}
                    </span>

                  </td>


                  {/* Status */}
                  <td className="py-4 px-3">

                    <span
                      className={`
                        inline-flex
                        items-center
                        gap-1.5
                        px-3
                        py-1.5
                        rounded-xl
                        text-[10px]
                        font-medium
                        ${config.className}
                      `}
                    >

                      <StatusIcon
                        size={13}
                        className={
                          report.status === "Generating"
                            ? "animate-spin"
                            : ""
                        }
                      />

                      {report.status}

                    </span>

                  </td>


                  {/* Actions */}
                  <td className="py-4 px-3">

                    <div className="flex justify-end gap-2">

                      <button
                        className="
                          w-9 h-9
                          rounded-xl
                          flex items-center justify-center
                          bg-[#eef1f4]
                          text-slate-400
                          hover:text-slate-600
                          shadow-[2px_2px_5px_rgba(163,177,198,0.18),-2px_-2px_5px_rgba(255,255,255,0.8)]
                          transition
                        "
                        title="View report"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        disabled={report.status === "Generating"}
                        className="
                          w-9 h-9
                          rounded-xl
                          flex items-center justify-center
                          bg-[#eef1f4]
                          text-slate-400
                          hover:text-slate-600
                          disabled:opacity-40
                          disabled:cursor-not-allowed
                          shadow-[2px_2px_5px_rgba(163,177,198,0.18),-2px_-2px_5px_rgba(255,255,255,0.8)]
                          transition
                        "
                        title="Download report"
                      >
                        <Download size={16} />
                      </button>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>


      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">

        {reports.map((report) => {

          const config = statusConfig[report.status];
          const StatusIcon = config.icon;

          return (
            <div
              key={report.id}
              className="
                p-4
                rounded-2xl
                bg-[#eef1f4]
                shadow-[inset_3px_3px_6px_rgba(163,177,198,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]
              "
            >

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
                  <FileBarChart size={17} />
                </div>

                <div className="flex-1 min-w-0">

                  <p className="text-sm font-semibold text-slate-600">
                    {report.name}
                  </p>

                  <p className="text-[10px] text-slate-400 mt-1">
                    {report.type} • {report.date} • {report.pages} pages
                  </p>

                </div>

              </div>


              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">

                <span
                  className={`
                    inline-flex
                    items-center
                    gap-1.5
                    px-3
                    py-1.5
                    rounded-xl
                    text-[10px]
                    font-medium
                    ${config.className}
                  `}
                >

                  <StatusIcon
                    size={12}
                    className={
                      report.status === "Generating"
                        ? "animate-spin"
                        : ""
                    }
                  />

                  {report.status}

                </span>


                <div className="flex gap-2">

                  <button
                    className="
                      w-9 h-9
                      rounded-xl
                      flex items-center justify-center
                      bg-[#f4f6f8]
                      text-slate-400
                    "
                  >
                    <Eye size={15} />
                  </button>

                  <button
                    disabled={report.status === "Generating"}
                    className="
                      w-9 h-9
                      rounded-xl
                      flex items-center justify-center
                      bg-[#f4f6f8]
                      text-slate-400
                      disabled:opacity-40
                    "
                  >
                    <Download size={15} />
                  </button>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default RecentReports;