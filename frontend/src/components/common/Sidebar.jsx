import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  ClipboardCheck,
  Table2,
  Bot,
  FileBarChart,
  X,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Documents", path: "/documents", icon: Upload },
  { name: "Human Review", path: "/validation", icon: ClipboardCheck, badge: true },
  { name: "Validated Data", path: "/validated", icon: Table2 },
  { name: "AI Assistant", path: "/assistant", icon: Bot },
  { name: "Reports", path: "/reports", icon: FileBarChart },
];

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { pendingCount } = useApp();

  const renderContent = (isMobile = false) => (
    <div className="flex flex-col h-full justify-between select-none">
      {/* ── LOGO & HEADER ── */}
      <div>
        <div className="flex items-center justify-between pb-5 mb-4 border-b border-[#D5DEE8]/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#E8EDF5] shadow-[-3px_-3px_8px_rgba(255,255,255,0.9),3px_3px_8px_rgba(163,177,198,0.45)] flex items-center justify-center p-2">
              <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
                <polygon points="14,2 26,24 2,24" fill="#1E293B" />
                <polygon points="14,9 21,21 7,21" fill="#E8EDF5" />
                <circle cx="14" cy="16.5" r="2.5" fill="#10B981" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[16px] tracking-tight text-[#1E293B]">GeoMine Insights</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#D5DEE8] text-[#475569]">v1</span>
              </div>
              <p className="text-[10.5px] font-semibold uppercase tracking-wider text-[#64748B]">
                Document Intelligence
              </p>
            </div>
          </div>
          {isMobile && (
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-xl bg-[#E8EDF5] text-[#475569] shadow-[-2px_-2px_5px_rgba(255,255,255,0.9),2px_2px_5px_rgba(163,177,198,0.4)]"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* ── WORKFLOW LABEL ── */}
        <div className="px-1 mb-2.5 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">Core Workflow</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
        </div>

        {/* ── NAV LINKS (6 core screens only) ── */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                onClick={() => isMobile && setMobileOpen(false)}
                className={({ isActive }) => `
                  group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl
                  transition-all duration-200 text-[13px] font-semibold
                  ${
                    isActive
                      ? "bg-[#E8EDF5] text-[#1E293B] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.85)] font-bold"
                      : "text-[#64748B] hover:text-[#1E293B] hover:shadow-[-3px_-3px_7px_rgba(255,255,255,0.9),3px_3px_7px_rgba(163,177,198,0.35)] hover:bg-[#E8EDF5]"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon size={17} strokeWidth={1.9} />
                  <span>{item.name}</span>
                </div>
                {item.badge && pendingCount > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500 text-white min-w-[20px] text-center">
                    {pendingCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* ── BOTTOM STATUS CARD ── */}
      <div className="pt-4 mt-4 border-t border-[#D5DEE8]/60 space-y-3">
        <div className="p-3 rounded-xl bg-[#E8EDF5] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <div>
              <p className="text-[11px] font-bold text-[#1E293B]">AI Engine</p>
              <p className="text-[10px] text-[#64748B]">GeoExtract v1.0 Core</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-[#10B981] px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
            Online
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[240px] shrink-0 min-h-screen sticky top-0 h-screen bg-[#E8EDF5] p-5 flex-col border-r border-[#D5DEE8]/70 z-30">
        {renderContent(false)}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-900/30 backdrop-blur-xs flex">
          <div className="w-[260px] h-full bg-[#E8EDF5] p-5 flex flex-col shadow-2xl">
            {renderContent(true)}
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Sidebar;