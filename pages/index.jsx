import Seo from "../components/Seo";
import Topo from "../components/Topo";
import VersiculoDoDia from "../components/VersiculoDoDia";
import Sentimentos from "../components/Sentimentos";
import PlanoLeitura from "../components/PlanoLeitura";
import Favoritos from "../components/Favoritos";
import ExplorarVersiculos from "../components/ExplorarVersiculos";
import Rodape from "../components/Rodape";
import { SITE } from "../lib/site";

const dadosEstruturados = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.nome,
  url: SITE.url,
  description: SITE.descricao,
  inLanguage: "pt-BR",
};

function Home() {
  return (
    <>
      <Seo titulo="Palavra Viva | Versículo do dia e versículos da Bíblia por tema" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
      />

      <Topo />
      <main>
        <VersiculoDoDia />
        <Sentimentos />
        <PlanoLeitura />
        <Favoritos />
        <ExplorarVersiculos />
      </main>
      <Rodape />
    </>
  );
}

export default Home;
