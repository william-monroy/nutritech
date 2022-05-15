import { createTheme, NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import useDarkMode from "use-dark-mode";

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      orange: "#f55200",
    },
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      orange: "#f55200",
    },
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const darkMode = useDarkMode(false);

  return (
    <SessionProvider session={pageProps.session}>
      <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  );
}

export default MyApp;
