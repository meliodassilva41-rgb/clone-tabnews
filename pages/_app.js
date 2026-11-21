import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Provedor from "../components/Provedor";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  // Permite instalar o site como app no celular (e abrir mesmo sem internet)
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return (
    <Provedor>
      <Component {...pageProps} />
      <Analytics />
    </Provedor>
  );
}

export default App;
