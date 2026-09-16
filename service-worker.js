const CACHE = 'yht-pwa-v4';

const STATIC_FILES = [
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(STATIC_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE)
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // 다른 사이트(Google Apps Script 등)는 건드리지 않음
  if (url.origin !== self.location.origin) {
    return;
  }

  // 메인 화면(index)은 항상 최신 버전을 인터넷에서 가져옴
  if (
    url.pathname === '/' ||
    url.pathname.endsWith('/index.html')
  ) {
    event.respondWith(fetch(request));
    return;
  }

  // 아이콘/manifest 등 정적 파일만 캐시 사용
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) {
        return cached;
      }

      return fetch(request).then(response => {
        if (!response || response.status !== 200) {
          return response;
        }

        const copy = response.clone();

        caches.open(CACHE).then(cache => {
          cache.put(request, copy);
        });

        return response;
      });
    })
  );
});
