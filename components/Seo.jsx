import Head from "next/head";
import { SITE } from "../lib/site";

// Título, descrição e imagem de prévia (WhatsApp, Facebook, Google...).
export default function Seo({
  titulo,
  descricao = SITE.descricao,
  caminho = "/",
}) {
  const url = SITE.url + caminho;
  const imagem = SITE.url + "/og.jpg";
  return (
    <Head>
      <title>{titulo}</title>
      <meta name="description" content={descricao} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content={SITE.nome} />
      <meta property="og:title" content={titulo} />
      <meta property="og:description" content={descricao} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imagem} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Palavra Viva: um versículo da Bíblia para cada dia"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={titulo} />
      <meta name="twitter:description" content={descricao} />
      <meta name="twitter:image" content={imagem} />
    </Head>
  );
}
