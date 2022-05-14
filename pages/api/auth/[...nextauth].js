import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "#93E4FB", // Hex color code
    logo: "/icon-512x512.png", // Absolute URL to image
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    jwt: true, //Use JWT to manage sessions we aren´t using a DB
    maxAge: 60 * 15, //15 min.
  },
  jwt: {
    secret: process.env.AUTH_JWT_SECRET,
    signingKey: process.env.AUTH_JWT_SIGNING_KEY,
    encryption: true,
    encryptionKey: process.env.AUTH_JWT_ENCRYPTION_KEY,
  },
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "NutriTech",
      credentials: {
        password: {
          label: "Password",
          type: "password",
          placeholder: "****************",
        },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/nutritech`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-type": "application/json" },
          }
        );

        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
    // ...add more providers here
  ],
});
