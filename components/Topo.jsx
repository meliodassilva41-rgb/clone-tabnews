import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, animate, motion } from "motion/react";
import Icone from "./Icone";

function ContadorVisitas() {
  const [total, setTotal] = useState(null);
  const numeroRef = useRef(null);

  useEffect(() => {
    // Conta só uma vez por visita (não a cada página aberta)
    let jaContou = false;
    try {
      jaContou = sessionStorage.getItem("pv-visitou") === "1";
      sessionStorage.setItem("pv-visitou", "1");
    } catch {
      // sem sessionStorage: conta normalmente
    }
    fetch("/api/visitas", { method: jaContou ? "GET" : "POST" })
      .then((r) => r.json())
      .then((dados) => {
        if (typeof dados.visitas === "number") setTotal(dados.visitas);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (total === null) return undefined;
    const controle = animate(0, total, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (numeroRef.current) {
          numeroRef.current.textContent = Math.round(v).toLocaleString("pt-BR");
        }
      },
    });
    return () => controle.stop();
  }, [total]);

  // Enquanto o contador não estiver configurado na Vercel, ele simplesmente não aparece.
  if (total === null) return null;

  return (
    <span className="visitas" title="Visitas ao site">
      <Icone nome="olho" />
      <b ref={numeroRef}>0</b> visitas
    </span>
  );
}

function BotaoTema() {
  const [escuro, setEscuro] = useState(false);

  useEffect(() => {
    const consulta = matchMedia("(prefers-color-scheme: dark)");
    const ler = () => {
      const tema = document.documentElement.dataset.theme;
      setEscuro(tema ? tema === "dark" : consulta.matches);
    };
    ler();
    consulta.addEventListener("change", ler);
    return () => consulta.removeEventListener("change", ler);
  }, []);

  function alternar() {
    const novo = escuro ? "light" : "dark";
    document.documentElement.dataset.theme = novo;
    try {
      localStorage.setItem("pv-tema", novo);
    } catch {
      // não conseguiu salvar a preferência; o tema muda só nesta visita
    }
    setEscuro(!escuro);
  }

  return (
    <button
      type="button"
      className="icone-btn"
      onClick={alternar}
      aria-label={escuro ? "Mudar para modo claro" : "Mudar para modo escuro"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={escuro ? "sol" : "lua"}
          className="icone-pulo"
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Icone nome={escuro ? "sol" : "lua"} />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

const LINKS = [
  ["/#hoje", "Hoje"],
  ["/#sentimentos", "Como você está"],
  ["/#plano", "Plano de leitura"],
  ["/#favoritos", "Favoritos"],
  ["/#versiculos", "Versículos"],
];

export default function Topo() {
  return (
    <header className="topo">
      <div className="wrap topo-linha">
        <Link href="/" className="logo">
          <span className="logo-marca" aria-hidden="true">
            ✝
          </span>
          Palavra Viva
        </Link>
        <nav className="links" aria-label="Seções">
          {LINKS.map(([href, nome]) => (
            <Link key={href} href={href}>
              {nome}
            </Link>
          ))}
        </nav>
        <div className="topo-ferramentas">
          <ContadorVisitas />
          <BotaoTema />
        </div>
      </div>
    </header>
  );
}
