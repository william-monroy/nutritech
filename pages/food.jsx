import React from "react";
import { ChartP } from "../components/ChartP";
import SwitchTheme from "../components/SwitchTheme";
import styles from "../styles/Food.module.css";

import PageLayout from "../components/PageLayout";
import { getSession, useSession } from "next-auth/react";


export default function Food(){
  const { data, status } = useSession()
  if (status === 'loading') return null // si esta cargando no mostrar nada

  const dataChart = {
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
    <PageLayout>
      <div className={styles.Food}>
        <SwitchTheme />
        <div style={{ height: "800px" }}>
          <ChartP data={dataChart} />
        </div>
      </div>
    </PageLayout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  /*if (session == null) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }*/

  console.log("prueba index:",session);
  return {
    props: { session },
  };
}
