/* eslint-disable no-restricted-globals */
import { clientsClaim } from "workbox-core";
import { registerRoute } from "workbox-routing";
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { Queue } from "workbox-background-sync";

clientsClaim();
self.skipWaiting();

// =======================
// 🔥 Background Sync Queue
// =======================
const prescriptionQueue = new Queue("prescriptionQueue", {
  maxRetentionTime: 24 * 60, // retry for 24 hours
});

// Intercept ALL POST requests to /api/*
registerRoute(
  ({ url, request }) =>
    url.pathname.startsWith("/api/") && request.method === "POST",
  async ({ event }) => {
    try {
      return await fetch(event.request);
    } catch (err) {
      // If offline → queue the request
      await prescriptionQueue.pushRequest({ request: event.request });
      return Response.json(
        { queued: true, message: "Saved offline. Will sync later." },
        { status: 202 }
      );
    }
  },
  "POST"
);

// =======================
// 🔥 Cache Static Assets
// =======================
registerRoute(
  ({ request }) => request.destination === "script" || request.destination === "style",
  new StaleWhileRevalidate({
    cacheName: "static-assets",
  })
);

// =======================
// 🔥 Cache Images
// =======================
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// =======================
// 🔥 Pages / fallback caching
// =======================
registerRoute(
  ({ request }) => request.mode === "navigate",
  new NetworkFirst({
    cacheName: "pages-cache",
    networkTimeoutSeconds: 3,
  })
);
