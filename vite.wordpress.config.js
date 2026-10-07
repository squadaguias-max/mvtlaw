import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

function scopeWordPressCss() {
  return {
    postcssPlugin: "scope-mvt-law-landing",
    Rule(rule) {
      if (rule.parent?.type === "atrule" && /keyframes$/i.test(rule.parent.name)) return;

      const scopedSelectors = [];

      for (const rawSelector of rule.selectors ?? []) {
        const selector = rawSelector.trim();

        if (selector === ":root" || selector === "html" || selector === ":host") {
          scopedSelectors.push("#root");
        } else if (selector === "body") {
          scopedSelectors.push("body.mvt-law-landing-page");
        } else if (selector === "*") {
          scopedSelectors.push("#root", "#root *");
        } else if (selector === "::before" || selector === "::after") {
          scopedSelectors.push(`#root${selector}`, `#root *${selector}`);
        } else if (selector.startsWith("#root") || selector.startsWith("body.mvt-law-landing-page")) {
          scopedSelectors.push(selector);
        } else {
          scopedSelectors.push(`#root ${selector}`);
        }
      }

      rule.selectors = [...new Set(scopedSelectors)];
    },
  };
}

export default defineConfig({
  base: "./",
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer(), scopeWordPressCss()],
    },
  },
  build: {
    outDir: "wordpress-plugin/mvt-law-landing/build",
    emptyOutDir: true,
    copyPublicDir: false,
    manifest: "manifest.json",
    rollupOptions: {
      input: "src/main.jsx",
    },
  },
});
