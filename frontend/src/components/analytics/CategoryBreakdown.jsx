import {
  FileText,
  Mountain,
  Leaf,
  Wrench,
  ShieldCheck,
} from "lucide-react";

const categories = [
  {
    name: "Geological",
    count: 386,
    percentage: 31,
    icon: Mountain,
  },
  {
    name: "Environmental",
    count: 312,
    percentage: 25,
    icon: Leaf,
  },
  {
    name: "Technical",
    count: 274,
    percentage: 22,
    icon: Wrench,
  },
  {
    name: "Safety",
    count: 156,
    percentage: 13,
    icon: ShieldCheck,
  },
  {
    name: "Other",
    count: 120,
    percentage: 9,
    icon: FileText,
  },
];

const CategoryBreakdown = () => {
  return (
    <div className="neu-card p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-700">
          Document Categories
        </h2>

        <p className="text-xs text-slate-400 mt-1">
          Distribution of documents by category
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-5">

        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <div key={category.name}>

              {/* Top Row */}
              <div className="flex items-center justify-between mb-2">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-9 h-9
                      rounded-xl
                      bg-[#eef1f4]
                      flex items-center justify-center
                      text-slate-500
                      shadow-[3px_3px_7px_rgba(163,177,198,0.2),-3px_-3px_7px_rgba(255,255,255,0.8)]
                    "
                  >
                    <Icon size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      {category.name}
                    </p>

                    <p className="text-[10px] text-slate-400">
                      {category.count} documents
                    </p>
                  </div>

                </div>

                <span className="text-xs font-semibold text-slate-500">
                  {category.percentage}%
                </span>

              </div>


              {/* Progress */}
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">

                <div
                  className="h-full rounded-full bg-slate-500 transition-all duration-500"
                  style={{
                    width: `${category.percentage}%`,
                  }}
                />

              </div>

            </div>
          );
        })}

      </div>


      {/* Footer */}
      <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between">

        <div>
          <p className="text-[10px] text-slate-400">
            Total Documents
          </p>

          <p className="text-lg font-semibold text-slate-700 mt-1">
            1,248
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-slate-400">
            Categories
          </p>

          <p className="text-lg font-semibold text-slate-700 mt-1">
            5
          </p>
        </div>

      </div>

    </div>
  );
};

export default CategoryBreakdown;