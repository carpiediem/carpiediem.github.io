var e=`<p>
  Spoiler Maps is a tool for building interactive maps that summarize a book or
  a TV series without spoiling it. Every marker, path, and note on the map is
  tied to a specific point in the story, so a viewer sets a slider for how much
  they've read or watched and only sees content up to that point.
</p>
<p>
  It's the spiritual successor to a
  <a
    href="https://carpiediem.github.io/game-of-thrones-map/"
    target="_blank"
    rel="noopener noreferrer"
    >Game of Thrones map</a
  >
  I built in 2013, which went
  <a
    href="https://www.theguardian.com/tv-and-radio/tvandradioblog/2014/apr/15/game-of-thrones-interactive-map-google"
    target="_blank"
    rel="noopener noreferrer"
    >a bit viral</a
  >
  but became tedious to maintain&mdash;every update meant hand-editing a pile of
  JSON. Spoiler Maps generalizes that idea into a real editor. Stories are
  stored in a browser-side SQLite database (via
  <a href="https://sql.js.org/" target="_blank" rel="noopener noreferrer"
    >sql.js</a
  >
  and IndexedDB) and can be exported to or imported from a human-editable YAML
  file. This lets anyone build and share a spoiler-safe map for their own
  favorite story.
</p>
<p>
  The map was built with
  <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React</a
  >, TypeScript, and
  <a
    href="https://react-leaflet.js.org/"
    target="_blank"
    rel="noopener noreferrer"
    >react-leaflet</a
  >, with a full CI pipeline: type-checking, linting, tests with coverage,
  CodeQL scanning, and an automated accessibility scan of the deployed site.
</p>
`;export{e as default};