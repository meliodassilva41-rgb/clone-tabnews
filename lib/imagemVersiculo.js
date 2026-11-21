import { slug, SITE } from "./site";

const FORMATOS = {
  story: { largura: 1080, altura: 1920, fonte: 84 },
  post: { largura: 1080, altura: 1080, fonte: 64 },
};

function quebrarLinhas(ctx, texto, larguraMax) {
  const palavras = texto.split(" ");
  const linhas = [];
  let linha = "";
  for (const palavra of palavras) {
    const teste = linha ? linha + " " + palavra : palavra;
    if (ctx.measureText(teste).width > larguraMax && linha) {
      linhas.push(linha);
      linha = palavra;
    } else {
      linha = teste;
    }
  }
  if (linha) linhas.push(linha);
  return linhas;
}

// Desenha o versículo numa imagem bonita, pronta para stories ou post.
export async function gerarImagem(versiculo, formato = "story") {
  const { largura: W, altura: H, fonte } = FORMATOS[formato];
  const serif = (tam) =>
    `italic 500 ${tam}px "EB Garamond", Georgia, serif`;

  if (document.fonts) {
    await Promise.all([
      document.fonts.load(serif(fonte)),
      document.fonts.load('600 30px "Inter"'),
    ]).catch(() => {});
  }

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Céu do amanhecer
  const fundo = ctx.createLinearGradient(0, 0, W * 0.4, H);
  fundo.addColorStop(0, "#2a2f4a");
  fundo.addColorStop(0.55, "#5a4a52");
  fundo.addColorStop(1, "#c98f4f");
  ctx.fillStyle = fundo;
  ctx.fillRect(0, 0, W, H);

  const luz = ctx.createRadialGradient(
    W / 2,
    H * 0.92,
    10,
    W / 2,
    H * 0.92,
    H * 0.6,
  );
  luz.addColorStop(0, "rgba(255,214,150,0.55)");
  luz.addColorStop(1, "rgba(255,214,150,0)");
  ctx.fillStyle = luz;
  ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < 70; i++) {
    ctx.fillStyle = `rgba(255,236,200,${Math.random() * 0.5})`;
    ctx.beginPath();
    ctx.arc(
      Math.random() * W,
      Math.random() * H,
      Math.random() * 3 + 0.5,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  // Texto do versículo, diminuindo a letra se for muito longo
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff6e6";
  let tamanho = fonte;
  ctx.font = serif(tamanho);
  let linhas = quebrarLinhas(ctx, `“${versiculo.texto}”`, W - 200);
  while (linhas.length * tamanho * 1.3 > H * 0.55 && tamanho > 40) {
    tamanho -= 4;
    ctx.font = serif(tamanho);
    linhas = quebrarLinhas(ctx, `“${versiculo.texto}”`, W - 200);
  }
  const alturaLinha = tamanho * 1.3;
  const alturaBloco = linhas.length * alturaLinha;
  const topo = H / 2 - alturaBloco / 2;
  linhas.forEach((l, i) =>
    ctx.fillText(l, W / 2, topo + i * alturaLinha + tamanho),
  );

  ctx.font = `600 ${Math.round(tamanho * 0.5)}px Inter, system-ui, sans-serif`;
  ctx.fillStyle = "#f1c27a";
  ctx.fillText(
    versiculo.referencia.toUpperCase(),
    W / 2,
    topo + alturaBloco + tamanho * 1.1,
  );

  ctx.font = "500 30px Inter, system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,246,230,0.75)";
  ctx.fillText(
    `✝  ${SITE.nome} · ${SITE.url.replace("https://", "")}`,
    W / 2,
    H - (formato === "story" ? 140 : 70),
  );

  return canvas;
}

// No celular abre o menu de compartilhar (WhatsApp, Instagram...); no computador baixa a imagem.
export async function salvarOuCompartilhar(canvas, versiculo) {
  const blob = await new Promise((ok) => canvas.toBlob(ok, "image/png"));
  const nome = `versiculo-${slug(versiculo.referencia)}.png`;
  const arquivo = new File([blob], nome, { type: "image/png" });

  if (navigator.canShare && navigator.canShare({ files: [arquivo] })) {
    try {
      await navigator.share({ files: [arquivo], text: versiculo.referencia });
      return "compartilhado";
    } catch (erro) {
      if (erro.name === "AbortError") return "cancelado";
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nome;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return "baixado";
}
