import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useApp } from "./Provedor";
import Icone from "./Icone";
import { gerarImagem, salvarOuCompartilhar } from "../lib/imagemVersiculo";

export default function ModalImagem({ versiculo, aoFechar }) {
  const { avisar } = useApp();
  const [formato, setFormato] = useState("story");
  const [src, setSrc] = useState(null);
  const canvasRef = useRef(null);
  const fecharRef = useRef(null);

  useEffect(() => {
    let ativo = true;
    gerarImagem(versiculo, formato)
      .then((canvas) => {
        if (!ativo) return;
        canvasRef.current = canvas;
        setSrc(canvas.toDataURL("image/png"));
      })
      .catch(() => avisar("Não foi possível gerar a imagem"));
    return () => {
      ativo = false;
    };
  }, [versiculo, formato, avisar]);

  useEffect(() => {
    fecharRef.current?.focus();
    const aoTeclar = (e) => {
      if (e.key === "Escape") aoFechar();
    };
    window.addEventListener("keydown", aoTeclar);
    const overflowAntes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = overflowAntes;
    };
  }, [aoFechar]);

  async function salvar() {
    if (!canvasRef.current) return;
    const resultado = await salvarOuCompartilhar(canvasRef.current, versiculo);
    if (resultado === "baixado") avisar("Imagem salva");
  }

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) aoFechar();
      }}
    >
      <motion.div
        className="modal-caixa"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{
          default: { type: "spring", bounce: 0.3, duration: 0.5 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className="modal-topo">
          <b id="modal-titulo">Imagem para compartilhar</b>
          <button
            ref={fecharRef}
            type="button"
            className="icone-btn"
            onClick={aoFechar}
            aria-label="Fechar"
          >
            <Icone nome="fechar" />
          </button>
        </div>

        <div className="formatos" role="group" aria-label="Formato da imagem">
          {[
            ["story", "Stories / Status"],
            ["post", "Post quadrado"],
          ].map(([valor, nome]) => (
            <button
              key={valor}
              type="button"
              className={`chip${formato === valor ? " ativo" : ""}`}
              aria-pressed={formato === valor}
              onClick={() => setFormato(valor)}
            >
              {nome}
            </button>
          ))}
        </div>

        <div className={`modal-img ${formato}`}>
          {src && (
            <img
              src={src}
              alt={`Imagem do versículo ${versiculo.referencia}`}
            />
          )}
        </div>

        <button type="button" className="btn primario largo" onClick={salvar}>
          <Icone nome="compartilhar" />
          Salvar ou compartilhar
        </button>
      </motion.div>
    </motion.div>
  );
}
