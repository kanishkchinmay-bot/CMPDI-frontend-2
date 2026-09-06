import React from 'react';

export default function Card({
  children,
  title,
  subtitle,
  action,
  headerBorder = true,
  footer,
  className = '',
  bodyClassName = 'p-5',
  ...props
}) {
  return (
    <div
      className={`bg-surface-0 border border-border rounded-[10px] overflow-hidden ${className}`}
      {...props}
    >
      {(title || action || subtitle) && (
        <div
          className={`px-5 py-4 flex items-center justify-between gap-4 ${
            headerBorder ? 'border-b border-border' : ''
          }`}
        >
          <div className="min-w-0">
            {title && (
              <h3 className="text-sm font-semibold text-ink-900 tracking-tight truncate">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-ink-500 mt-0.5 truncate">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
        </div>
      )}

      <div className={bodyClassName}>{children}</div>

      {footer && (
        <div className="px-5 py-3.5 bg-surface-1 border-t border-border flex items-center justify-between text-xs text-ink-500">
          {footer}
        </div>
      )}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`px-5 py-4 border-b border-border flex items-center justify-between gap-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = 'p-5' }) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`px-5 py-3.5 bg-surface-1 border-t border-border flex items-center justify-between text-xs text-ink-500 ${className}`}>
      {children}
    </div>
  );
}
