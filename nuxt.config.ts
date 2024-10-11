import process from "node:process";

const sw = process.env.SW === "true";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-10-10",

  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@vite-pwa/nuxt", "@nuxt/image", "@nuxtjs/i18n", "@nuxtjs/seo", "nuxt-time"],

  // App Config
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      link: [{ rel: "icon", href: "/logo.svg", type: "image/svg+xml" }],
    },
  },

  // Env
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  // Nuxt UI
  colorMode: {
    preference: "light",
  },

  // PWA
  pwa: {
    strategies: sw ? "injectManifest" : "generateSW",
    srcDir: sw ? "service-worker" : undefined,
    filename: sw ? "sw.ts" : undefined,
    registerType: "autoUpdate",

    manifest: {
      name: "MSU eCatalog",
      short_name: "eCatalog",
      description: "PT.MSU eCatalog",
      theme_color: "#fbbf24",
      icons: [
        {
          src: "msu-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "msu-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "msu-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
      screenshots: [
        {
          src: "images/screenshots/image1.png",
          sizes: "640x320",
          type: "image/png",
          form_factor: "wide",
          label: "Wonder Widgets",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    injectManifest: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    client: {
      // installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      // periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: false,
      suppressWarnings: true,
      navigateFallback: "/",
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },

  // Image
  image: {},

  // Multilingual support
  i18n: {
    locales: [
      { code: "id_ID", file: "id-ID.json", name: "Indonesia 🇮🇩" },
      { code: "en_US", file: "en-US.json", name: "English 🇺🇸" },
    ],
    langDir: "locales",
    defaultLocale: "id_ID",
    strategy: "no_prefix",
  },
});