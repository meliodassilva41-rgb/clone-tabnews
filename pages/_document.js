import { Html, Head, Main, NextScript } from "next/document";

// Aplica o tema escolhido (claro/escuro) antes da página aparecer, para não piscar.
const scriptTema = `try{var t=localStorage.getItem("pv-tema");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t;}catch(e){}`;

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#a8792b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Palavra Viva" />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
