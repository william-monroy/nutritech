import { Grid, Card, Row, Spacer, Text } from "@nextui-org/react";
import React from "react";
import PageLayout from "../../components/PageLayout";
import { getSession, useSession } from "next-auth/react";
import styles from "../../styles/Recetas.module.css";
import Image from "next/image";
import { recetasTipicas } from "../../lib/recetas";

const colorCat = ["$default", "$success", "$error", "$warning", "$orange"];

export default function Receta({ receta }) {
  const { data, status } = useSession();
  if (status === "loading") return null; // si esta cargando no mostrar nada

  return (
    <PageLayout>
      <main className={styles.main}>
        <header className={styles.header}>
          <Text
            h1
            size={40}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
          >
            Información nutrimental de: {receta[0].nombre}
          </Text>
          <h1></h1>
          <h3>(Porción recomendada)</h3>
        </header>
        <section className={styles.contentCenter}>
          <Image className="imagenReceta" src={receta[0].imagen} alt="Receta image" width={350} height={350} />
          <div className={styles.contentInfo}>
            <div className={styles.ingredientes}>
              <h4>Ingredientes</h4>
              <ul>
              {
                receta[0].ingredientes.map((ingrediente) => <Card css={{backgroundColor: colorCat[ingrediente.categoria] }} key={ingrediente.id}>{ingrediente.nombre}</Card>)
              }
              </ul>
            </div>
            <div className={styles.cantidad}>
              <h4>Cantidad</h4>
              <ul>
              {
                receta[0].ingredientes.map((ingrediente) => <Card key={ingrediente.id} >{`${ingrediente.cantidad} ${ingrediente.unidad}`}</Card>)
              }
              </ul>
            </div>
          </div>
        </section>
        <section className={styles.contentAlarms}>
          <div className={styles.contentAlerta}>
            <h3>Alerta</h3>
            <p>{receta[0].alerta}</p>
          </div>
          <div className={styles.contentLeyenda}>
            <h3>Leyenda precautoria</h3>
            <p>{receta[0].leyenda}</p>
          </div>
        </section>
      </main>
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

  const receta = recetasTipicas.filter((rece) => rece.nombre.toLowerCase() === context.params.id.toLowerCase());
  console.log("prueba receta:", session);
  console.log(receta);

  if(receta.length === 0){
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  
  return {
    props: { session, receta },
  };
}
