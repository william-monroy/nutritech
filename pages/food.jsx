import React from "react";
import { ChartP } from "../components/ChartP";
import SwitchTheme from "../components/SwitchTheme";
import styles from "../styles/Food.module.css";

const Food = () => {
  const data = {
    labels: [
      "Habilidades de Supervisión",
      "Sentido común y tacto en las relaciones interpersonales",
      "Capacidad de decisión",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [66.07, 20.0, 33.33],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.Food}>
      <SwitchTheme />
      <div style={{ height: "800px" }}>
        <ChartP data={data} />
      </div>
    </div>
  );
};

export default Food;
