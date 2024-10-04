"use client";

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Nylon", "Polyster", "Cotton"],
  datasets: [
    {
      data: [12, 29, 10],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(162, 162, 235, 0.2)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function Category() {
  return <Pie data={data} className="mt-4" />;
}
