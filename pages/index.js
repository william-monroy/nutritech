import { Button, Row, Spacer, Text } from "@nextui-org/react";
import Head from "next/head";
import { ChartP } from "../components/ChartP";
import SwitchTheme from "../components/SwitchTheme";
import styles from "../styles/Home.module.css";
import { signIn } from "next-auth/react";
import Hero from "/public/Hero.png";
import Image from "next/image";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession()
  if (status === 'loading') return null // si esta cargando no mostrar nada
  return (
    <div className={styles.container}>
      <Head>
        <title>NutriTech</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Row justify="center" css={{ flexWrap: "wrap" }}>
          <Text h1>Bienvenid@ a &nbsp; </Text>
          <Text
            h1
            size={50}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
            weight="bold"
          >
            NutriTech
          </Text>
        </Row>
        <Image src={Hero} alt="Hero image" width={700} height={500} />
        <div className={styles.footer}>
          <Row justify="center" css={{ flexWrap: "wrap" }}>
            <Text h4>¡Sí tu alimentación quieres mejorar &nbsp;</Text>
            <Text
              h1
              size={22}
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
              }}
              weight="bold"
            >
              NutriTech
            </Text>
            <Text h4>&nbsp; debes de usar!</Text>
          </Row>
          <Spacer />
          <Row justify="center">
          <Link href="/food"><Button color="success" auto ghost>Continuar</Button></Link>
          </Row>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session !== null) {
    return {
      redirect: {
        destination: "/food",
        permanent: false,
      },
    };
  }

  console.log("prueba index:",session);
  return {
    props: { session },
  };
}
