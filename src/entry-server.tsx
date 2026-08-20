import { renderToString } from "react-dom/server";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import { StaticRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import Home from "./screens/Home";
import Project from "./screens/Project";
import { theme } from "./theme";
import projectsData from "./content/projects.json";
import type { ProjectSummary } from "./content/types";

const projects = projectsData as ProjectSummary[];

export const SITE_URL = "https://carpiediem.github.io";
const PERSON_NAME = "Ryan SL Carpenter";

interface StructuredData {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  image: string;
  description?: string;
  jobTitle?: string;
  sameAs?: string[];
  author?: { "@type": string; name: string; url: string };
}

export interface Meta {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: "website" | "article";
  structuredData: StructuredData;
}

function absoluteUrl(urlOrPath: string) {
  return urlOrPath.startsWith("http") ? urlOrPath : `${SITE_URL}${urlOrPath}`;
}

// Renders each route eagerly (skipping App.jsx's client-only lazy-loaded
// Project screen) since renderToString can't wait on Suspense/lazy to
// resolve - it just flushes the fallback. That's fine here: this bundle
// is only ever loaded once per prerendered route by scripts/prerender.mjs,
// never shipped to the browser, so there's no bundle-size cost to eagerly
// importing everything.
//
// writeUpContent is passed in as initialContent for Project, since that
// screen loads its write-up text asynchronously (see Project.jsx) -
// renderToString can't wait on that either, so scripts/prerender.mjs reads
// the write-up file directly and hands it to us to render synchronously.
//
// The emotion cache/extraction dance is required for the client's
// hydrateRoot to succeed: without it, emotion inserts <style> tags inline
// in the render tree during SSR, which the client doesn't expect to find
// there (it looks for them in <head>) and treats as a hydration mismatch.
// "css" matches emotion's own default cache key, which MUI's styled()
// uses automatically on the client with no CacheProvider needed there.
export function render(
  url: string,
  { writeUpContent }: { writeUpContent?: string } = {},
) {
  const cache = createCache({ key: "css" });
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  const html = renderToString(
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <StaticRouter location={url}>
          <Switch>
            <Route path="/projects/:id">
              <Project initialContent={writeUpContent} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </StaticRouter>
      </ThemeProvider>
    </CacheProvider>,
  );

  const styleTags = constructStyleTagsFromChunks(extractCriticalToChunks(html));

  return { html, styleTags };
}

export function routes() {
  return ["/", ...projects.map((project) => `/projects/${project.id}`)];
}

export function metaFor(url: string): Meta {
  const canonical = absoluteUrl(url);
  const match = url.match(/^\/projects\/(.+)$/);
  const project = match && projects.find((p) => p.id === match[1]);

  if (!project) {
    return {
      title: PERSON_NAME,
      description: "Personal web site of Ryan SL Carpenter",
      canonical,
      image: absoluteUrl("/img/ryan.jpg"),
      type: "website",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Person",
        name: PERSON_NAME,
        jobTitle: "Software Engineer & Entrepreneur",
        url: canonical,
        image: absoluteUrl("/img/ryan.jpg"),
        sameAs: [
          "https://www.linkedin.com/in/ryanscarpenter/",
          "https://github.com/carpiediem/",
          "https://angel.co/u/ryanslcarpenter",
          "https://stackoverflow.com/users/1811952/carpiediem",
        ],
      },
    };
  }

  return {
    title: `${project.title} - ${PERSON_NAME}`,
    description: project.title,
    canonical,
    image: absoluteUrl(project.img),
    type: "article",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      url: canonical,
      image: absoluteUrl(project.img),
      author: { "@type": "Person", name: PERSON_NAME, url: SITE_URL },
    },
  };
}
