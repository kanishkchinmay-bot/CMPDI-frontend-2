import React from 'react';
import '../../lib/chartConfig'; // ensure ChartJS defaults are registered

export default function ChartWrapper({
  children,
  height = 260,
  className = ''
}) {
  return (
    <div
      className={`w-full relative ${className}`}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      {children}
    </div>
  );
}
