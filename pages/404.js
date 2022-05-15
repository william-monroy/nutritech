import Link from "next/link";
import PageLayout from "../components/PageLayout";
import Image from "next/image";
import FourImg from "/public/404.png";
import { Button } from "@nextui-org/react";
import styles from "../styles/404.module.css";

export default function FourOhFour() {
  return (
    <PageLayout>
      <main className={styles.main}>
        <h1>404 - Regaste la leche :(</h1>
        <h3>
          {" "}
          No pudimos encontrar la página que solicitaste, verifica que este bien
          escrita tu petición.
        </h3>
        <Image src={FourImg} alt="milk 404" width={350} height={350} />
        <Link href="/">
          <Button>Regresar al inicio</Button>
        </Link>
      </main>
    </PageLayout>
  );
}
