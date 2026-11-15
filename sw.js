const NASA_HOSTS = [
  'api.nasa.gov',
  'images-api.nasa.gov',
  'images-assets.nasa.gov',
  'epic.gsfc.nasa.gov',
  'trek.nasa.gov',
  'osdr.nasa.gov',
  'visualization.osdr.nasa.gov'
];

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (NASA_HOSTS.some((host) => url.hostname === host || url.hostname.endsWith('.' + host))) {
    event.respondWith(fetch(event.request));
    return;
  }
  event.respondWith(fetch(event.request));
});
