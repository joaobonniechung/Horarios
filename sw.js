// Guarda a app no telemóvel para funcionar 100% offline.
// Se alterares o horário, muda o número da versão abaixo para o telemóvel atualizar.
const VERSAO = "horarios-v7";
const FICHEIROS = ["./", "./index.html", "./manifest.webmanifest", "./apple-touch-icon.png", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSAO).then(c => c.addAll(FICHEIROS))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  if (e.request.url.indexOf("mensagem.json") >= 0) return;   // a mensagem vai sempre à net (nunca da cache)
  e.respondWith(caches.match(e.request, {ignoreSearch:true}).then(r => r || fetch(e.request)));
});
