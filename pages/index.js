import { Button } from "@nextui-org/react";
import Head from "next/head";
import { ChartP } from "../components/ChartP";
import SwitchTheme from "../components/SwitchTheme";
import styles from "../styles/Home.module.css";
import {signIn} from 'next-auth/react';
import Hero from '/public/Hero.png';
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
        <h1>Bienvenido a NutriTech</h1>
        <Image src={Hero} alt="Hero image" width={700} height={500}/>
        <div className={styles.footer}>  
          <h4>¡Sí tu alimentación quieres mejorar NutriTech debes de usar!</h4>
          <Link href="/food"><Button color="success" auto ghost>Continuar</Button></Link>
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
