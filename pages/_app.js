import { createTheme, NextUIProvider } from "@nextui-org/react";
import "../styles/globals.css";
import useDarkMode from "use-dark-mode";

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {},
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {},
  },
});

function MyApp({ Component, pageProps }) {

  const darkMode = useDarkMode(false);
  
  return (
    <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;