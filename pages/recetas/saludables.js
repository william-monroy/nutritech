import { Collapse } from "@nextui-org/react";
import { Grid, Card, Row, Spacer, Text } from "@nextui-org/react";
import { recetasSaludables } from "../../lib/recetas";
import styles from "../../styles/recetasSaludables.module.css";
import PageLayout from "../../components/PageLayout";
import Image from "next/image";
import { motion } from "framer-motion";
import { getSession, useSession } from "next-auth/react";

const colorCat = ["$default", "$success", "$error", "$warning", "$orange"];

export default function Saludables() {
  const { data, status } = useSession();
  if (status === "loading") return null; // si esta cargando no mostrar nada

  return (
    <PageLayout>
      <main className={styles.main}>
        <header className={styles.header}>
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            initial={{ opacity: 0, x: "-100px" }}
          >
            <Text
              h1
              size={40}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
              }}
            >
              Recetas saludables
            </Text>
          </motion.div>
        </header>
        <Collapse.Group accordion={false}>
          {recetasSaludables.map((receta) => (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 * receta.id }}
              initial={{ opacity: 0, x: "-100px" }}
              key={receta.id}
            >
              <Collapse title={receta.nombre}>
                <main className={styles.main}>
                  <section className={styles.contentCenter}>
                    <Image
                      className="imagenReceta"
                      src={receta.imagen}
                      alt="Receta image"
                      width={350}
                      height={350}
                    />
                    <div className={styles.contentInfo}>
                      <div className={styles.ingredientes}>
                        <h4>Ingredientes</h4>
                        <ul>
                          {receta.ingredientes.map((ingrediente) => (
                            <Card
                              css={{
                                backgroundColor:
                                  colorCat[ingrediente.categoria],
                              }}
                              key={ingrediente.id}
                            >
                              {ingrediente.nombre}
                            </Card>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.cantidad}>
                        <h4>Cantidad</h4>
                        <ul>
                          {receta.ingredientes.map((ingrediente) => (
                            <Card
                              key={ingrediente.id}
                            >{`${ingrediente.cantidad} ${ingrediente.unidad}`}</Card>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                  <section className={styles.contentAlarms}>
                    <div className={styles.contentLeyenda}>
                      <h3>Nota</h3>
                      <p>{receta.Nota}</p>
                    </div>
                  </section>
                </main>
              </Collapse>
            </motion.div>
          ))}
        </Collapse.Group>
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

  return {
    props: { session },
  };
}
