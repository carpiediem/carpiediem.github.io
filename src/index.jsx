import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const container = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// The production build prerenders every route to static HTML (see
// scripts/prerender.mjs), so #root already has real markup there and
// hydrateRoot can adopt it in place instead of clearing and re-rendering
// from scratch - which used to leave a brief window with no <main>/<h1>
// in the DOM while the client took over. In dev, #root starts empty (no
// prerender step), so fall back to a plain client render.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
