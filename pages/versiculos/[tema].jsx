import Link from "next/link";
import versiculos from "../../data/versiculos";
import { DESCRICAO_TEMAS, TEMAS, slug } from "../../lib/site";
import Seo from "../../components/Seo";
import Topo from "../../components/Topo";
import Rodape from "../../components/Rodape";
import CabecalhoSecao from "../../components/CabecalhoSecao";
import CartaoVersiculo from "../../components/CartaoVersiculo";

// Uma página para cada tema (ex.: /versiculos/paz). Ajuda o site a aparecer no Google
// quando alguém pesquisa "versículos de paz", "versículos de fé" etc.
export default function PaginaTema({ tema }) {
  const lista = versiculos.filter((v) => v.tema === tema);
  const titulo = `Versículos de ${tema}`;
  const descricao = `${DESCRICAO_TEMAS[tema]} ${lista.length} versículos da Bíblia para ler, ouvir e compartilhar.`;

  return (
    <>
      <Seo
        titulo={`${titulo} | Palavra Viva`}
        descricao={descricao}
        caminho={`/versiculos/${slug(tema)}`}
      />
      <Topo />
      <main>
        <section className="bloco pagina-tema">
          <div className="wrap">
            <p className="voltar">
              <Link href="/">← Voltar para o versículo do dia</Link>
            </p>
            <CabecalhoSecao
              rotulo="Versículos por tema"
              titulo={titulo}
              texto={DESCRICAO_TEMAS[tema]}
              nivel={1}
            />
            <div className="grade">
              {lista.map((v) => (
                <CartaoVersiculo
                  key={v.referencia}
                  versiculo={v}
                  mostrarTema={false}
                />
              ))}
            </div>

            <h2 className="outros-titulo">Outros temas</h2>
            <div className="chips">
              {TEMAS.filter((t) => t !== tema).map((t) => (
                <Link key={t} className="chip" href={`/versiculos/${slug(t)}`}>
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Rodape />
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: TEMAS.map((t) => ({ params: { tema: slug(t) } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const tema = TEMAS.find((t) => slug(t) === params.tema);
  return { props: { tema } };
}
