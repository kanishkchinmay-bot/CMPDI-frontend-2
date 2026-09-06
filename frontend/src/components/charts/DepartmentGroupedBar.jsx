import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import '../../lib/chartConfig';

export default function DepartmentGroupedBar({
  departmentMetrics,
  height = 260
}) {
  const chartData = useMemo(() => {
    if (!departmentMetrics) return { labels: [], datasets: [] };

    return {
      labels: departmentMetrics.labels,
      datasets: [
        {
          label: 'Documents Processed',
          data: departmentMetrics.documents,
          backgroundColor: '#1E4FA3',
          hoverBackgroundColor: '#123061',
          borderRadius: 4,
          borderSkipped: false,
          yAxisID: 'y',
          barPercentage: 0.6,
          categoryPercentage: 0.7
        },
        {
          label: 'OCR Accuracy (%)',
          data: departmentMetrics.accuracy,
          backgroundColor: '#15803D',
          hoverBackgroundColor: '#166534',
          borderRadius: 4,
          borderSkipped: false,
          yAxisID: 'y1',
          barPercentage: 0.6,
          categoryPercentage: 0.7
        }
      ]
    };
  }, [departmentMetrics]);

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
        callbacks: {
          label: function (context) {
            if (context.dataset.yAxisID === 'y1') {
              return ` ${context.dataset.label}: ${context.parsed.y}%`;
            }
            return ` ${context.dataset.label}: ${context.parsed.y.toLocaleString()} docs`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#0F1720',
          font: {
            family: "'IBM Plex Sans', sans-serif",
            size: 11,
            weight: '500'
          },
          maxRotation: 0,
          autoSkip: false
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
        min: 90,
        max: 100,
        grid: {
          drawOnChartArea: false,
          drawTicks: false
        },
        ticks: {
          color: '#15803D',
          font: {
            family: "'IBM Plex Mono', monospace",
            size: 11
          },
          padding: 8,
          callback: (value) => `${value}%`
        },
        border: {
          color: '#E2E5EA'
        }
      }
    }
  };

  return (
    <div style={{ height: `${height}px` }} className="w-full relative">
      <Bar data={chartData} options={options} />
    </div>
  );
}
