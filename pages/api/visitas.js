// Contador de visitas guardado num banco Redis (Upstash), que é grátis e se liga pela Vercel.
// POST soma +1 e devolve o total; GET só devolve o total.
// Sem o banco configurado, devolve { visitas: null } e o contador fica escondido no site.
const URL_BANCO =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export default async function visitas(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (!URL_BANCO || !TOKEN) {
    return res.status(200).json({ visitas: null });
  }

  const comando = req.method === "POST" ? "incr" : "get";
  try {
    const resposta = await fetch(`${URL_BANCO}/${comando}/visitas`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const dados = await resposta.json();
    return res.status(200).json({ visitas: Number(dados.result) || 0 });
  } catch {
    return res.status(200).json({ visitas: null });
  }
}
