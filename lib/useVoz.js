import { useCallback, useEffect, useRef, useState } from "react";

// Vozes femininas em português que costumam soar mais calmas, em ordem de preferência.
const PREFERIDAS = [
  "francisca",
  "luciana",
  "maria",
  "fernanda",
  "google português do brasil",
  "female",
];

function escolherVoz() {
  const vozes = speechSynthesis
    .getVoices()
    .filter((v) => v.lang && v.lang.toLowerCase().startsWith("pt"));
  for (const nome of PREFERIDAS) {
    const v = vozes.find((x) =>
      (x.name + " " + x.lang).toLowerCase().includes(nome),
    );
    if (v) return v;
  }
  return vozes.find((v) => v.lang.toLowerCase() === "pt-br") || vozes[0];
}

function temVoz() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export default function useVoz() {
  const [falandoId, setFalandoId] = useState(null);
  const falandoRef = useRef(null);

  const parar = useCallback(() => {
    if (temVoz()) speechSynthesis.cancel();
    falandoRef.current = null;
    setFalandoId(null);
  }, []);

  // Retorna false quando o navegador não sabe ler em voz alta.
  const falar = useCallback(
    (versiculo, id) => {
      if (!temVoz()) return false;
      if (falandoRef.current === id) {
        parar();
        return true;
      }
      speechSynthesis.cancel();

      const referencia = versiculo.referencia.replace(":", ", versículo ");
      const fala = new SpeechSynthesisUtterance(
        `${versiculo.texto} ... ${referencia}`,
      );
      fala.lang = "pt-BR";
      fala.rate = 0.82; // mais devagar, para soar calmo
      fala.pitch = 1.02;
      const voz = escolherVoz();
      if (voz) fala.voice = voz;
      fala.onend = fala.onerror = () => {
        if (falandoRef.current === id) {
          falandoRef.current = null;
          setFalandoId(null);
        }
      };

      falandoRef.current = id;
      setFalandoId(id);
      speechSynthesis.speak(fala);
      return true;
    },
    [parar],
  );

  useEffect(() => {
    if (!temVoz()) return undefined;
    speechSynthesis.getVoices(); // alguns navegadores carregam as vozes só depois disso
    return () => speechSynthesis.cancel();
  }, []);

  return { falandoId, falar, parar };
}
