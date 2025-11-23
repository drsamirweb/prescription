// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  sw: 'sw.js', // your custom service worker
});

const nextConfig = {
  reactStrictMode: true,
  
  // ⚡ Important: fix Turbopack + Webpack conflict
  turbopack: {},

  // ✅ You can add other Next.js options here if needed
};

module.exports = withPWA(nextConfig);
