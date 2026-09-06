import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-700/20 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-[6px]';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-3.5 py-2 gap-2',
    lg: 'text-base px-4 py-2.5 gap-2.5',
    icon: 'p-2 text-sm',
    iconSm: 'p-1.5 text-xs'
  };

  const variantStyles = {
    primary: 'bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-900 border border-transparent shadow-none',
    secondary: 'bg-surface-0 text-ink-900 hover:bg-surface-1 active:bg-surface-2 border border-border',
    outline: 'bg-transparent text-brand-700 hover:bg-brand-50 border border-brand-700/30',
    danger: 'bg-critical text-white hover:bg-red-800 active:bg-red-900 border border-transparent',
    dangerOutline: 'bg-transparent text-critical hover:bg-red-50 border border-red-200',
    ghost: 'bg-transparent text-ink-700 hover:bg-surface-1 hover:text-ink-900 border border-transparent',
    link: 'bg-transparent text-brand-700 hover:underline p-0 border-none inline'
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
