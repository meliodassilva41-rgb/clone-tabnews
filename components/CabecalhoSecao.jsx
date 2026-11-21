import { motion } from "motion/react";

// Título de cada seção, que aparece suavemente quando a pessoa rola até ela.
export default function CabecalhoSecao({ rotulo, titulo, texto, nivel = 2 }) {
  const Titulo = `h${nivel}`;
  return (
    <motion.div
      className="sec-cabecalho"
      initial={{ opacity: 0.2, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="rotulo esquerda">{rotulo}</span>
      <Titulo>{titulo}</Titulo>
      {texto && <p>{texto}</p>}
    </motion.div>
  );
}
