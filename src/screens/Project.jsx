import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import debounce from "lodash/debounce";
import { styled } from "@mui/material/styles";
// import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LinkIcon from "@mui/icons-material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";

import NavBar from "../components/NavBar";
import projects from "../content/projects.json";

const writeUps = import.meta.glob("../content/*.html", {
  query: "?raw",
  import: "default",
});

const Root = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "calc(100vh - 50px)",
  paddingTop: 50,
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
    "& a": { color: theme.palette.primary.light, textDecoration: "none" },
  },
}));

export default function Project() {
  const { id } = useParams();
  const [scrolled, setScrolled] = useState(false);

  const summary = projects.find((p) => p.id === id);

  const [content, setContent] = useState("");

  useEffect(() => {
    let cancelled = false;
    const loadWriteUp =
      writeUps[`../content/${id}.html`] ??
      (() => Promise.resolve("<p>TBD</p>"));
    loadWriteUp().then((html) => {
      if (!cancelled) setContent(html);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

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
      <NavBar section={scrolled && "not top"} />
      <Paper className="paper">
        <Grid container spacing={3}>
          <Grid size={{ sm: 6 }}>
            <img alt={summary.title} src={summary.img} className="img" />
            {summary.demo && (
              <IconButton
                aria-label="view"
                component="a"
                href={summary.demo}
                target="_blank"
              >
                <LinkIcon />
              </IconButton>
            )}
            {summary.github && (
              <IconButton
                aria-label="view"
                component="a"
                href={summary.github}
                target="_blank"
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
