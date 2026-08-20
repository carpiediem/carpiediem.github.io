export {};

declare global {
  interface Window {
    // Google Analytics with Autotrack, loaded as a global script in
    // index.html - see the comment there.
    ga?: (...args: unknown[]) => void;

    // Set by scripts/prerender.mjs for project routes, so Project's first
    // client render matches what the server sent instead of starting
    // empty - see Project.tsx.
    __INITIAL_CONTENT__?: { id: string; html: string };
  }
}
