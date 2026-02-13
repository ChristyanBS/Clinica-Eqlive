const CACHE_NAME = 'eqlive-v2';
const RUNTIME = 'eqlive-runtime';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/condicoes/index.html',
  '/condicoes/ansiedade-e-burnout.html',
  '/condicoes/depressao.html',
  '/condicoes/desequilibrio-hormonal.html',
  '/condicoes/desintoxicacao-e-exposicao-ambiental.html',
  '/condicoes/doencas-autoimunes.html',
  '/condicoes/hipotireoidismo.html',
  '/condicoes/longevidade-e-saude.html',
  '/condicoes/menopausa.html',
  '/condicoes/pre-diabetes.html',
  '/condicoes/resistencia-a-insulina.html',
  '/condicoes/saude-intestinal.html',
  '/condicoes/saude-mental-da-mulher.html',
  '/condicoes/saude-mental.html',
  '/condicoes/saude-metabolica.html',
  '/condicoes/sintomas-inexplicaveis.html',
  '/condicoes/sop.html',
  '/condicoes/tireoidite-de-hashimoto.html',
  '/src/css/tailwind.generated.css',
  '/src/css/styles.css',
  '/src/js/navigation.js',
  '/src/js/utils.js',
  '/src/js/nav-include.js',
  '/src/assets/images/banner_logo.png',
  '/src/assets/icons/whatsapp.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME && key !== RUNTIME)
        .map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  const isHTML = event.request.headers.get('accept')?.includes('text/html');
  if (isHTML) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(RUNTIME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('/index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(RUNTIME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
