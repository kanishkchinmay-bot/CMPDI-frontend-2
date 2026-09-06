import {
  FileText,
  Mountain,
  Leaf,
  Wrench,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const templates = [
  {
    title: "Geological Report",
    description:
      "Generate a structured report from geological surveys, reserve data and exploration documents.",
    icon: Mountain,
    documents: "386 source documents",
  },
  {
    title: "Environmental Report",
    description:
      "Summarize environmental assessments, groundwater, air quality and monitoring information.",
    icon: Leaf,
    documents: "312 source documents",
  },
  {
    title: "Technical Report",
    description:
      "Create technical summaries from feasibility studies, mining plans and operational documents.",
    icon: Wrench,
    documents: "274 source documents",
  },
  {
    title: "Validation Report",
    description:
      "Generate a report containing detected issues, inconsistencies and validation findings.",
    icon: ShieldCheck,
    documents: "15 active issues",
  },
];

const ReportTemplates = () => {
  return (
    <div className="neu-card p-6">

      {/* Header */}
      <div className="mb-6">

        <h2 className="text-lg font-semibold text-slate-700">
          Report Templates
        </h2>

        <p className="text-xs text-slate-400 mt-1">
          Select a template to generate a structured report
        </p>

      </div>


      {/* Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {templates.map((template) => {
          const Icon = template.icon;

          return (
            <div
              key={template.title}
              className="
                group
                p-5
                rounded-3xl
                bg-[#eef1f4]
                shadow-[inset_3px_3px_6px_rgba(163,177,198,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]
                hover:shadow-[4px_4px_8px_rgba(163,177,198,0.2),-4px_-4px_8px_rgba(255,255,255,0.8)]
                transition-all
                duration-200
              "
            >

              {/* Top */}
              <div className="flex items-start justify-between gap-4">

                <div
                  className="
                    w-11 h-11
                    shrink-0
                    rounded-2xl
                    bg-[#f4f6f8]
                    flex items-center justify-center
                    text-slate-500
                    shadow-[3px_3px_7px_rgba(163,177,198,0.2),-3px_-3px_7px_rgba(255,255,255,0.8)]
                  "
                >
                  <Icon size={20} />
                </div>

                <span className="text-[10px] text-slate-400">
                  {template.documents}
                </span>

              </div>


              {/* Content */}
              <div className="mt-5">

                <h3 className="text-sm font-semibold text-slate-700">
                  {template.title}
                </h3>

                <p className="text-xs text-slate-400 mt-2 leading-5">
                  {template.description}
                </p>

              </div>


              {/* Action */}
              <button
                className="
                  mt-5
                  w-full
                  flex items-center justify-between
                  px-4 py-3
                  rounded-2xl
                  bg-[#f4f6f8]
                  text-xs
                  font-medium
                  text-slate-500
                  shadow-[3px_3px_7px_rgba(163,177,198,0.18),-3px_-3px_7px_rgba(255,255,255,0.8)]
                  hover:text-slate-700
                  transition
                "
              >

                <span>
                  Generate Report
                </span>

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />

              </button>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default ReportTemplates;