import {
  Button,
  Card,
  Grid,
  Input,
  Row,
  Spacer,
  Text,
  Textarea,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { ChartP } from "../components/ChartP";
import styles from "../styles/Food.module.css";
import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";
import { getSession, useSession } from "next-auth/react";
import Legend from "../components/Legend";
import Link from "next/link";
import Autocomplete from "../components/Autocomplete";
import { IoMdDownload } from "react-icons/io";

export default function Food() {
  const [alimento, setAlimento] = useState("");

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
        <Grid.Container gap={2}>
          <Grid md={12}>
            <Row>
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                initial={{ opacity: 0, x: "-100px" }}
              >
                <Text
                  h1
                  // size={45}
                  css={{
                    textGradient: "45deg, $blue600 -20%, $pink600 50%",
                  }}
                >
                  ¿Qué comer?
                </Text>
              </motion.div>
            </Row>
          </Grid>
          <Grid
            md={7}
            xs={12}
            direction="column"
            // css={{ backgroundColor: "$blue400" }}
          >
            <Spacer y={0.5} />
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5 }}
              initial={{ opacity: 0, x: "-100px" }}
            >
              <Text size={18}>
                Si dudas de qué alimentos vas a consumir, consulta aquí:
              </Text>
            </motion.div>
            <Spacer y={0.5} />
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5 }}
              initial={{ opacity: 0, x: "-100px" }}
              css={{ display: "flex" }}
            >
              <Row>
                <Input
                  type="text"
                  placeholder="Buscar Receta. Ejm: Tlayudas"
                  aria-label="Buscar Receta"
                  onChange={(e) => setAlimento(e.target.value)}
                />
                <Spacer x={0.3} />
                <Link href={`/recetas/${alimento}`}>
                  <Button type="primary" auto aria-label="Buscar">
                    Buscar
                  </Button>
                </Link>
              </Row>
              <Spacer />
            </motion.div>
            <Spacer />
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              initial={{ opacity: 0, scale: 0 }}
            >
              <Card css={{ alignItems: "center" }}>
                <div className={styles.center}>
                  <img
                    src="/appleandlemon.gif"
                    alt="Apple and Lemon"
                    className={styles.gif}
                  />
                  <Spacer y={0.3} />
                  <Text size={18}>Realiza una búsqueda</Text>
                </div>
              </Card>
            </motion.div>
            <Spacer />
            <Row css={{ flexWrap: "wrap" }} justify="center">
              <a target="_blank" href="/lista_de_alimentos.pdf">
                <Button color="error" ghost icon={<IoMdDownload />}>
                  Lista de Alimentos
                </Button>
              </a>
              <Spacer />
              <Link href="/recetas/saludables">
                <Button color="error" ghost>
                  Menus Saludables
                </Button>
              </Link>
            </Row>
            <Autocomplete />
            <Spacer />
          </Grid>
          <Spacer />
          <Grid
            md={4}
            sm={12}
            direction="column"
            justify="center"
            // css={{ backgroundColor: "gray" }}
          >
            <div className={styles.center}>
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                initial={{ opacity: 0, scale: 0 }}
              >
                <Text h4>Tabla de Referencia Alimenticia</Text>
              </motion.div>
              <Spacer />
              <div className={styles.chart}>
                <ChartP data={dataChart} />
              </div>
            </div>
            <Spacer />
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              initial={{ opacity: 0, scale: 0 }}
            >
              <Card>
                <Text h5 align="center">
                  Leyenda
                </Text>
                <Spacer />
                <Legend color="#47ba27" label="Frutas" num="25%" />
                <Legend color="#47ba27" label="Verduras" num="25%" />
                <Legend color="#fec533" label="Cereales" num="25%" />
                <Legend
                  color="#f55200"
                  label="Alimentos de Origen Animal"
                  num="13%"
                />
                <Legend color="#d20a00" label="Leguminosas" num="12%" />
              </Card>
            </motion.div>
            <Spacer />
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
