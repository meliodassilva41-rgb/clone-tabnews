import versiculos from "../data/versiculos";

export const SITE = {
  nome: "Palavra Viva",
  url: "https://hallysilva.com.br",
  descricao:
    "Um versículo da Bíblia para cada dia. Versículos de amor, fé, esperança, força e paz, com oração do dia, plano de leitura e uma palavra para o seu momento.",
};

// "Esperança" -> "esperanca", "João 3:16" -> "joao-3-16"
export function slug(texto) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const TEMAS = [...new Set(versiculos.map((v) => v.tema))];

export const DESCRICAO_TEMAS = {
  Amor: "Versículos sobre o amor de Deus e o amor ao próximo.",
  Fé: "Versículos para fortalecer a sua fé e a confiança em Deus.",
  Esperança: "Versículos de esperança para os dias difíceis.",
  Força: "Versículos de força e coragem para seguir em frente.",
  Paz: "Versículos de paz para acalmar o coração ansioso.",
  Sabedoria: "Versículos de sabedoria para guiar as suas decisões.",
  Gratidão: "Versículos de gratidão para agradecer a Deus em tudo.",
};

export function textoParaCompartilhar(v) {
  return `"${v.texto}"\n— ${v.referencia}\n\n${SITE.url.replace("https://", "")}`;
}
