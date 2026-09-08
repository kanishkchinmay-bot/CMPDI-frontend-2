import {
  Settings as SettingsIcon,
  ShieldCheck,
  Database,
  Activity,
} from "lucide-react";

import SettingsSections from "../../components/settings/SettingsSections";
import SettingsPreferences from "../../components/settings/SettingsPreferences";

const Settings = () => {
  return (
    <div className="space-y-7">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>
          <p className="text-sm text-slate-400 mb-1">
            Platform Configuration
          </p>

          <h1 className="text-3xl font-bold text-slate-700">
            Settings
          </h1>

          <p className="text-sm text-slate-400 mt-2">
            Manage your GeoMine Insights platform preferences and system configuration.
          </p>
        </div>


        {/* System Status */}
        <div
          className="
            self-start
            flex items-center gap-3
            px-4 py-3
            rounded-2xl
            bg-[#eef1f4]
            text-slate-500
            shadow-[4px_4px_8px_rgba(163,177,198,0.25),-4px_-4px_8px_rgba(255,255,255,0.85)]
          "
        >

          <span className="w-2 h-2 rounded-full bg-emerald-500" />

          <Activity size={16} />

          <span className="text-xs font-medium">
            All Systems Operational
          </span>

        </div>

      </div>


      {/* System Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        {/* AI Engine */}
        <div className="neu-card p-5">

          <div className="flex items-center gap-3">

            <div
              className="
                w-10 h-10
                rounded-2xl
                bg-[#eef1f4]
                flex items-center justify-center
                text-slate-500
              "
            >
              <Activity size={18} />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                AI Engine
              </p>

              <p className="text-sm font-semibold text-slate-600 mt-1">
                Running
              </p>
            </div>

          </div>

        </div>


        {/* Database */}
        <div className="neu-card p-5">

          <div className="flex items-center gap-3">

            <div
              className="
                w-10 h-10
                rounded-2xl
                bg-[#eef1f4]
                flex items-center justify-center
                text-slate-500
              "
            >
              <Database size={18} />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Document Database
              </p>

              <p className="text-sm font-semibold text-slate-600 mt-1">
                Connected
              </p>
            </div>

          </div>

        </div>


        {/* Security */}
        <div className="neu-card p-5">

          <div className="flex items-center gap-3">

            <div
              className="
                w-10 h-10
                rounded-2xl
                bg-[#eef1f4]
                flex items-center justify-center
                text-slate-500
              "
            >
              <ShieldCheck size={18} />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Platform Security
              </p>

              <p className="text-sm font-semibold text-slate-600 mt-1">
                Protected
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* Settings Sections */}
      <SettingsSections />


      {/* Preferences */}
      <SettingsPreferences />


      {/* Footer Information */}
      <div className="neu-card p-5">

        <div className="flex items-center gap-4">

          <div
            className="
              w-11 h-11
              shrink-0
              rounded-2xl
              bg-[#eef1f4]
              flex items-center justify-center
              text-slate-500
            "
          >
            <SettingsIcon size={19} />
          </div>

          <div className="flex-1">

            <p className="text-sm font-semibold text-slate-600">
              GeoMine Insights Platform
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Platform configuration and AI processing preferences.
            </p>

          </div>

          <span className="text-[10px] text-slate-400">
            v1.0.0
          </span>

        </div>

      </div>

    </div>
  );
};

export default Settings;