"use client";

import React from "react";
// import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  //   ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";
import { ChartData } from "./footprint.const";
import { Bar } from "react-chartjs-2";

// ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Footprint() {
  //   return <Pie data={data} />;

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (data) {
            return "Custom Label Text:" + data.formattedValue;
          },
        },
      },
      datalabels: {
        formatter: function (value) {
          //custom money icon
          return "₺" + new Intl.NumberFormat("tr-TR").format(value);
        },
        color: "white",
        font: {
          weight: "bold" as const,
          size: 14,
          family: "poppins",
        },
      },
    },
  };
  // The following colors will be used sequentially for the chart bars
  const backgroundColors = ["#53D9D9", "#002B49", "#0067A0"];
  const data = {
    labels: ChartData.map((item) => item.companyName),
    datasets: [
      {
        label: ChartData.map((item) => item.progressPaymentPrice),
        data: ChartData.map((item) => item.progressPaymentPrice),
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} options={options} />;
}
