// Renders every route to static HTML after the client build, so GitHub
// Pages serves real content (crawlers, no-JS clients, first paint)
// instead of an empty <div id="root">. src/index.jsx hydrates this markup
// in place rather than re-rendering from scratch.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const buildDir = path.join(rootDir, "build");

function escapeHtml(text) {
  return text.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );
}

function seoTagsFor({
  title,
  description,
  canonical,
  image,
  type,
  structuredData,
}) {
  const tags = [
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    // Escape "</" so no field value (e.g. a project title) can prematurely
    // close this script tag.
    `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/<\//g, "<\\/")}</script>`,
  ];
  return tags.join("\n    ");
}

function outputPathFor(url) {
  return url === "/"
    ? path.join(buildDir, "index.html")
    : path.join(buildDir, url.replace(/^\/+/, ""), "index.html");
}

const PLACEHOLDER_CONTENT = "<p>TBD</p>";

// Project.jsx loads its write-up text asynchronously (see that file), which
// renderToString can't wait on - so read the file directly here and hand it
// to entry-server.jsx to render synchronously as the initial content.
async function writeUpContentFor(url) {
  const match = url.match(/^\/projects\/(.+)$/);
  if (!match) return undefined;
  try {
    return await readFile(
      path.join(rootDir, "src", "content", `${match[1]}.html`),
      "utf-8",
    );
  } catch {
    return PLACEHOLDER_CONTENT;
  }
}

const HTML_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

// A plain-text excerpt of a write-up, for use as a meta description -
// falls back to undefined (letting the caller supply its own default) for
// placeholder or empty content, which has nothing worth summarizing.
function descriptionFromWriteUp(html, maxLength = 155) {
  if (!html || html.trim() === PLACEHOLDER_CONTENT) return undefined;

  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&([a-z]+);/gi, (entity, name) => HTML_ENTITIES[name] ?? entity)
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return undefined;
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength + 1);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}…`;
}

function sitemapFor(urls, siteUrl) {
  const entries = urls
    .map((url) => `  <url><loc>${siteUrl}${url}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

async function main() {
  const { render, routes, metaFor, SITE_URL } = await import(
    path.join(rootDir, "build-ssr", "entry-server.js")
  );

  const template = await readFile(path.join(buildDir, "index.html"), "utf-8");

  for (const url of routes()) {
    const writeUpContent = await writeUpContentFor(url);
    const { html: appHtml, styleTags } = render(url, { writeUpContent });
    const meta = metaFor(url);
    const excerpt = descriptionFromWriteUp(writeUpContent);
    if (excerpt) {
      meta.description = excerpt;
      meta.structuredData.description = excerpt;
    }

    // Project.jsx's write-up content loads asynchronously client-side (see
    // that file), which would otherwise start empty on the client's first
    // render - a real hydration mismatch against this prerendered markup,
    // not just a redundant fetch. Embedding it here lets the client's
    // first render match exactly.
    const match = url.match(/^\/projects\/(.+)$/);
    const initialContentScript = match
      ? `<script>window.__INITIAL_CONTENT__=${JSON.stringify({ id: match[1], html: writeUpContent }).replace(/<\//g, "<\\/")}</script>\n    `
      : "";

    const html = template
      .replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>\n    ${initialContentScript}`,
      )
      .replace(/<title>.*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
      .replace(
        /<meta name="description" content="[^"]*" \/>/,
        `<meta name="description" content="${escapeHtml(meta.description)}" />`,
      )
      .replace(
        "</head>",
        `    ${seoTagsFor(meta)}\n    ${styleTags}\n  </head>`,
      );

    const outputPath = outputPathFor(url);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html);
  }

  await writeFile(
    path.join(buildDir, "sitemap.xml"),
    sitemapFor(routes(), SITE_URL),
  );

  console.log(`Prerendered ${routes().length} routes.`);
}

main();
