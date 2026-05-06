"use strict";

module.exports = [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "*.r2.dev",
            "*.cloudflarestorage.com",
          ],
          "media-src": ["'self'", "data:", "blob:", "*.r2.dev"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      headers: "*",
      origin: [
        // Production Vercel URL — update this to your actual domain
        "https://your-menu.vercel.app",
        // Local development
        "http://localhost:3000",
        "http://127.0.0.1:3000",
      ],
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];