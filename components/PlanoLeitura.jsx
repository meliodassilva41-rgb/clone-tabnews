import { motion } from "motion/react";
import plano from "../data/plano";
import useArmazenado from "../lib/useArmazenado";
import { useApp } from "./Provedor";
import CabecalhoSecao from "./CabecalhoSecao";

export default function PlanoLeitura() {
  const { avisar } = useApp();
  const [lidos, setLidos] = useArmazenado("plano-joao", []);
  const total = plano.dias.length;
  const porcentagem = (lidos.length / total) * 100;

  function alternar(dia) {
    const novos = lidos.includes(dia)
      ? lidos.filter((d) => d !== dia)
      : [...lidos, dia];
    setLidos(novos);
    if (novos.length === total && !lidos.includes(dia)) {
      avisar("Parabéns! Você leu o Evangelho de João inteiro");
    }
  }

  return (
    <section className="bloco" id="plano">
      <div className="wrap">
        <CabecalhoSecao
          rotulo="Plano de leitura"
          titulo={plano.titulo}
          texto="Um capítulo por dia. Toque no dia para marcar como lido. Seu progresso fica salvo neste aparelho."
        />

        <div className="plano-topo">
          <div className="progresso" aria-hidden="true">
            <motion.span
              initial={false}
              animate={{ width: `${porcentagem}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <span className="plano-contagem">
            {lidos.length} de {total} dias
          </span>
        </div>

        <div className="dias">
          {plano.dias.map((titulo, i) => {
            const dia = i + 1;
            const lido = lidos.includes(dia);
            return (
              <div key={dia} className={`dia${lido ? " lido" : ""}`}>
                <button
                  type="button"
                  className="dia-marcar"
                  onClick={() => alternar(dia)}
                  aria-pressed={lido}
                  aria-label={`${plano.livro} ${dia}: ${lido ? "lido" : "marcar como lido"}`}
                >
                  <motion.span
                    key={lido ? "sim" : "nao"}
                    className="n"
                    initial={{ scale: lido ? 0.6 : 1 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 14 }}
                  >
                    {lido ? "✓" : dia}
                  </motion.span>
                  <span className="t">
                    <b>
                      {plano.livro} {dia}
                    </b>
                    <small>{titulo}</small>
                  </span>
                </button>
                <a
                  className="ler"
                  href={`https://www.bibliaonline.com.br/acf/jo/${dia}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ler
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
