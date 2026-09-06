import React, { useMemo } from 'react';
import { Chart } from 'react-chartjs-2';
import '../../lib/chartConfig';

export default function QueryAnalyticsCombo({
  queryAnalytics,
  height = 260
}) {
  const chartData = useMemo(() => {
    if (!queryAnalytics) return { labels: [], datasets: [] };

    return {
      labels: queryAnalytics.labels,
      datasets: [
        {
          type: 'bar',
          label: 'AI Decision Queries',
          data: queryAnalytics.queries,
          backgroundColor: 'rgba(30, 79, 163, 0.85)',
          hoverBackgroundColor: '#123061',
          borderRadius: 4,
          borderSkipped: false,
          yAxisID: 'y',
          order: 2,
          barPercentage: 0.55
        },
        {
          type: 'line',
          label: 'Ground Truth Match Rate (%)',
          data: queryAnalytics.accuracyScore,
          borderColor: '#B4711C',
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointBackgroundColor: '#B4711C',
          pointBorderColor: '#FFFFFF',
          pointBorderWidth: 1.5,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.25,
          yAxisID: 'y1',
          order: 1
        }
      ]
    };
  }, [queryAnalytics]);

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
        callbacks: {
          label: function (context) {
            if (context.dataset.type === 'line') {
              return ` ${context.dataset.label}: ${context.parsed.y}%`;
            }
            return ` ${context.dataset.label}: ${context.parsed.y.toLocaleString()} queries`;
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
          color: '#0F1720',
          font: {
            family: "'IBM Plex Sans', sans-serif",
            size: 11,
            weight: '500'
          },
          padding: 6
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
        min: 95,
        max: 100,
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
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
}
