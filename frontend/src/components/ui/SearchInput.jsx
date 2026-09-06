import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = 'Search documents, boreholes, coordinates...',
  shortcut,
  size = 'md',
  className = '',
  autoFocus = false,
  ...props
}) {
  const sizeStyles = {
    sm: 'py-1.5 pl-8 pr-8 text-xs',
    md: 'py-2 pl-9 pr-9 text-sm',
    lg: 'py-2.5 pl-10 pr-10 text-base'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5 left-2.5',
    md: 'w-4 h-4 left-3',
    lg: 'w-4 h-4 left-3.5'
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <Search
        className={`absolute text-ink-500 pointer-events-none ${iconSizes[size] || iconSizes.md}`}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`w-full bg-surface-0 border border-border text-ink-900 placeholder:text-ink-500 rounded-[6px] transition-all focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-700/10 ${sizeStyles[size] || sizeStyles.md}`}
        {...props}
      />
      <div className="absolute right-2.5 flex items-center gap-1">
        {value && (
          <button
            type="button"
            onClick={() => {
              if (onClear) onClear();
              else if (onChange) onChange('');
            }}
            className="p-1 text-ink-500 hover:text-ink-900 rounded-[4px] hover:bg-surface-2 transition-colors"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        {shortcut && !value && (
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium text-ink-500 bg-surface-1 border border-border rounded-[4px]">
            {shortcut}
          </kbd>
        )}
      </div>
    </div>
  );
}
