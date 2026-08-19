// Renders every route to static HTML after the client build, so GitHub
// Pages serves real content (crawlers, no-JS clients, first paint)
// instead of an empty <div id="root">. The client bundle still boots
// and takes over normally once it loads - see src/entry-server.jsx for
// why this doesn't attempt real hydration.
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

function outputPathFor(url) {
  return url === "/"
    ? path.join(buildDir, "index.html")
    : path.join(buildDir, url.replace(/^\/+/, ""), "index.html");
}

async function main() {
  const { render, routes, metaFor } = await import(
    path.join(rootDir, "build-ssr", "entry-server.js")
  );

  const template = await readFile(path.join(buildDir, "index.html"), "utf-8");

  for (const url of routes()) {
    const appHtml = render(url);
    const { title, description } = metaFor(url);

    const html = template
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
      .replace(/<title>.*<\/title>/, `<title>${escapeHtml(title)}</title>`)
      .replace(
        /<meta name="description" content="[^"]*" \/>/,
        `<meta name="description" content="${escapeHtml(description)}" />`,
      );

    const outputPath = outputPathFor(url);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html);
  }

  console.log(`Prerendered ${routes().length} routes.`);
}

main();
