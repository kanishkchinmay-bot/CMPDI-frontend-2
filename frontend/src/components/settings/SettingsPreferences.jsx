import { useState } from "react";
import {
  Bell,
  ScanText,
  Sparkles,
  ShieldCheck,
  Mail,
  Save,
} from "lucide-react";

const SettingsPreferences = () => {
  const [preferences, setPreferences] = useState({
    notifications: true,
    autoOCR: true,
    aiSuggestions: true,
    validationAlerts: true,
    emailUpdates: false,
  });

  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const preferenceItems = [
    {
      key: "notifications",
      title: "System Notifications",
      description: "Receive notifications about document processing and system activity.",
      icon: Bell,
    },
    {
      key: "autoOCR",
      title: "Automatic OCR Processing",
      description: "Automatically run OCR when a new document is uploaded.",
      icon: ScanText,
    },
    {
      key: "aiSuggestions",
      title: "AI Suggestions",
      description: "Show AI-generated insights and recommendations across the platform.",
      icon: Sparkles,
    },
    {
      key: "validationAlerts",
      title: "Validation Alerts",
      description: "Notify when critical document inconsistencies or quality issues are detected.",
      icon: ShieldCheck,
    },
    {
      key: "emailUpdates",
      title: "Email Updates",
      description: "Receive important platform and processing updates through email.",
      icon: Mail,
    },
  ];

  return (
    <div className="neu-card p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-700">
          Preferences
        </h2>

        <p className="text-xs text-slate-400 mt-1">
          Control how the platform processes and notifies you
        </p>
      </div>


      {/* Preferences */}
      <div className="space-y-3">

        {preferenceItems.map((item) => {
          const Icon = item.icon;
          const enabled = preferences[item.key];

          return (
            <div
              key={item.key}
              className="
                flex items-center gap-4
                p-4
                rounded-2xl
                bg-[#eef1f4]
                shadow-[inset_3px_3px_6px_rgba(163,177,198,0.12),inset_-3px_-3px_6px_rgba(255,255,255,0.75)]
              "
            >

              {/* Icon */}
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
                <Icon size={17} />
              </div>


              {/* Content */}
              <div className="flex-1 min-w-0">

                <p className="text-sm font-medium text-slate-600">
                  {item.title}
                </p>

                <p className="text-[10px] text-slate-400 mt-1 leading-4">
                  {item.description}
                </p>

              </div>


              {/* Toggle */}
              <button
                onClick={() => togglePreference(item.key)}
                aria-label={`Toggle ${item.title}`}
                className={`
                  relative
                  w-12 h-6
                  shrink-0
                  rounded-full
                  transition-all
                  duration-200
                  ${
                    enabled
                      ? "bg-[#dce2e7] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.18),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]"
                      : "bg-[#e6eaee] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.25),inset_-3px_-3px_6px_rgba(255,255,255,0.7)]"
                  }
                `}
              >

                <span
                  className={`
                    absolute
                    top-1
                    w-4 h-4
                    rounded-full
                    bg-[#f7f9fc]
                    shadow-[2px_2px_4px_rgba(163,177,198,0.25),-2px_-2px_4px_rgba(255,255,255,0.9)]
                    transition-all
                    duration-200
                    ${
                      enabled
                        ? "left-7"
                        : "left-1"
                    }
                  `}
                />

              </button>

            </div>
          );
        })}

      </div>


      {/* Save */}
      <div className="flex justify-end mt-6">

        <button
          className="
            flex items-center gap-2
            px-5 py-3
            rounded-2xl
            bg-[#eef1f4]
            text-sm
            font-medium
            text-slate-600
            shadow-[4px_4px_8px_rgba(163,177,198,0.22),-4px_-4px_8px_rgba(255,255,255,0.85)]
            hover:shadow-[inset_3px_3px_6px_rgba(163,177,198,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]
            transition-all
            duration-200
          "
        >
          <Save size={16} />
          Save Preferences
        </button>

      </div>

    </div>
  );
};

export default SettingsPreferences;