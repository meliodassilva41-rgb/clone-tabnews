import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import versiculos from "../data/versiculos";
import oracoes from "../data/oracoes";
import { slug } from "../lib/site";
import { useApp } from "./Provedor";
import BotoesVersiculo from "./BotoesVersiculo";
import CeuAnimado from "./CeuAnimado";
import Icone from "./Icone";

const suave = [0.22, 1, 0.36, 1];
const entrada = {
  oculto: { opacity: 0, y: 18, filter: "blur(4px)" },
  visivel: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: suave },
  },
};

// O mesmo versículo durante o dia inteiro; muda à meia-noite.
function indiceDoDia(data) {
  const inicioDoAno = new Date(data.getFullYear(), 0, 0);
  const diaDoAno = Math.floor((data - inicioDoAno) / 86400000);
  return diaDoAno % versiculos.length;
}

export default function VersiculoDoDia() {
  const { voz } = useApp();
  const [indice, setIndice] = useState(null);
  const [hoje, setHoje] = useState("");
  const [oracao, setOracao] = useState("");

  useEffect(() => {
    const agora = new Date();
    setIndice(indiceDoDia(agora));
    setHoje(
      agora.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    );
    setOracao(oracoes[agora.getDay()]);
  }, []);

  function sortearOutro() {
    voz.parar();
    setIndice((atual) => {
      let novo = atual;
      while (novo === atual) {
        novo = Math.floor(Math.random() * versiculos.length);
      }
      return novo;
    });
  }

  const versiculo = indice === null ? null : versiculos[indice];

  return (
    <section className="hero" id="hoje">
      <CeuAnimado />
      <motion.div
        className="wrap hero-conteudo"
        initial="oculto"
        animate="visivel"
        variants={{
          visivel: {
            transition: { staggerChildren: 0.12, delayChildren: 0.1 },
          },
        }}
      >
        <motion.div variants={entrada}>
          <span className="rotulo">Versículo do dia</span>
          <span className="data">{hoje || " "}</span>
        </motion.div>

        <motion.div variants={entrada} className="destaque">
          <AnimatePresence mode="wait">
            {versiculo ? (
              <motion.div
                key={versiculo.referencia}
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: suave }}
              >
                <blockquote className="destaque-texto">
                  {versiculo.texto}
                </blockquote>
                <p className="destaque-ref">
                  {versiculo.referencia}
                  <Link
                    className="etiqueta"
                    href={`/versiculos/${slug(versiculo.tema)}`}
                  >
                    {versiculo.tema}
                  </Link>
                </p>
              </motion.div>
            ) : (
              <motion.blockquote
                key="carregando"
                className="destaque-texto carregando"
                exit={{ opacity: 0 }}
              >
                Carregando a Palavra…
              </motion.blockquote>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={entrada} className="hero-botoes">
          {versiculo && <BotoesVersiculo versiculo={versiculo} grande />}
          <button type="button" className="btn" onClick={sortearOutro}>
            <Icone nome="sortear" />
            Outro versículo
          </button>
        </motion.div>

        <motion.div variants={entrada} className="oracao">
          <h2>Oração do dia</h2>
          <p>{oracao || " "}</p>
          <span className="amem">Amém.</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
