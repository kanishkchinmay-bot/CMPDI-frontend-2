import {
  FileText,
  MoreHorizontal,
  Eye,
  Clock3,
} from "lucide-react";

const documents = [
  {
    name: "Environmental Impact Assessment Report",
    type: "Environmental",
    date: "02 Sep 2026",
    status: "Processed",
    confidence: "98.6%",
  },
  {
    name: "Geological Survey - Block A",
    type: "Geological",
    date: "01 Sep 2026",
    status: "Processed",
    confidence: "97.2%",
  },
  {
    name: "Mining Feasibility Study",
    type: "Technical",
    date: "31 Aug 2026",
    status: "Validation",
    confidence: "91.8%",
  },
  {
    name: "Groundwater Assessment Report",
    type: "Environmental",
    date: "30 Aug 2026",
    status: "Processed",
    confidence: "96.4%",
  },
  {
    name: "Coal Reserve Estimation Report",
    type: "Geological",
    date: "29 Aug 2026",
    status: "Review",
    confidence: "89.7%",
  },
];

const statusStyles = {
  Processed: "text-slate-600 bg-slate-100",
  Validation: "text-slate-500 bg-slate-200",
  Review: "text-slate-500 bg-slate-100",
};

const RecentDocuments = () => {
  return (
    <div className="neu-card p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h3 className="text-lg font-semibold text-slate-700">
            Recent Documents
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            Latest documents processed by the intelligence platform
          </p>
        </div>

        <button
          className="
            px-4 py-2
            rounded-xl
            text-xs
            font-medium
            text-slate-500
            bg-[#eef1f4]
            shadow-[3px_3px_7px_rgba(163,177,198,0.25),-3px_-3px_7px_rgba(255,255,255,0.8)]
            hover:shadow-[inset_3px_3px_6px_rgba(163,177,198,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]
            transition-all
          "
        >
          View All
        </button>

      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b border-slate-200">

              <th className="text-left pb-4 text-xs font-medium text-slate-400">
                Document
              </th>

              <th className="text-left pb-4 text-xs font-medium text-slate-400">
                Category
              </th>

              <th className="text-left pb-4 text-xs font-medium text-slate-400">
                Date
              </th>

              <th className="text-left pb-4 text-xs font-medium text-slate-400">
                Confidence
              </th>

              <th className="text-left pb-4 text-xs font-medium text-slate-400">
                Status
              </th>

              <th className="pb-4"></th>

            </tr>
          </thead>

          <tbody>

            {documents.map((document, index) => (

              <tr
                key={index}
                className="
                  border-b border-slate-100
                  last:border-0
                  hover:bg-white/40
                  transition
                "
              >

                {/* Document */}
                <td className="py-4">

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-10 h-10
                        rounded-xl
                        bg-[#eef1f4]
                        flex items-center justify-center
                        text-slate-500
                        shadow-[2px_2px_5px_rgba(163,177,198,0.2),-2px_-2px_5px_rgba(255,255,255,0.8)]
                      "
                    >
                      <FileText size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-700 max-w-[260px] truncate">
                        {document.name}
                      </p>

                      <p className="text-xs text-slate-400 mt-0.5">
                        PDF Document
                      </p>
                    </div>

                  </div>

                </td>

                {/* Category */}
                <td className="py-4">
                  <span className="text-xs text-slate-500">
                    {document.type}
                  </span>
                </td>

                {/* Date */}
                <td className="py-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock3 size={14} />
                    {document.date}
                  </div>
                </td>

                {/* Confidence */}
                <td className="py-4">

                  <div className="flex items-center gap-3">

                    <div className="w-20 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-slate-500"
                        style={{
                          width: document.confidence,
                        }}
                      />
                    </div>

                    <span className="text-xs font-medium text-slate-500">
                      {document.confidence}
                    </span>

                  </div>

                </td>

                {/* Status */}
                <td className="py-4">

                  <span
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium ${
                      statusStyles[document.status]
                    }`}
                  >
                    {document.status}
                  </span>

                </td>

                {/* Action */}
                <td className="py-4 text-right">

                  <button
                    className="
                      w-9 h-9
                      rounded-xl
                      flex items-center justify-center
                      text-slate-400
                      hover:text-slate-600
                      hover:bg-white
                      transition
                    "
                  >
                    <MoreHorizontal size={18} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">

        {documents.map((document, index) => (

          <div
            key={index}
            className="
              p-4
              rounded-2xl
              bg-[#eef1f4]
              shadow-[3px_3px_7px_rgba(163,177,198,0.2),-3px_-3px_7px_rgba(255,255,255,0.8)]
            "
          >

            <div className="flex items-start justify-between gap-3">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-[#f4f6f8] flex items-center justify-center text-slate-500">
                  <FileText size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    {document.name}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    {document.type}
                  </p>
                </div>

              </div>

              <Eye size={17} className="text-slate-400 shrink-0" />

            </div>

            <div className="flex items-center justify-between mt-4">

              <span
                className={`px-3 py-1.5 rounded-lg text-[11px] font-medium ${
                  statusStyles[document.status]
                }`}
              >
                {document.status}
              </span>

              <span className="text-xs text-slate-500">
                {document.confidence} confidence
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentDocuments;