import { createTheme, NextUIProvider } from "@nextui-org/react";
import "../styles/globals.css";

const myDarkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {},
    space: {},
    fonts: {},
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider theme={myDarkTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
