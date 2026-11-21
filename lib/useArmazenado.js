import { useEffect, useState } from "react";

// Igual ao useState, mas guarda o valor no aparelho da pessoa (localStorage).
export default function useArmazenado(chave, valorInicial) {
  const [valor, setValor] = useState(valorInicial);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    try {
      const salvo = localStorage.getItem("pv-" + chave);
      if (salvo) setValor(JSON.parse(salvo));
    } catch {
      // navegador sem acesso ao armazenamento: segue com o valor inicial
    }
    setCarregado(true);
  }, [chave]);

  useEffect(() => {
    if (!carregado) return;
    try {
      localStorage.setItem("pv-" + chave, JSON.stringify(valor));
    } catch {
      // ignora: não dá para salvar neste navegador
    }
  }, [chave, valor, carregado]);

  return [valor, setValor];
}
