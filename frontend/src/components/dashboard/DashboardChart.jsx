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

const DashboardChart = () => {
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

        pointRadius: 3,
        pointHoverRadius: 5,

        pointBackgroundColor: "#64748b",
        pointBorderColor: "#f4f6f8",
        pointBorderWidth: 2,

        fill: true,
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
        borderColor: "#d9e0e7",
        borderWidth: 1,
        padding: 10,
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
      <div className="flex items-start justify-between mb-6">

        <div>
          <h3 className="text-lg font-semibold text-slate-700">
            Document Processing
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            Documents processed over the last 8 months
          </p>
        </div>

        <select
          className="
            bg-[#eef1f4]
            text-xs
            text-slate-500
            px-3 py-2
            rounded-xl
            outline-none
            border-none
            shadow-[inset_2px_2px_5px_rgba(163,177,198,0.18),inset_-2px_-2px_5px_rgba(255,255,255,0.8)]
          "
        >
          <option>Last 8 months</option>
          <option>Last 6 months</option>
          <option>Last 3 months</option>
        </select>

      </div>

      {/* Chart */}
      <div className="h-[280px]">
        <Line data={data} options={options} />
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-slate-200">

        <div>
          <p className="text-xs text-slate-400">
            Total Processed
          </p>

          <p className="text-lg font-semibold text-slate-700 mt-1">
            1,747
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400">
            This Month
          </p>

          <p className="text-lg font-semibold text-slate-700 mt-1">
            320
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-400">
            Avg. / Month
          </p>

          <p className="text-lg font-semibold text-slate-700 mt-1">
            218
          </p>
        </div>

      </div>

    </div>
  );
};

export default DashboardChart;