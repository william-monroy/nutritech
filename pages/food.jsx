import { Grid } from "@nextui-org/react";
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
      "Verduras",
      "Leguminosas",
      "Alimentos de origen animal",
      "Cereales",
      "Frutas",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [25, 12, 13, 25, 25],
        backgroundColor: [
          "rgba(71, 199, 36, 0.7)",
          "rgba(199, 23, 14, 0.7)",
          "rgba(245, 99, 24, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(71, 199, 36, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <PageLayout>
    <div className={styles.Food}>
      <SwitchTheme />
      
      <div style={{ width: "400px" }}>
        <ChartP data={data} />
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
