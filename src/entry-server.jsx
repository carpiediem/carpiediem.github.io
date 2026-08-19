import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import Home from "./screens/Home";
import Project from "./screens/Project";
import { theme } from "./theme";
import projects from "./content/projects.json";

// Renders each route eagerly (skipping App.jsx's client-only lazy-loaded
// Project screen) since renderToString can't wait on Suspense/lazy to
// resolve - it just flushes the fallback. That's fine here: this bundle
// is only ever loaded once per prerendered route by scripts/prerender.mjs,
// never shipped to the browser, so there's no bundle-size cost to eagerly
// importing everything.
export function render(url) {
  return renderToString(
    <ThemeProvider theme={theme}>
      <StaticRouter location={url}>
        <Switch>
          <Route path="/projects/:id">
            <Project />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </StaticRouter>
    </ThemeProvider>,
  );
}

export function routes() {
  return ["/", ...projects.map((project) => `/projects/${project.id}`)];
}

export function metaFor(url) {
  const match = url.match(/^\/projects\/(.+)$/);
  const project = match && projects.find((p) => p.id === match[1]);
  if (!project) {
    return {
      title: "Ryan SL Carpenter",
      description: "Personal web site of Ryan SL Carpenter",
    };
  }
  return {
    title: `${project.title} - Ryan SL Carpenter`,
    description: project.title,
  };
}
