import { Grid, Row, Spacer, Text } from "@nextui-org/react";
import React from "react";
import PageLayout from "../../components/PageLayout";
import { getSession, useSession } from "next-auth/react";

export default function Receta({id}) {
  const { data, status } = useSession();
  if (status === "loading") return null; // si esta cargando no mostrar nada
 
  
  return (
    <PageLayout>
      <h1>Hola {id}</h1>
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

  console.log("prueba receta:",session);
  return {
    props: { session, id: context.params.id },
  };
}
