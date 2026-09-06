import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import '../../lib/chartConfig';

export default function TrendLineChart({
  labels = [],
  processedData = [],
  flaggedData = [],
  height = 260
}) {
  const chartData = useMemo(() => {
    return {
      labels: labels,
      datasets: [
        {
          label: 'Processed Documents',
          data: processedData,
          borderColor: '#1E4FA3',
          backgroundColor: 'rgba(30, 79, 163, 0.06)',
          borderWidth: 2,
          pointBackgroundColor: '#1E4FA3',
          pointBorderColor: '#FFFFFF',
          pointBorderWidth: 1.5,
          pointRadius: 3,
          pointHoverRadius: 5,
          tension: 0.3,
          fill: true,
          yAxisID: 'y'
        },
        {
          label: 'Validation Flags',
          data: flaggedData,
          borderColor: '#B4711C',
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderDash: [4, 4],
          pointBackgroundColor: '#B4711C',
          pointBorderColor: '#FFFFFF',
          pointBorderWidth: 1.5,
          pointRadius: 3,
          pointHoverRadius: 5,
          tension: 0.3,
          fill: false,
          yAxisID: 'y1'
        }
      ]
    };
  }, [labels, processedData, flaggedData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
          boxWidth: 6,
          boxHeight: 6,
          font: {
            family: "'IBM Plex Sans', sans-serif",
            size: 11,
            weight: '500'
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        padding: 10,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: '#F1F3F5',
          drawTicks: false
        },
        ticks: {
          color: '#5B6572',
          font: {
            family: "'IBM Plex Sans', sans-serif",
            size: 11
          },
          padding: 8
        },
        border: {
          color: '#E2E5EA'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: '#F1F3F5',
          drawTicks: false
        },
        ticks: {
          color: '#5B6572',
          font: {
            family: "'IBM Plex Mono', monospace",
            size: 11
          },
          padding: 8,
          callback: (value) => value.toLocaleString()
        },
        border: {
          color: '#E2E5EA'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
          drawTicks: false
        },
        ticks: {
          color: '#B4711C',
          font: {
            family: "'IBM Plex Mono', monospace",
            size: 11
          },
          padding: 8,
          callback: (value) => `${value} flags`
        },
        border: {
          color: '#E2E5EA'
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div style={{ height: `${height}px` }} className="w-full relative">
      <Line data={chartData} options={options} />
    </div>
  );
}
