import { motion } from "motion/react";
import { useApp } from "./Provedor";
import Icone from "./Icone";
import { textoParaCompartilhar } from "../lib/site";

// Ouvir, favoritar, gerar imagem, copiar e mandar no WhatsApp.
// "grande" mostra os botões com texto; senão, só os ícones.
export default function BotoesVersiculo({ versiculo, grande = false }) {
  const { voz, ehFavorito, alternarFavorito, abrirImagem, copiar, avisar } =
    useApp();
  const falando = voz.falandoId === versiculo.referencia;
  const favorito = ehFavorito(versiculo);
  const base = grande ? "btn" : "btn sm";
  const linkWhatsApp =
    "https://wa.me/?text=" +
    encodeURIComponent(textoParaCompartilhar(versiculo));

  function ouvir() {
    if (!voz.falar(versiculo, versiculo.referencia)) {
      avisar("Seu navegador não tem leitura em voz alta");
    }
  }

  return (
    <div className={grande ? "acoes" : "mini-acoes"}>
      <button
        type="button"
        className={`${grande ? "btn primario" : base}${falando ? " ativo" : ""}`}
        onClick={ouvir}
        aria-label={falando ? "Parar leitura" : "Ouvir versículo"}
      >
        <Icone nome={falando ? "parar" : "ouvir"} />
        {grande && <span>{falando ? "Parar" : "Ouvir"}</span>}
        {falando && (
          <span className="onda" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        )}
      </button>

      <button
        type="button"
        className={`${base}${favorito ? " ativo" : ""}`}
        onClick={() => alternarFavorito(versiculo)}
        aria-pressed={favorito}
        aria-label={favorito ? "Remover dos favoritos" : "Favoritar"}
      >
        <motion.span
          key={favorito ? "sim" : "nao"}
          className="icone-pulo"
          initial={{ scale: favorito ? 0.4 : 1 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 12 }}
        >
          <Icone nome="coracao" className={favorito ? "cheio" : ""} />
        </motion.span>
        {grande && <span>{favorito ? "Favoritado" : "Favoritar"}</span>}
      </button>

      <button
        type="button"
        className={base}
        onClick={() => abrirImagem(versiculo)}
        aria-label="Gerar imagem para compartilhar"
      >
        <Icone nome="imagem" />
        {grande && <span>Gerar imagem</span>}
      </button>

      {!grande && (
        <>
          <button
            type="button"
            className={base}
            onClick={() => copiar(versiculo)}
            aria-label="Copiar versículo"
          >
            <Icone nome="copiar" />
          </button>
          <a
            className={base}
            href={linkWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enviar no WhatsApp"
          >
            <Icone nome="mensagem" />
          </a>
        </>
      )}
    </div>
  );
}
