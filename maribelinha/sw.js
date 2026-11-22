// Guarda o jogo no celular para funcionar sem internet. Mude a versão para forçar atualização.
const CACHE = "maribelinha-v1";
const FILES = ["/", "/index.html", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png", "/icons/icon-180.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url), isPage = req.mode === "navigate";
  // a página tenta a internet primeiro (para pegar as novidades) e usa a cópia guardada se estiver sem internet
  if (isPage) { e.respondWith(fetch(req).then((r) => { const c = r.clone(); caches.open(CACHE).then((k) => k.put("/", c)); return r; }).catch(() => caches.match("/"))); return; }
  // o resto (ícones e as letras do Google Fonts) vem da cópia guardada quando existir
  if (url.origin === location.origin || url.hostname.endsWith("gstatic.com") || url.hostname.endsWith("googleapis.com")) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => { if (r.ok || r.type === "opaque") { const c = r.clone(); caches.open(CACHE).then((k) => k.put(req, c)); } return r; })));
  }
});
