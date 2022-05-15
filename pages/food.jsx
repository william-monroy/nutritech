import { Grid, Input, Row, Spacer, Text } from "@nextui-org/react";
import React from "react";
import { ChartP } from "../components/ChartP";
import SwitchTheme from "../components/SwitchTheme";
import styles from "../styles/Food.module.css";

import PageLayout from "../components/PageLayout";
import { getSession, useSession } from "next-auth/react";

export default function Food() {
  const { data, status } = useSession();
  if (status === "loading") return null; // si esta cargando no mostrar nada

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
        <Grid.Container>
          {/* <Grid md={12} css={{ backgroundColor: "$accents4" }}> */}
          <Grid md={12}>
            <Row>
              <Text
                h1
                size={40}
                css={{
                  textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }}
              >
                ¿Qué comer?
              </Text>
            </Row>
          </Grid>
          <Grid
            md={7}
            xs={12}
            // css={{ backgroundColor: "$yellow600" }}
            direction="column"
          >
            <Spacer y={0.5} />
            <Text size={18}>
              Si dudas de qué alimentos vas a consumir, consulta aquí:
            </Text>
            <Spacer y={0.5} />
            <Input
              type="text"
              placeholder="Buscar alimento"
              css={{ mw: "350px" }}
              aria-label="Buscar alimento"
            />
          </Grid>
          <Spacer />
          <Grid md={4} sm={8} justify="center">
            <div style={{ width: "230px" }}>
              <ChartP data={dataChart} />
            </div>
          </Grid>
        </Grid.Container>
      </div>
    </PageLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session == null) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  console.log("prueba food:", session);
  return {
    props: { session },
  };
}
