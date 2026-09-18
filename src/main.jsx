import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { applyBrand } from "./core/theme/applyBrand";
import { appConfig } from "./config/app.config";
import { projectData } from "./config/project.data";
import "./styles/index.css";

applyBrand({
  ...appConfig.brand,
  colors: {
    ...appConfig.brand.colors,
    primary: projectData.theme.primary,
    primaryStrong: projectData.theme.primaryDark,
    accent: projectData.theme.accent,
    surface: projectData.theme.surface,
    background: projectData.theme.surface,
    text: projectData.theme.ink,
  },
});

const root = document.getElementById("root");
const app = <StrictMode><App /></StrictMode>;

if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
