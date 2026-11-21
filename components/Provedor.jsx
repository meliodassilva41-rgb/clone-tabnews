import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import useArmazenado from "../lib/useArmazenado";
import useVoz from "../lib/useVoz";
import { textoParaCompartilhar } from "../lib/site";
import ModalImagem from "./ModalImagem";

// Guarda o que várias partes do site usam juntas: favoritos, voz, imagem e avisos.
const Contexto = createContext(null);

export function useApp() {
  return useContext(Contexto);
}

export default function Provedor({ children }) {
  const [favoritos, setFavoritos] = useArmazenado("favoritos", []);
  const voz = useVoz();
  const [imagemDe, setImagemDe] = useState(null);
  const [aviso, setAviso] = useState(null);

  const avisar = useCallback((mensagem) => {
    setAviso({ mensagem, id: Date.now() });
  }, []);

  useEffect(() => {
    if (!aviso) return undefined;
    const t = setTimeout(() => setAviso(null), 2200);
    return () => clearTimeout(t);
  }, [aviso]);

  const ehFavorito = useCallback(
    (v) => favoritos.some((f) => f.referencia === v.referencia),
    [favoritos],
  );

  const alternarFavorito = useCallback(
    (v) => {
      if (ehFavorito(v)) {
        setFavoritos((lista) =>
          lista.filter((f) => f.referencia !== v.referencia),
        );
        avisar("Removido dos favoritos");
      } else {
        setFavoritos((lista) => [
          { texto: v.texto, referencia: v.referencia },
          ...lista,
        ]);
        avisar("Guardado nos favoritos");
      }
    },
    [ehFavorito, setFavoritos, avisar],
  );

  const copiar = useCallback(
    async (v) => {
      try {
        await navigator.clipboard.writeText(textoParaCompartilhar(v));
        avisar("Versículo copiado");
      } catch {
        avisar("Não foi possível copiar");
      }
    },
    [avisar],
  );

  const { parar } = voz;
  const abrirImagem = useCallback(
    (v) => {
      parar();
      setImagemDe(v);
    },
    [parar],
  );
  const fecharImagem = useCallback(() => setImagemDe(null), []);

  const valor = {
    favoritos,
    ehFavorito,
    alternarFavorito,
    voz,
    abrirImagem,
    copiar,
    avisar,
  };

  return (
    <MotionConfig reducedMotion="user">
      <Contexto.Provider value={valor}>
        {children}

        <AnimatePresence>
          {imagemDe && (
            <ModalImagem
              key="modal"
              versiculo={imagemDe}
              aoFechar={fecharImagem}
            />
          )}
        </AnimatePresence>

        <div className="aviso-lugar" aria-live="polite">
          <AnimatePresence>
            {aviso && (
              <motion.div
                key={aviso.id}
                className="aviso"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
              >
                {aviso.mensagem}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Contexto.Provider>
    </MotionConfig>
  );
}
