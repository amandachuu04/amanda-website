import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

(function migrateLegacyHashRoutes() {
  const hash = window.location.hash;
  if (hash.startsWith("#/work/") || hash.startsWith("#/projects")) {
    const newPath = hash.slice(1).replace(/\/$/, "") || "/";
    window.history.replaceState({}, "", newPath + window.location.search);
  }
})();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
