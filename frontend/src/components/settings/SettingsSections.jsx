import {
  UserRound,
  Cpu,
  ScanText,
  ShieldCheck,
  Bell,
  Database,
} from "lucide-react";

const settings = [
  {
    title: "Profile & Workspace",
    description: "Manage your account and GeoMine Insights workspace preferences.",
    icon: UserRound,
    status: "Configured",
  },
  {
    title: "AI Engine",
    description: "Configure AI analysis and document intelligence preferences.",
    icon: Cpu,
    status: "Active",
  },
  {
    title: "OCR Engine",
    description: "Manage OCR processing and extraction preferences.",
    icon: ScanText,
    status: "Active",
  },
  {
    title: "Validation Rules",
    description: "Configure document validation and quality checks.",
    icon: ShieldCheck,
    status: "Configured",
  },
  {
    title: "Notifications",
    description: "Manage alerts, validation notifications and system updates.",
    icon: Bell,
    status: "Enabled",
  },
  {
    title: "Data & Storage",
    description: "Manage document storage and repository preferences.",
    icon: Database,
    status: "Connected",
  },
];

const SettingsSections = () => {
  return (
    <div className="neu-card p-6">

      {/* Header */}
      <div className="mb-6">

        <h2 className="text-lg font-semibold text-slate-700">
          Platform Settings
        </h2>

        <p className="text-xs text-slate-400 mt-1">
          Configure your document intelligence platform
        </p>

      </div>


      {/* Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {settings.map((setting) => {
          const Icon = setting.icon;

          return (
            <button
              key={setting.title}
              className="
                group
                w-full
                text-left
                p-5
                rounded-3xl
                bg-[#eef1f4]
                shadow-[inset_3px_3px_6px_rgba(163,177,198,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]
                hover:shadow-[4px_4px_8px_rgba(163,177,198,0.2),-4px_-4px_8px_rgba(255,255,255,0.8)]
                transition-all
                duration-200
              "
            >

              <div className="flex items-start gap-4">

                {/* Icon */}
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
                  <Icon size={19} />
                </div>


                {/* Content */}
                <div className="flex-1 min-w-0">

                  <div className="flex items-center justify-between gap-3">

                    <h3 className="text-sm font-semibold text-slate-600">
                      {setting.title}
                    </h3>

                    <span
                      className="
                        shrink-0
                        px-2.5 py-1
                        rounded-lg
                        bg-[#f4f6f8]
                        text-[9px]
                        font-medium
                        text-slate-400
                      "
                    >
                      {setting.status}
                    </span>

                  </div>

                  <p className="text-xs text-slate-400 mt-2 leading-5">
                    {setting.description}
                  </p>

                </div>

              </div>

            </button>
          );
        })}

      </div>

    </div>
  );
};

export default SettingsSections;