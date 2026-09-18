import { readdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";

const vite = await createServer({ server: { middlewareMode: true }, appType: "custom" });

try {
  const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");
  const path = new URL("../dist/index.html", import.meta.url);
  const template = await readFile(path, "utf8");
  const assetDirectory = new URL("../dist/assets/", import.meta.url);
  const builtAssets = await readdir(assetDirectory);
  const sourceAssets = ["usucapiao-hero.webp", "reuniao-mvt.webp", "equipe-mvt.webp"];
  let rendered = render();

  for (const sourceAsset of sourceAssets) {
    const stem = sourceAsset.replace(/\.[^.]+$/, "");
    const builtAsset = builtAssets.find((file) => file.startsWith(`${stem}-`));
    if (!builtAsset) throw new Error(`Built asset not found for ${sourceAsset}`);
    rendered = rendered.replaceAll(`/src/assets/${sourceAsset}`, `/assets/${builtAsset}`);
  }

  const html = template.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`);
  await writeFile(path, html);
} finally {
  await vite.close();
}
