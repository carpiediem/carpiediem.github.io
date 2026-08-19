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
    return "<p>TBD</p>";
  }
}

async function main() {
  const { render, routes, metaFor } = await import(
    path.join(rootDir, "build-ssr", "entry-server.js")
  );

  const template = await readFile(path.join(buildDir, "index.html"), "utf-8");

  for (const url of routes()) {
    const writeUpContent = await writeUpContentFor(url);
    const appHtml = render(url, { writeUpContent });
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
