import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import '../../lib/chartConfig';

export default function Sparkline({
  data = [],
  color = '#1E4FA3',
  height = 36,
  width = 90
}) {
  const chartData = useMemo(() => {
    return {
      labels: data.map((_, i) => i),
      datasets: [
        {
          data: data,
          borderColor: color,
          borderWidth: 1.5,
          pointRadius: 0,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: color,
          tension: 0.25,
          fill: false,
        }
      ]
    };
  }, [data, color]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    interaction: {
      intersect: false,
      mode: 'nearest',
    },
    animation: false
  };

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }} className="shrink-0">
      <Line data={chartData} options={options} />
    </div>
  );
}
