import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import sentimentos from "../data/sentimentos";
import BotoesVersiculo from "./BotoesVersiculo";
import CabecalhoSecao from "./CabecalhoSecao";

export default function Sentimentos() {
  const [escolhido, setEscolhido] = useState(sentimentos[1]);

  return (
    <section className="bloco" id="sentimentos">
      <div className="wrap">
        <CabecalhoSecao
          rotulo="Para o seu momento"
          titulo="Como você está se sentindo hoje?"
          texto="Escolha o que está no seu coração e receba uma palavra para agora."
        />

        <div className="chips" role="group" aria-label="Sentimentos">
          {sentimentos.map((s) => (
            <motion.button
              key={s.nome}
              type="button"
              className={`chip${s === escolhido ? " ativo" : ""}`}
              aria-pressed={s === escolhido}
              whileTap={{ scale: 0.92 }}
              onClick={() => setEscolhido(s)}
            >
              {s.nome}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={escolhido.nome}
            className="resposta"
            initial="oculto"
            animate="visivel"
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            variants={{ visivel: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div
              className="cartao"
              variants={{
                oculto: { opacity: 0, y: 14 },
                visivel: { opacity: 1, y: 0 },
              }}
            >
              <p className="citacao">“{escolhido.texto}”</p>
              <p className="ref">{escolhido.referencia}</p>
              <BotoesVersiculo versiculo={escolhido} />
            </motion.div>
            <motion.div
              className="cartao carinho"
              variants={{
                oculto: { opacity: 0, y: 14 },
                visivel: { opacity: 1, y: 0 },
              }}
            >
              <h3>Uma palavra de carinho</h3>
              <p>{escolhido.carinho}</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
