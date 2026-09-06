import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, description, type = 'info', duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, description, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-auto bg-surface-0 border border-border rounded-[8px] p-3.5 shadow-md flex items-start gap-3"
            >
              <div className="shrink-0 mt-0.5">
                {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-success" />}
                {t.type === 'warning' && <AlertTriangle className="w-4 h-4 text-ochre-600" />}
                {t.type === 'error' && <AlertCircle className="w-4 h-4 text-critical" />}
                {t.type === 'info' && <Info className="w-4 h-4 text-brand-700" />}
              </div>
              <div className="flex-1 min-w-0">
                {t.title && <h4 className="text-xs font-semibold text-ink-900">{t.title}</h4>}
                {t.description && (
                  <p className="text-xs text-ink-500 mt-0.5 leading-relaxed">{t.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="text-ink-300 hover:text-ink-900 p-0.5 rounded-[4px]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      addToast: () => {},
      removeToast: () => {},
      success: () => {},
      error: () => {},
      warning: () => {},
      info: () => {}
    };
  }
  return {
    ...ctx,
    success: (title, description) => ctx.addToast({ title, description, type: 'success' }),
    error: (title, description) => ctx.addToast({ title, description, type: 'error' }),
    warning: (title, description) => ctx.addToast({ title, description, type: 'warning' }),
    info: (title, description) => ctx.addToast({ title, description, type: 'info' })
  };
}
