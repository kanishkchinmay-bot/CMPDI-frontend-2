import React from 'react';

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
  mono = false
}) {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 leading-none',
    md: 'text-xs px-2.5 py-1 leading-tight',
    lg: 'text-sm px-3 py-1.5 leading-tight'
  };

  const variantStyles = {
    success: 'bg-green-50 text-[#15803D] border border-green-200/80',
    brand: 'bg-blue-50 text-[#1E4FA3] border border-blue-200/80',
    warning: 'bg-amber-50 text-[#B4711C] border border-amber-200/80',
    critical: 'bg-red-50 text-[#B42318] border border-red-200/80',
    neutral: 'bg-[#F1F3F5] text-[#5B6572] border border-[#E2E5EA]',
    outline: 'bg-transparent text-[#0F1720] border border-[#E2E5EA]'
  };

  const dotColors = {
    success: 'bg-[#15803D]',
    brand: 'bg-[#1E4FA3]',
    warning: 'bg-[#B4711C]',
    critical: 'bg-[#B42318]',
    neutral: 'bg-[#5B6572]',
    outline: 'bg-[#0F1720]'
  };

  // Map status strings commonly passed to variants
  const mappedVariant = (() => {
    const v = String(variant).toLowerCase();
    if (['processed', 'validated', 'resolved', 'success', 'completed', 'active'].includes(v)) return 'success';
    if (['in review', 'info', 'brand', 'primary', 'las', 'pdf'].includes(v)) return 'brand';
    if (['pending', 'warning', 'medium', 'queued'].includes(v)) return 'warning';
    if (['flagged', 'critical', 'high', 'failed', 'error'].includes(v)) return 'critical';
    return 'neutral';
  })();

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${mono ? 'font-mono' : 'font-sans'} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[mappedVariant]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[mappedVariant]}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}

export function StatusPill({ status, size = 'sm', className = '' }) {
  return (
    <Badge variant={status} size={size} dot className={className}>
      {status}
    </Badge>
  );
}
