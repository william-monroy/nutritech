import { Grid, Card, Row, Spacer, Text } from "@nextui-org/react";
import React from "react";
import PageLayout from "../../components/PageLayout";
import { getSession, useSession } from "next-auth/react";
import styles from "../../styles/Recetas.module.css";
import Image from "next/image";
import { recetasTipicas } from "../../lib/recetas";

const colorCat = ["default", "success", "error", "warning", "orange"];

const dataFake = [
  {
    id: 1,
    nombre: "Mole coloradito",
    imgURL: "https://i.postimg.cc/BZM3Zypj/mole.png",
    ingredientes: [
      {
        id: 1,
        nombre: "Chile huajillo",
        cantidad: 50,
        unidad: "gramos",
        categoria: 1,
      },
      {
        id: 2,
        nombre: "Chile ancho",
        cantidad: 100,
        unidad: "gramos",
        categoria: 1,
      },
      {
        id: 3,
        nombre: "Jitomates",
        cantidad: 2,
        unidad: "kilos",
        categoria: 1,
      },
      {
        id: 4,
        nombre: "Cebolla chica",
        cantidad: 0.5,
        unidad: "pieza",
        categoria: 1,
      },
      {
        id: 5,
        nombre: "Ajos pelados",
        cantidad: 2,
        unidad: "dientes",
        categoria: 0,
      },
      {
        id: 6,
        nombre: "Aceite",
        cantidad: 4,
        unidad: "cucharadas soperas",
        categoria: 3,
      },
      {
        id: 7,
        nombre: "Platano macho en rodajas",
        cantidad: 1,
        unidad: "pieza",
        categoria: 1,
      },
      {
        id: 8,
        nombre: "Pan bolillo",
        cantidad: 3,
        unidad: "rodajas",
        categoria: 2,
      },
      {
        id: 9,
        nombre: "Ajonjoli",
        cantidad: 2,
        unidad: "cucharadas soperas",
        categoria: 3,
      },
      {
        id: 10,
        nombre: "Canela",
        cantidad: 1,
        unidad: "rama",
        categoria: 0,
      },
      {
        id: 11,
        nombre: "Oregano",
        cantidad: 1,
        unidad: "pizca",
        categoria: 0,
      },
      {
        id: 12,
        nombre: "Clavos de olor",
        cantidad: 2,
        unidad: "piezas",
        categoria: 0,
      },
      {
        id: 13,
        nombre: "Sal y pimienta",
        cantidad: 0,
        unidad: "al gusto",
        categoria: 0,
      },
      {
        id: 14,
        nombre: "Caldo de pollo",
        cantidad: 2,
        unidad: "tazas",
        categoria: 0,
      },
      {
        id: 15,
        nombre: "Pollo",
        cantidad: 2,
        unidad: "piezas",
        categoria: 3,
      },
    ],
    leyenda: "Contiene mayor canticadad de azucares simples, grasas y energía",
    alerta:
      "De acuerdo al contenido nutricional de los alimentos, este platillo está constituido por mayor cantidad de azucares simples, grasas y energía, por lo que el consumo debe ser en poca cantidad.",
  },
];

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
                receta[0].ingredientes.map((ingrediente) => <Card color={colorCat[ingrediente.categoria]} key={ingrediente.id}>{ingrediente.nombre}</Card>)
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

  const receta = recetasTipicas.filter((rece) => rece.nombre === context.params.id);
  console.log("prueba receta:", session);
  console.log(receta);

  if(receta === []){
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
