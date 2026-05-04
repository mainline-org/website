import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = process.env.SITE_URL || "https://mainline.sh";

export default defineConfig({
  site,
  redirects: {
    "/comparisons/mainline-vs-rag/": "/compare/rag/",
    "/comparisons/mainline-vs-session-memory/": "/compare/session-memory/",
    "/zh/comparisons/mainline-vs-rag/": "/zh/compare/rag/",
    "/zh/comparisons/mainline-vs-session-memory/": "/zh/compare/session-memory/",
    "/es/comparisons/mainline-vs-rag/": "/es/compare/rag/",
    "/es/comparisons/mainline-vs-session-memory/": "/es/compare/session-memory/",
  },
  integrations: [
    sitemap({
      filter: (page) => !new URL(page).pathname.includes("/comparisons/"),
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          zh: "zh-CN",
          es: "es",
        },
      },
    }),
  ],
});
