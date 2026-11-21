import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import versiculos from "../data/versiculos";

const TEMAS = ["Todos", ...new Set(versiculos.map((v) => v.tema))];

// Escolhe sempre o mesmo versículo durante o dia inteiro
function indiceDoDia() {
  const hoje = new Date();
  const inicioDoAno = new Date(hoje.getFullYear(), 0, 0);
  const diaDoAno = Math.floor((hoje - inicioDoAno) / 86400000);
  return diaDoAno % versiculos.length;
}

function textoParaCompartilhar(v) {
  return `"${v.texto}"\n— ${v.referencia}`;
}

function BotoesDeAcao({ versiculo, grande }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(textoParaCompartilhar(versiculo));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    } catch {
      setCopiado(false);
    }
  }

  const linkWhatsApp =
    "https://wa.me/?text=" +
    encodeURIComponent(textoParaCompartilhar(versiculo));

  return (
    <div className={grande ? "acoes acoes-grandes" : "acoes"}>
      <button type="button" className="botao-secundario" onClick={copiar}>
        {copiado ? "✓ Copiado" : "Copiar"}
      </button>
      <a
        className="botao-secundario"
        href={linkWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
      >
        Compartilhar
      </a>
    </div>
  );
}

function Home() {
  const [indiceDestaque, setIndiceDestaque] = useState(null);
  const [animando, setAnimando] = useState(false);
  const [tema, setTema] = useState("Todos");
  const [busca, setBusca] = useState("");

  useEffect(() => {
    setIndiceDestaque(indiceDoDia());
  }, []);

  function sortearOutro() {
    setAnimando(true);
    setTimeout(() => {
      setIndiceDestaque((atual) => {
        let novo = atual;
        while (novo === atual) {
          novo = Math.floor(Math.random() * versiculos.length);
        }
        return novo;
      });
      setAnimando(false);
    }, 250);
  }

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return versiculos.filter((v) => {
      const temaOk = tema === "Todos" || v.tema === tema;
      const buscaOk =
        !termo ||
        v.texto.toLowerCase().includes(termo) ||
        v.referencia.toLowerCase().includes(termo);
      return temaOk && buscaOk;
    });
  }, [tema, busca]);

  const destaque = indiceDestaque === null ? null : versiculos[indiceDestaque];

  return (
    <>
      <Head>
        <title>Palavra Viva — Versículos da Bíblia</title>
        <meta
          name="description"
          content="Um versículo da Bíblia para cada dia. Encontre palavras de amor, fé, esperança, força e paz."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="topo">
        <span className="logo">✝ Palavra Viva</span>
        <a href="#versiculos" className="link-topo">
          Explorar versículos
        </a>
      </header>

      <main>
        <section className="hero">
          <p className="rotulo">Versículo do dia</p>

          <div className={animando ? "destaque saindo" : "destaque"}>
            {destaque ? (
              <>
                <blockquote className="destaque-texto">
                  {destaque.texto}
                </blockquote>
                <p className="destaque-ref">
                  {destaque.referencia}
                  <span className="etiqueta">{destaque.tema}</span>
                </p>
              </>
            ) : (
              <blockquote className="destaque-texto carregando">
                Carregando a Palavra…
              </blockquote>
            )}
          </div>

          <div className="hero-botoes">
            <button
              type="button"
              className="botao-principal"
              onClick={sortearOutro}
            >
              ↻ Outro versículo
            </button>
            {destaque && <BotoesDeAcao versiculo={destaque} grande />}
          </div>
        </section>

        <section id="versiculos" className="secao">
          <div className="secao-cabecalho">
            <h2>Encontre uma palavra para o seu momento</h2>
            <p>
              {versiculos.length} versículos selecionados, organizados por tema.
            </p>
          </div>

          <div className="filtros">
            <input
              type="search"
              className="busca"
              placeholder="Buscar por palavra ou livro (ex.: paz, Salmos)"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              aria-label="Buscar versículos"
            />
            <div className="temas" role="group" aria-label="Filtrar por tema">
              {TEMAS.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={t === tema ? "chip ativo" : "chip"}
                  onClick={() => setTema(t)}
                  aria-pressed={t === tema}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {filtrados.length === 0 ? (
            <p className="vazio">
              Nenhum versículo encontrado. Tente outra palavra.
            </p>
          ) : (
            <div className="grade">
              {filtrados.map((v) => (
                <article key={v.referencia} className="cartao">
                  <span className="etiqueta">{v.tema}</span>
                  <p className="cartao-texto">“{v.texto}”</p>
                  <div className="cartao-rodape">
                    <strong>{v.referencia}</strong>
                    <BotoesDeAcao versiculo={v} />
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="rodape">
        <p>
          “Lâmpada para os meus pés é tua palavra e luz, para o meu caminho.”
        </p>
        <p className="rodape-ref">Salmos 119:105</p>
        <p className="rodape-info">
          Textos da tradução João Ferreira de Almeida.
        </p>
      </footer>
    </>
  );
}

export default Home;
