"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const SubscriberGrowth = ({ growthData }) => {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const frenchLabels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  const dataPoints = days.map((day) => growthData?.[day] || 0);

  const lineChartData = {
    labels: frenchLabels,
    datasets: [
      {
        label: "Nouveaux abonnés",
        data: dataPoints,
        borderColor: "#30618B",
        backgroundColor: "transparent",
        borderWidth: 2,
        pointBackgroundColor: "#FFFFFF",
        pointBorderColor: "#30618B",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0, // Straight lines as per design
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "center",
        labels: {
          usePointStyle: true,
          pointStyle: "dash",
          padding: 20,
          color: "#30618B",
          font: {
            family: "Outfit",
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#E2E2E2",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#71717A",
          font: {
            family: "Inter",
            size: 12,
          },
        },
        grid: {
          color: "#E5E7EB",
          drawBorder: false,
          borderDash: [5, 5],
        },
      },
      x: {
        grid: {
          display: true,
          color: "#E5E7EB",
          drawBorder: false,
          borderDash: [5, 5],
        },
        ticks: {
          color: "#71717A",
          font: {
            family: "Outfit",
            size: 10,
          },
        },
      },
    },
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl border border-black/10 p-5 flex flex-col gap-6">
        <div>
          <h3 className="text-zinc-900 text-base font-normal font-['Outfit'] leading-4">
            Croissance des abonnés
          </h3>
        </div>
        <div className="h-64 w-full px-2">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default SubscriberGrowth;
