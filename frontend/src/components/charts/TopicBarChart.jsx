import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import '../../lib/chartConfig';

export default function TopicBarChart({
  topics = [],
  height = 260
}) {
  const chartData = useMemo(() => {
    return {
      labels: topics.map((t) => t.topic),
      datasets: [
        {
          label: 'Documents Indexed',
          data: topics.map((t) => t.count),
          backgroundColor: '#1E4FA3',
          hoverBackgroundColor: '#123061',
          borderRadius: 4,
          borderSkipped: false,
          barPercentage: 0.65,
          categoryPercentage: 0.8
        }
      ]
    };
  }, [topics]);

  const options = {
    indexAxis: 'y', // Explicit horizontal bar chart
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => ` Indexed: ${context.parsed.x.toLocaleString()} documents`
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
            family: "'IBM Plex Mono', monospace",
            size: 11
          },
          padding: 6,
          callback: (value) => value.toLocaleString()
        },
        border: {
          color: '#E2E5EA'
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          color: '#0F1720',
          font: {
            family: "'IBM Plex Sans', sans-serif",
            size: 12,
            weight: '500'
          },
          padding: 8
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
