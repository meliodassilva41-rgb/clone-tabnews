import { useEffect, useRef } from "react";

// Fundo do topo: céu de amanhecer com raios de luz e partículas douradas subindo.
export default function CeuAnimado() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const raiz = document.documentElement;
    const semMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cores = {};
    let particulas = [];
    let W = 0;
    let H = 0;
    let ultimo = performance.now();
    let quadro = 0;

    function lerCores() {
      const css = getComputedStyle(raiz);
      cores = {
        topo: css.getPropertyValue("--ceu-topo").trim(),
        base: css.getPropertyValue("--ceu-base").trim(),
        luz: css.getPropertyValue("--luz").trim(),
      };
    }

    function ajustarTamanho() {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const quantidade = Math.round(Math.min(70, W / 16));
      particulas = Array.from({ length: quantidade }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2.2 + 0.6,
        v: Math.random() * 0.25 + 0.08,
        fase: Math.random() * Math.PI * 2,
      }));
    }

    function desenhar(t) {
      const ceu = ctx.createLinearGradient(0, 0, 0, H);
      ceu.addColorStop(0, cores.topo);
      ceu.addColorStop(1, cores.base);
      ctx.fillStyle = ceu;
      ctx.fillRect(0, 0, W, H);

      // Raios de luz vindos de cima, balançando devagar
      ctx.save();
      ctx.translate(W / 2, -H * 0.15);
      ctx.rotate(Math.sin(t / 9000) * 0.06);
      for (let i = 0; i < 9; i++) {
        const angulo = -0.9 + i * 0.225;
        const comprimento = H * 1.4;
        const abertura = 0.07;
        const raio = ctx.createLinearGradient(
          0,
          0,
          Math.sin(angulo) * comprimento,
          Math.cos(angulo) * comprimento,
        );
        raio.addColorStop(
          0,
          `rgba(${cores.luz}, ${0.1 + 0.04 * Math.sin(t / 2500 + i)})`,
        );
        raio.addColorStop(1, `rgba(${cores.luz}, 0)`);
        ctx.fillStyle = raio;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(
          Math.sin(angulo - abertura) * comprimento,
          Math.cos(angulo - abertura) * comprimento,
        );
        ctx.lineTo(
          Math.sin(angulo + abertura) * comprimento,
          Math.cos(angulo + abertura) * comprimento,
        );
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      for (const p of particulas) {
        const brilho = 0.35 + 0.35 * Math.sin(t / 900 + p.fase);
        ctx.fillStyle = `rgba(${cores.luz}, ${brilho})`;
        ctx.beginPath();
        ctx.arc(
          p.x + Math.sin(t / 3000 + p.fase) * 12,
          p.y,
          p.r,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
    }

    function animar(agora) {
      const dt = Math.min(agora - ultimo, 50);
      ultimo = agora;
      for (const p of particulas) {
        p.y -= p.v * dt * 0.06;
        if (p.y < -10) {
          p.y = H + 10;
          p.x = Math.random() * W;
        }
      }
      desenhar(agora);
      quadro = requestAnimationFrame(animar);
    }

    function redesenhar() {
      lerCores();
      if (semMovimento) desenhar(0);
    }

    lerCores();
    ajustarTamanho();
    if (semMovimento) desenhar(0);
    else quadro = requestAnimationFrame(animar);

    const aoRedimensionar = new ResizeObserver(() => {
      ajustarTamanho();
      if (semMovimento) desenhar(0);
    });
    aoRedimensionar.observe(canvas);

    // Quando o tema muda (botão ou sistema), troca as cores do céu
    const aoMudarTema = new MutationObserver(redesenhar);
    aoMudarTema.observe(raiz, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const consulta = matchMedia("(prefers-color-scheme: dark)");
    consulta.addEventListener("change", redesenhar);

    return () => {
      cancelAnimationFrame(quadro);
      aoRedimensionar.disconnect();
      aoMudarTema.disconnect();
      consulta.removeEventListener("change", redesenhar);
    };
  }, []);

  return <canvas ref={canvasRef} className="ceu" aria-hidden="true" />;
}
