import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import versiculos from "../data/versiculos";
import { TEMAS, slug } from "../lib/site";
import CabecalhoSecao from "./CabecalhoSecao";
import CartaoVersiculo from "./CartaoVersiculo";

export default function ExplorarVersiculos() {
  const [tema, setTema] = useState("Todos");
  const [busca, setBusca] = useState("");

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

  return (
    <section className="bloco" id="versiculos">
      <div className="wrap">
        <CabecalhoSecao
          rotulo="Todos os versículos"
          titulo="Encontre uma palavra para o seu momento"
          texto={`${versiculos.length} versículos selecionados, organizados por tema.`}
        />

        <div className="filtros">
          <input
            id="busca"
            type="search"
            className="busca"
            placeholder="Buscar por palavra ou livro (ex.: paz, Salmos)"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            aria-label="Buscar versículos"
          />
          <div className="chips" role="group" aria-label="Filtrar por tema">
            {["Todos", ...TEMAS].map((t) => (
              <button
                key={t}
                type="button"
                className={`chip${t === tema ? " ativo" : ""}`}
                aria-pressed={t === tema}
                onClick={() => setTema(t)}
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
            <AnimatePresence initial={false} mode="popLayout">
              {filtrados.map((v) => (
                <CartaoVersiculo key={v.referencia} versiculo={v} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {tema !== "Todos" && (
          <p className="ver-tema">
            <Link href={`/versiculos/${slug(tema)}`}>
              Ver a página de versículos de {tema.toLowerCase()} →
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
