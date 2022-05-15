import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/logo.png";
import { signOut, useSession } from "next-auth/react";
import { Button, Text } from "@nextui-org/react";
import SwitchTheme from "./SwitchTheme";

export default function PageLayout({ children, title = "Home | NutriTech" }) {
  const { data: session, status } = useSession();
  if (status === "loading") return null; // si esta cargando no mostrar nada

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="NutriTech" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div>
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo NutriTech"
              width={100}
              height={50}
              onBlur={true}
            />
          </Link>
        </div>
        <div className="navActions">
          {session && (
            <section className="profileData">
              <img
                src={session?.user.image}
                alt={`profile image of ${session?.user.name}`}
              />
              {/* <h5>{session?.user.name}</h5> */}
              <Text h6>{session?.user.name}</Text>
            </section>
          )}
          <SwitchTheme />
          <Button color="error" auto ghost onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
      </header>
      <main>{children}</main>
      <style jsx>
        {`
          header {
            display: flex;
            justify-content: space-between;
            width: 100%;
            align-items: center;
            padding: 1.2rem 2rem;
            height: 80px;
            
          }
          main {
            padding: 40px 80px 0px;
            width: 100%;
            height: auto;
          }

          .navActions {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 20px;
          }

          .profileData {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 12px;
          }

          .profileData > img {
            width: 50px;
            heigth: 50px;
            border-radius: 50%;
          }

          @media (max-width: 768px) {
            .profileData {
              display: none;
            }
        `}
      </style>
    </>
  );
}
