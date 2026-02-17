"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const ChartsSection = () => {
  // Data for the bar chart
  const barChartData = {
    labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    datasets: [
      {
        label: "Envoyés",
        data: [400, 300, 500, 450, 580, 350, 250],
        backgroundColor: "#81BBAE",
        borderRadius: 0,
        barThickness: 44,
      },
      {
        label: "Delivrés",
        data: [390, 290, 490, 440, 570, 340, 240],
        backgroundColor: "#30618B",
        borderRadius: 0,
        barThickness: 44,
      },
    ],
  };

  // Bar Chart Options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "center",
        labels: {
          usePointStyle: true,
          pointStyle: "rect",
          padding: 20,
          color: "#71717A",
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
        max: 600,
        ticks: {
          stepSize: 150,
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
        categoryPercentage: 0.6,
        barPercentage: 0.8,
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
            size: 12,
          },
        },
      },
    },
  };

  // ✅ JSX Layout
  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl border border-black/10 p-6 flex flex-col gap-6">
        <div>
          <h3 className="text-zinc-900 text-base font-normal font-['Outfit'] leading-4">
            Performances SMS (7 derniers jours)
          </h3>
        </div>
        <div className="h-80 w-full">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
