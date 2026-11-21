import Link from "next/link";
import { motion } from "motion/react";
import { slug } from "../lib/site";
import BotoesVersiculo from "./BotoesVersiculo";

export default function CartaoVersiculo({ versiculo, mostrarTema = true }) {
  return (
    <motion.article
      layout
      className="cartao"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
    >
      {mostrarTema && (
        <Link className="etiqueta" href={`/versiculos/${slug(versiculo.tema)}`}>
          {versiculo.tema}
        </Link>
      )}
      <p className="citacao">“{versiculo.texto}”</p>
      <div className="cartao-rodape">
        <strong>{versiculo.referencia}</strong>
        <BotoesVersiculo versiculo={versiculo} />
      </div>
    </motion.article>
  );
}
