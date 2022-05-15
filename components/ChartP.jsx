import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  responsive: true,
};

// export const data = {
//   labels: ['Habilidades de Supervisión', 'Sentido común y tacto en las relaciones interpersonales', 'Capacidad de decisión'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [66.07, 20.0, 33.33],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.5)',
//         'rgba(54, 162, 235, 0.5)',
//         'rgba(255, 206, 86, 0.5)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

export function ChartP({ data }) {
  return <Pie data={data} options={options} />;
}
