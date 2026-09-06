import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  FileText,
  AlertTriangle,
  FileBarChart,
  Bot,
  LayoutDashboard,
  BarChart3,
  Upload,
  ArrowRight,
  X,
  CheckSquare,
  Database
} from 'lucide-react';
import { mockDocuments, mockValidationIssues, mockReportTemplates, mockValidatedRecords } from '../../lib/api/mockApi';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Handle keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          setQuery('');
          setSelectedIndex(0);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Aggregate searchable items
  const items = useMemo(() => {
    const navItems = [
      { id: 'nav-dash', category: 'Navigation', title: 'Dashboard Overview', icon: LayoutDashboard, path: '/' },
      { id: 'nav-docs', category: 'Navigation', title: 'Documents Repository', icon: FileText, path: '/documents' },
      { id: 'nav-rev', category: 'Navigation', title: 'Human Review Workspace (Two-Panel)', icon: CheckSquare, path: '/review' },
      { id: 'nav-rec', category: 'Navigation', title: 'Validated Records Repository', icon: Database, path: '/records' },
      { id: 'nav-ana', category: 'Navigation', title: 'Analytics & Trends', icon: BarChart3, path: '/analytics' },
      { id: 'nav-val', category: 'Navigation', title: 'Validation Center (Audit Queue)', icon: AlertTriangle, path: '/validation' },
      { id: 'nav-rep', category: 'Navigation', title: 'Reports & Form G-1 Generator', icon: FileBarChart, path: '/reports' },
      { id: 'nav-ai', category: 'Navigation', title: 'AI Geological Assistant', icon: Bot, path: '/assistant' },
    ];

    const recordItems = mockValidatedRecords.map((r) => ({
      id: `rec-${r.id}`,
      category: 'Validated Records',
      title: `${r.project} (${r.year})`,
      subtitle: `${r.subsidiary} • Prod: ${r.production} MT • Reserve: ${r.reserve} MT`,
      icon: Database,
      path: '/records',
      meta: r.subsidiary
    }));

    const docItems = mockDocuments.map((d) => ({
      id: `doc-${d.id}`,
      category: 'Documents',
      title: d.name,
      subtitle: `${d.id} • ${d.department}`,
      icon: FileText,
      path: '/documents',
      meta: d.id
    }));

    const issueItems = mockValidationIssues.map((i) => ({
      id: `val-${i.id}`,
      category: 'Validation Tickets',
      title: `${i.id}: ${i.fieldAffected}`,
      subtitle: `${i.severity} • ${i.docId}`,
      icon: AlertTriangle,
      path: '/validation',
      meta: i.id
    }));

    const reportItems = mockReportTemplates.map((t) => ({
      id: `rep-${t.id}`,
      category: 'Report Templates',
      title: t.name,
      subtitle: `${t.category} • ${t.badge}`,
      icon: FileBarChart,
      path: '/reports'
    }));

    const all = [...navItems, ...recordItems, ...docItems, ...issueItems, ...reportItems];

    if (!query.trim()) return all.slice(0, 10);

    const q = query.toLowerCase();
    return all.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        (item.meta && item.meta.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    ).slice(0, 12);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleNavigation = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % items.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
      } else if (e.key === 'Enter' && items[selectedIndex]) {
        e.preventDefault();
        handleSelect(items[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleNavigation);
    return () => window.removeEventListener('keydown', handleNavigation);
  }, [isOpen, items, selectedIndex]);

  const handleSelect = (item) => {
    onClose();
    navigate(item.path);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-900/40 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-surface-0 border border-border rounded-[10px] shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="px-4 py-3.5 border-b border-border flex items-center gap-3">
              <Search className="w-5 h-5 text-ink-500 shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search across documents, validated records, review tickets, or jump to pages..."
                className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="text-ink-500 hover:text-ink-900 p-1 rounded-[4px] hover:bg-surface-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[380px] overflow-y-auto p-2">
              {items.length === 0 ? (
                <div className="py-10 text-center text-xs text-ink-500">
                  No matching records found.
                </div>
              ) : (
                <div className="space-y-1">
                  {items.map((item, idx) => {
                    const Icon = item.icon || FileText;
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`px-3 py-2.5 rounded-[6px] flex items-center justify-between cursor-pointer transition-colors ${
                          isSelected ? 'bg-brand-50 text-brand-900' : 'text-ink-900 hover:bg-surface-1'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                          <div
                            className={`p-1.5 rounded-[4px] shrink-0 ${
                              isSelected ? 'bg-brand-700 text-white' : 'bg-surface-2 text-ink-700'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold truncate flex items-center gap-2">
                              <span>{item.title}</span>
                              {item.meta && (
                                <span className="font-mono text-[11px] text-ink-500 bg-surface-2 px-1.5 py-0.2 rounded">
                                  {item.meta}
                                </span>
                              )}
                            </div>
                            {item.subtitle && (
                              <div className="text-[11px] text-ink-500 truncate mt-0.5">
                                {item.subtitle}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 text-[11px] text-ink-500">
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-surface-2 rounded text-ink-700">
                            {item.category}
                          </span>
                          {isSelected && <ArrowRight className="w-3.5 h-3.5 text-brand-700" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-surface-1 border-t border-border flex items-center justify-between text-[11px] text-ink-500">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="font-mono px-1 py-0.5 bg-surface-0 border border-border rounded text-[10px]">↑</kbd>{' '}
                  <kbd className="font-mono px-1 py-0.5 bg-surface-0 border border-border rounded text-[10px]">↓</kbd> navigate
                </span>
                <span>
                  <kbd className="font-mono px-1.5 py-0.5 bg-surface-0 border border-border rounded text-[10px]">↵</kbd> select
                </span>
                <span>
                  <kbd className="font-mono px-1.5 py-0.5 bg-surface-0 border border-border rounded text-[10px]">esc</kbd> close
                </span>
              </div>
              <span className="font-mono text-[10px] text-ink-500">CMPDI Enterprise Global Command</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
