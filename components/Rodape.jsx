import Link from "next/link";
import { TEMAS, slug } from "../lib/site";

export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="wrap">
        <p className="rodape-citacao">
          “Lâmpada para os meus pés é tua palavra e luz, para o meu caminho.”
        </p>
        <p className="rodape-ref">Salmos 119:105</p>
        <nav className="rodape-temas" aria-label="Versículos por tema">
          {TEMAS.map((t) => (
            <Link key={t} href={`/versiculos/${slug(t)}`}>
              Versículos de {t.toLowerCase()}
            </Link>
          ))}
        </nav>
        <p className="rodape-info">
          Palavra Viva · hallysilva.com.br · Textos da tradução João Ferreira de
          Almeida
        </p>
      </div>
    </footer>
  );
}
