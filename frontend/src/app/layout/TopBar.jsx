import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Search,
  Bell,
  Menu,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ChevronDown,
  User,
  Sliders,
  CheckSquare,
  Database
} from 'lucide-react';
import Badge from '../../components/ui/Badge';
import { mockActivityTimeline } from '../../lib/api/mockApi';

export default function TopBar({
  onOpenCommandPalette,
  onToggleMobileSidebar
}) {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageInfo = (pathname) => {
    switch (pathname) {
      case '/':
        return { title: 'Intelligence Dashboard', section: 'Overview & Production Metrics' };
      case '/documents':
        return { title: 'Document Repository', section: 'Multi-strata OCR Ingestion' };
      case '/review':
        return { title: 'Human Review & Verification', section: 'Two-Panel Document Inspection' };
      case '/records':
        return { title: 'Validated Records Repository', section: 'Production & Geological Reserves' };
      case '/analytics':
        return { title: 'Mining & Geological Analytics', section: 'Trends & Subsidiary Comparison' };
      case '/validation':
        return { title: 'Validation Center', section: 'Audit Queue & Discrepancy SLA' };
      case '/reports':
        return { title: 'Reports & Form G-1 Generator', section: 'Official Publication Rail' };
      case '/assistant':
        return { title: 'AI Decision Assistant', section: 'Evidence-Grounded QA' };
      default:
        return { title: 'GeoMine Insights', section: 'System' };
    }
  };

  const pageInfo = getPageInfo(location.pathname);

  return (
    <header className="h-16 bg-surface-0 border-b border-border px-4 sm:px-6 flex items-center justify-between shrink-0 select-none z-20">
      {/* Left: Mobile hamburger + Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="sm:hidden p-2 rounded-[6px] text-ink-700 hover:bg-surface-2 hover:text-ink-900"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-semibold text-ink-900 tracking-tight truncate">
              {pageInfo.title}
            </h1>
            <span className="hidden md:inline-flex items-center px-2 py-0.5 text-[11px] font-mono font-medium text-ink-500 bg-surface-1 border border-border rounded-full">
              SIH-CMPDI-2024
            </span>
          </div>
          <p className="text-xs text-ink-500 hidden sm:block truncate">
            {pageInfo.section}
          </p>
        </div>
      </div>

      {/* Right: Search bar trigger, Notification bell, System status, Profile */}
      <div className="flex items-center gap-3">
        {/* Global Search Button / Trigger */}
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="flex items-center gap-3 px-3 py-1.5 bg-surface-1 hover:bg-surface-2 border border-border text-ink-500 hover:text-ink-900 text-xs rounded-[6px] transition-colors w-40 sm:w-64 justify-between"
        >
          <span className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 text-ink-500" />
            <span className="truncate">Search or jump to...</span>
          </span>
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium text-ink-500 bg-surface-0 border border-border rounded-[4px]">
            ⌘K
          </kbd>
        </button>

        {/* System Status Pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-green-50/70 border border-green-200/80 rounded-full text-xs text-success font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shrink-0" />
          <span className="font-mono text-[11px]">OCR Engine 98.4%</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-ink-500 hover:text-ink-900 hover:bg-surface-1 rounded-[6px] transition-colors"
            title="System Activity & Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-critical" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-0 border border-border rounded-[10px] shadow-lg py-2 z-30">
              <div className="px-4 py-2 border-b border-border flex items-center justify-between">
                <span className="text-xs font-semibold text-ink-900">Recent Platform Alerts</span>
                <Badge variant="critical" size="sm">4 Critical</Badge>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-border">
                {mockActivityTimeline.map((item) => (
                  <div key={item.id} className="p-3 hover:bg-surface-1 transition-colors">
                    <div className="flex items-center justify-between text-[11px] text-ink-500">
                      <span className="font-mono">{item.docId}</span>
                      <span>{item.time}</span>
                    </div>
                    <div className="text-xs font-medium text-ink-900 mt-1">{item.title}</div>
                    <div className="text-[11px] text-ink-500 mt-0.5 leading-relaxed">{item.description}</div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-border text-center">
                <a href="/validation" className="text-xs text-brand-700 font-medium hover:underline">
                  View all validation tickets →
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="relative border-l border-border pl-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-700 text-white flex items-center justify-center text-xs font-semibold font-mono shrink-0">
            RS
          </div>
          <div className="hidden xl:block text-left min-w-0">
            <div className="text-xs font-semibold text-ink-900 truncate">Dr. R. K. Sharma</div>
            <div className="text-[10px] text-ink-500 font-medium truncate">Chief Geologist, CMPDI</div>
          </div>
        </div>
      </div>
    </header>
  );
}
