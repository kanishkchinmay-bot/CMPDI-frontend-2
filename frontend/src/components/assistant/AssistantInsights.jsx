import {
  Clock3,
  FileText,
  TrendingUp,
  Search,
  ScanText,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

const recentQueries = [
  {
    query: "Environmental findings",
    time: "2 min ago",
  },
  {
    query: "Geological survey summary",
    time: "18 min ago",
  },
  {
    query: "Validation issues in reports",
    time: "42 min ago",
  },
  {
    query: "Low OCR confidence documents",
    time: "1 hour ago",
  },
];

const topics = [
  {
    name: "Environmental Assessment",
    count: 48,
  },
  {
    name: "Geological Surveys",
    count: 41,
  },
  {
    name: "Groundwater Analysis",
    count: 29,
  },
  {
    name: "Mining Operations",
    count: 24,
  },
  {
    name: "Safety Compliance",
    count: 18,
  },
];

const capabilities = [
  {
    title: "Semantic Search",
    description: "Find relevant information across documents.",
    icon: Search,
  },
  {
    title: "Document Summarization",
    description: "Generate concise summaries from reports.",
    icon: FileText,
  },
  {
    title: "OCR Intelligence",
    description: "Understand content from scanned documents.",
    icon: ScanText,
  },
  {
    title: "Validation Analysis",
    description: "Identify inconsistencies and missing information.",
    icon: ShieldCheck,
  },
];

const AssistantInsights = () => {
  return (
    <div className="space-y-6">

      {/* Recent Queries */}
      <div className="neu-card p-6">

        <div className="flex items-center gap-3 mb-5">

          <div
            className="
              w-10 h-10
              rounded-2xl
              bg-[#eef1f4]
              flex items-center justify-center
              text-slate-500
              shadow-[3px_3px_7px_rgba(163,177,198,0.2),-3px_-3px_7px_rgba(255,255,255,0.8)]
            "
          >
            <Clock3 size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-600">
              Recent Queries
            </h2>

            <p className="text-[10px] text-slate-400 mt-1">
              Your recent AI conversations
            </p>
          </div>

        </div>


        <div className="space-y-2">

          {recentQueries.map((item) => (
            <button
              key={item.query}
              className="
                w-full
                text-left
                p-3
                rounded-2xl
                bg-[#eef1f4]
                hover:bg-[#e9edf1]
                shadow-[inset_2px_2px_5px_rgba(163,177,198,0.12),inset_-2px_-2px_5px_rgba(255,255,255,0.75)]
                transition
              "
            >

              <div className="flex items-start gap-3">

                <Search
                  size={14}
                  className="text-slate-400 mt-0.5 shrink-0"
                />

                <div className="min-w-0">

                  <p className="text-xs text-slate-600 truncate">
                    {item.query}
                  </p>

                  <p className="text-[10px] text-slate-400 mt-1">
                    {item.time}
                  </p>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>


      {/* Key Topics */}
      <div className="neu-card p-6">

        <div className="flex items-center gap-3 mb-5">

          <div
            className="
              w-10 h-10
              rounded-2xl
              bg-[#eef1f4]
              flex items-center justify-center
              text-slate-500
              shadow-[3px_3px_7px_rgba(163,177,198,0.2),-3px_-3px_7px_rgba(255,255,255,0.8)]
            "
          >
            <TrendingUp size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-600">
              Key Topics
            </h2>

            <p className="text-[10px] text-slate-400 mt-1">
              Frequently discussed topics
            </p>
          </div>

        </div>


        <div className="space-y-4">

          {topics.map((topic, index) => (
            <div key={topic.name}>

              <div className="flex items-center justify-between mb-2">

                <span className="text-xs text-slate-500">
                  {topic.name}
                </span>

                <span className="text-[10px] font-semibold text-slate-400">
                  {topic.count}
                </span>

              </div>


              <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">

                <div
                  className="h-full rounded-full bg-slate-400"
                  style={{
                    width: `${Math.max(35, 100 - index * 14)}%`,
                  }}
                />

              </div>

            </div>
          ))}

        </div>

      </div>


      {/* AI Capabilities */}
      <div className="neu-card p-6">

        <div className="flex items-center gap-3 mb-5">

          <div
            className="
              w-10 h-10
              rounded-2xl
              bg-[#eef1f4]
              flex items-center justify-center
              text-slate-500
              shadow-[3px_3px_7px_rgba(163,177,198,0.2),-3px_-3px_7px_rgba(255,255,255,0.8)]
            "
          >
            <BarChart3 size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-600">
              AI Capabilities
            </h2>

            <p className="text-[10px] text-slate-400 mt-1">
              Available intelligence features
            </p>
          </div>

        </div>


        <div className="space-y-3">

          {capabilities.map((capability) => {
            const Icon = capability.icon;

            return (
              <div
                key={capability.title}
                className="
                  flex items-start gap-3
                  p-3
                  rounded-2xl
                  bg-[#eef1f4]
                  shadow-[inset_2px_2px_5px_rgba(163,177,198,0.12),inset_-2px_-2px_5px_rgba(255,255,255,0.75)]
                "
              >

                <div
                  className="
                    w-8 h-8
                    shrink-0
                    rounded-xl
                    bg-[#f4f6f8]
                    flex items-center justify-center
                    text-slate-500
                  "
                >
                  <Icon size={15} />
                </div>

                <div>

                  <p className="text-xs font-medium text-slate-600">
                    {capability.title}
                  </p>

                  <p className="text-[10px] text-slate-400 mt-1 leading-4">
                    {capability.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
};

export default AssistantInsights;