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

const ProductionChart = () => {
  const data = {
    labels: [
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
      "2024",
    ],

    datasets: [
      {
        label: "Coal Production",
        data: [120, 150, 180, 210, 250, 320],
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="font-semibold mb-4">
        Production Trend
      </h3>

      <Line data={data} options={options} />
    </div>
  );
};

export default ProductionChart;