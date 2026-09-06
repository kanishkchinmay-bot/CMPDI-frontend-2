import React from 'react';
import { formatPercent } from '../../lib/formatters';

export default function ConfidenceBar({
  value,
  showLabel = true,
  size = 'md',
  className = ''
}) {
  const numericValue = typeof value === 'string' ? parseFloat(value.replace('%', '')) : (value || 0);
  const clampedValue = Math.min(100, Math.max(0, numericValue));

  // Determine tier colors
  const getTier = (val) => {
    if (val >= 95) {
      return {
        bar: 'bg-success',
        text: 'text-success',
        bg: 'bg-green-100/60'
      };
    }
    if (val >= 85) {
      return {
        bar: 'bg-ochre-600',
        text: 'text-ochre-600',
        bg: 'bg-amber-100/60'
      };
    }
    return {
      bar: 'bg-critical',
      text: 'text-critical',
      bg: 'bg-red-100/60'
    };
  };

  const tier = getTier(clampedValue);

  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-2.5'
  }[size] || 'h-2';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`flex-1 bg-surface-2 rounded-full overflow-hidden ${heightClass}`}>
        <div
          className={`${tier.bar} ${heightClass} rounded-full transition-all duration-300`}
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <span className={`font-mono text-xs font-semibold shrink-0 min-w-[48px] text-right ${tier.text}`}>
          {formatPercent(clampedValue)}
        </span>
      )}
    </div>
  );
}
