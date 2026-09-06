
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const AnalyticsChart = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
    ],

    datasets: [
      {
        label: "Documents Processed",
        data: [120, 165, 142, 210, 245, 280, 265, 320],

        borderColor: "#64748b",
        backgroundColor: "rgba(100, 116, 139, 0.08)",

        borderWidth: 2,
        tension: 0.4,
        fill: true,

        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: "#64748b",
        pointBorderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#eef1f4",
        titleColor: "#334155",
        bodyColor: "#64748b",

        borderColor: "#d9e2ec",
        borderWidth: 1,

        padding: 12,

        displayColors: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#94a3b8",
          font: {
            size: 11,
          },
        },

        border: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,

        grid: {
          color: "rgba(148, 163, 184, 0.12)",
        },

        ticks: {
          color: "#94a3b8",
          font: {
            size: 11,
          },
        },

        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="neu-card p-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

        <div>
          <h2 className="text-lg font-semibold text-slate-700">
            Document Processing Trend
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Monthly document processing activity
          </p>
        </div>

        <div className="flex items-center gap-2">

          <span className="w-2 h-2 rounded-full bg-slate-500" />

          <span className="text-xs text-slate-500">
            Documents Processed
          </span>

        </div>

      </div>


      {/* Chart */}
      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>


      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-slate-200">

        <div>
          <p className="text-[11px] text-slate-400">
            Total Processed
          </p>

          <p className="text-lg font-semibold text-slate-700 mt-1">
            1,747
          </p>
        </div>

        <div>
          <p className="text-[11px] text-slate-400">
            This Month
          </p>

          <p className="text-lg font-semibold text-slate-700 mt-1">
            320
          </p>
        </div>

        <div>
          <p className="text-[11px] text-slate-400">
            Monthly Average
          </p>

          <p className="text-lg font-semibold text-slate-700 mt-1">
            218
          </p>
        </div>

      </div>

    </div>
  );
};

export default AnalyticsChart;
