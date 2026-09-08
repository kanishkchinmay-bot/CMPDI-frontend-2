import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  Database,
  BarChart3,
  AlertTriangle,
  FileBarChart,
  Bot,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile
}) {
  const navItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: LayoutDashboard
    },
    {
      name: 'Documents',
      path: '/documents',
      icon: FileText
    },
    {
      name: 'Human Review',
      path: '/review',
      icon: CheckSquare,
      badge: '2 Pending',
      badgeColor: 'bg-amber-50 text-ochre-600 border border-amber-200'
    },
    {
      name: 'Validated Records',
      path: '/records',
      icon: Database,
      badge: '48.6k',
      badgeColor: 'bg-green-50 text-success border border-green-200'
    },
    {
      name: 'Analytics',
      path: '/analytics',
      icon: BarChart3
    },
    {
      name: 'Validation Center',
      path: '/validation',
      icon: AlertTriangle,
      badge: '23',
      badgeColor: 'bg-red-50 text-critical border border-red-200'
    },
    {
      name: 'Reports (Form G-1)',
      path: '/reports',
      icon: FileBarChart
    },
    {
      name: 'AI Assistant',
      path: '/assistant',
      icon: Bot,
      badge: 'v3.2',
      badgeColor: 'bg-blue-50 text-brand-700 border border-blue-200'
    }
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-surface-0 select-none">
      {/* Brand Header */}
      <div>
        <div className="h-16 px-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-[6px] bg-brand-900 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-sm">
              <span className="tracking-tighter">CM</span>
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="text-sm font-bold text-ink-900 tracking-tight leading-none truncate">
                  GeoMine Insights
                </div>
                <div className="text-[10px] text-ink-500 font-medium tracking-wide mt-1 truncate">
                  Coal India Ltd. • SIH 2024
                </div>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden sm:flex p-1.5 rounded-[6px] text-ink-500 hover:text-ink-900 hover:bg-surface-2 transition-colors shrink-0"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Section Label */}
        {!isCollapsed && (
          <div className="px-4 pt-4 pb-2 text-[10px] font-mono uppercase tracking-wider text-ink-500 font-semibold">
            Intelligence Modules
          </div>
        )}

        {/* Navigation Items */}
        <nav className="px-2 py-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-[6px] text-xs font-medium transition-all group relative ${
                    isActive
                      ? 'bg-brand-50 text-brand-900 font-semibold shadow-[inset_3px_0_0_0_#1E4FA3]'
                      : 'text-ink-700 hover:bg-surface-1 hover:text-ink-900'
                  } ${isCollapsed ? 'justify-center px-2' : ''}`
                }
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
                {!isCollapsed && (
                  <>
                    <span className="truncate flex-1">{item.name}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded-full ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / System Status */}
      <div className="p-3 border-t border-border bg-surface-0">
        {!isCollapsed ? (
          <div className="p-2.5 rounded-[6px] bg-surface-1 border border-border text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse shrink-0" />
                <span className="font-semibold text-ink-900 text-[11px]">Model v3.2 Active</span>
              </div>
              <span className="font-mono text-[10px] text-ink-500">14.8k Docs</span>
            </div>
            <p className="text-[10px] text-ink-500 mt-1 truncate">
              CMPDI HQ Ranchi • Exploration Cluster
            </p>
          </div>
        ) : (
          <div className="flex justify-center" title="System Online: 14.8k Docs Indexed">
            <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={`hidden sm:block shrink-0 border-r border-border transition-all duration-200 ${
          isCollapsed ? 'w-[68px]' : 'w-[240px]'
        }`}
      >
        {sidebarContent}
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="fixed inset-0 bg-ink-900/40 backdrop-blur-[1px]"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-[260px] bg-surface-0 border-r border-border shadow-xl z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
