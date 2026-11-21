import { AnimatePresence, motion } from "motion/react";
import { useApp } from "./Provedor";
import BotoesVersiculo from "./BotoesVersiculo";
import CabecalhoSecao from "./CabecalhoSecao";

export default function Favoritos() {
  const { favoritos } = useApp();

  return (
    <section className="bloco" id="favoritos">
      <div className="wrap">
        <CabecalhoSecao
          rotulo="Seus favoritos"
          titulo="Versículos que tocaram você"
          texto="Toque no coração em qualquer versículo para guardar aqui."
        />

        {favoritos.length === 0 ? (
          <p className="vazio">
            Nenhum favorito ainda. Toque no coração de um versículo para guardar
            aqui.
          </p>
        ) : (
          <div className="grade">
            <AnimatePresence initial={false}>
              {favoritos.map((v) => (
                <motion.article
                  key={v.referencia}
                  layout
                  className="cartao"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="citacao">“{v.texto}”</p>
                  <div className="cartao-rodape">
                    <strong>{v.referencia}</strong>
                    <BotoesVersiculo versiculo={v} />
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
