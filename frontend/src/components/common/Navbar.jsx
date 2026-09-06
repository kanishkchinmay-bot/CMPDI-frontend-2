import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, Settings, Menu, CheckCircle, AlertTriangle, Info, Sparkles } from "lucide-react";
import { useApp } from "../../context/AppContext";

const Navbar = ({ onOpenMenu, onSearchQuery, onOpenSettings }) => {
  const { pendingCount, validatedCount } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchQuery) onSearchQuery(searchValue);
  };

  const notifications = [
    pendingCount > 0 && {
      id: 1, type: "warning",
      title: `${pendingCount} records pending review`,
      desc: "Human verification required before these records can be used.",
      time: "Now"
    },
    validatedCount > 0 && {
      id: 2, type: "success",
      title: `${validatedCount} records validated`,
      desc: "These records are available for AI assistant and report generation.",
      time: "Today"
    },
    {
      id: 3, type: "info",
      title: "AI Engine is online",
      desc: "GeoExtract v2.1 is ready to process uploaded documents.",
      time: "System"
    },
  ].filter(Boolean);

  return (
    <header className="px-5 lg:px-8 pt-5 pb-3 sticky top-0 z-20 bg-[#E8EDF5]/90 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button onClick={onOpenMenu}
            className="lg:hidden p-2 rounded-xl bg-[#E8EDF5] text-[#475569] shadow-[-3px_-3px_7px_rgba(255,255,255,0.9),3px_3px_7px_rgba(163,177,198,0.4)] cursor-pointer">
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#1E293B] tracking-tight flex items-center gap-2">
              Geological Intelligence
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-[#10B981] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                Live
              </span>
            </h1>
            <p className="text-[11px] text-[#64748B] hidden md:block">
              CMPDI · Document Upload → Extract → Review → Report
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="neu-inset hidden sm:flex items-center gap-2.5 px-3.5 py-2 w-52 md:w-72">
            <Search size={16} className="text-[#64748B] shrink-0" />
            <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search records, documents..."
              className="w-full bg-transparent outline-none border-none text-xs text-[#1E293B] placeholder-[#64748B] font-medium" />
          </form>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button onClick={() => setShowNotifications(!showNotifications)}
              className={`relative w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer
                ${showNotifications
                  ? "bg-[#E8EDF5] text-[#1E293B] shadow-[inset_2px_2px_5px_rgba(163,177,198,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.9)]"
                  : "bg-[#E8EDF5] text-[#475569] shadow-[-3px_-3px_8px_rgba(255,255,255,0.9),3px_3px_8px_rgba(163,177,198,0.4)]"
                }`}>
              <Bell size={17} />
              {pendingCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-[#E8EDF5]" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-[#E8EDF5] shadow-[-8px_-8px_20px_rgba(255,255,255,0.95),8px_8px_20px_rgba(163,177,198,0.5)] p-4 border border-[#D5DEE8]/60 z-50">
                <p className="text-xs font-bold text-[#1E293B] mb-3">System Notifications</p>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 rounded-xl bg-[#E8EDF5] shadow-[-2px_-2px_6px_rgba(255,255,255,0.9),2px_2px_6px_rgba(163,177,198,0.3)]">
                      <div className="flex items-start gap-2">
                        {n.type === "success" && <CheckCircle size={14} className="text-[#10B981] mt-0.5 shrink-0" />}
                        {n.type === "warning" && <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />}
                        {n.type === "info" && <Info size={14} className="text-[#475569] mt-0.5 shrink-0" />}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="text-xs font-bold text-[#1E293B]">{n.title}</p>
                            <span className="text-[10px] text-[#64748B]">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">{n.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button onClick={onOpenSettings}
            className="w-10 h-10 rounded-2xl bg-[#E8EDF5] text-[#475569] shadow-[-3px_-3px_8px_rgba(255,255,255,0.9),3px_3px_8px_rgba(163,177,198,0.4)] flex items-center justify-center transition-all cursor-pointer">
            <Settings size={17} />
          </button>

          {/* Avatar */}
          <div className="flex items-center gap-2.5 pl-1">
            <div className="w-10 h-10 rounded-full bg-[#E8EDF5] shadow-[-3px_-3px_8px_rgba(255,255,255,0.9),3px_3px_8px_rgba(163,177,198,0.45)] border border-[#D5DEE8] flex items-center justify-center font-bold text-xs text-[#1E293B]">
              <div className="w-full h-full bg-gradient-to-br from-[#D5DEE8] to-[#CBD5E1] flex items-center justify-center text-[#1E293B] font-bold text-xs tracking-tight rounded-full">
                DR
              </div>
            </div>
            <div className="hidden xl:block">
              <p className="text-xs font-bold text-[#1E293B] leading-tight">Dr. R. Sharma</p>
              <p className="text-[10px] font-semibold text-[#64748B]">Chief Geologist</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;