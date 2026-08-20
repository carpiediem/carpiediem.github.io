import { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import debounce from "lodash/debounce";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LinkIcon from "@mui/icons-material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";

import NavBar from "../components/NavBar";
import projectsData from "../content/projects.json";
import type { ProjectSummary } from "../content/types";

const projects = projectsData as ProjectSummary[];

const writeUps = import.meta.glob<string>("../content/*.html", {
  query: "?raw",
  import: "default",
});

const Root = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "100%",
  paddingTop: 50,
  paddingBottom: 50,
  "& .paper": {
    width: 1200,
    maxWidth: "calc(100% - 80px)",
    padding: 25,
    margin: "auto",
  },
  "& .img": { maxWidth: "100%" },
  "& .title": { fontSize: 30, fontWeight: 700 },
  "& .content": {
    color: "#666",
    "& a": { color: theme.palette.primary.main, textDecoration: "underline" },
  },
}));

interface ProjectProps {
  initialContent?: string;
}

export default function Project({ initialContent }: ProjectProps = {}) {
  const { id } = useParams<{ id: string }>();
  const [scrolled, setScrolled] = useState(false);

  const summary = projects.find((p) => p.id === id);

  const embedded =
    typeof window !== "undefined" && window.__INITIAL_CONTENT__?.id === id
      ? window.__INITIAL_CONTENT__.html
      : undefined;

  const [content, setContent] = useState(initialContent ?? embedded ?? "");

  useEffect(() => {
    // initialContent is only ever passed by the SSR entry (see
    // entry-server.jsx). embedded is scripts/prerender.mjs's client-side
    // copy of the same content, keyed by id, so the client's first render
    // matches what the server sent instead of starting empty - which
    // would otherwise be a real hydration mismatch, not just a redundant
    // fetch. Either way, there's no need to fetch it again client-side for
    // the route the page loaded on.
    if (initialContent !== undefined || embedded !== undefined) {
      delete window.__INITIAL_CONTENT__;
      return;
    }
    let cancelled = false;
    const writeUpKey = `../content/${id}.html`;
    const hasOwnWriteUp = Object.prototype.hasOwnProperty.call(
      writeUps,
      writeUpKey,
    );
    const candidateLoader = hasOwnWriteUp ? writeUps[writeUpKey] : undefined;
    const loadWriteUp =
      typeof candidateLoader === "function"
        ? candidateLoader
        : () => Promise.resolve("<p>TBD</p>");
    // CodeQL flags this as js/unvalidated-dynamic-method-call - a known
    // false positive for import.meta.glob() lookups like this one. writeUps
    // is a closed, build-time-generated object whose values are always glob
    // loader functions, never anything reachable via prototype pollution or
    // otherwise unsafe to invoke; the hasOwnProperty + typeof guards above
    // already rule out calling anything else. This is purely client-side
    // (id is a URL param the same visitor controls in their own tab), so
    // there's no privilege boundary being crossed either.
    loadWriteUp().then((html) => {
      if (!cancelled) setContent(html);
    });
    return () => {
      cancelled = true;
    };
  }, [id, initialContent, embedded]);

  useEffect(() => {
    const listener = debounce(() => {
      setScrolled(window.scrollY > 50);
    }, 100);

    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  });

  if (!summary) return <Redirect to="/" />;

  return (
    <Root>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <NavBar section={scrolled && "not top"} />
      <Paper component="main" id="main-content" className="paper">
        <Grid container spacing={3}>
          <Grid size={{ sm: 6 }}>
            <img alt={summary.title} src={summary.img} className="img" />
            {summary.demo && (
              <IconButton
                aria-label="View live demo"
                component="a"
                href={summary.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkIcon />
              </IconButton>
            )}
            {summary.github && (
              <IconButton
                aria-label="View source on GitHub"
                component="a"
                href={summary.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon />
              </IconButton>
            )}
          </Grid>
          <Grid size={{ sm: 6 }}>
            <Typography variant="h4" component="h1" className="title">
              {summary.title}
            </Typography>
            <section
              dangerouslySetInnerHTML={{ __html: content }}
              className="content"
            />
          </Grid>
        </Grid>
      </Paper>
    </Root>
  );
}
