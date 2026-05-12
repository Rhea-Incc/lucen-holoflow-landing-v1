import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <SpeedInsights />
    <Analytics />
  </>
);

// Register media cache service worker (production only) for repeat-visit replay
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
