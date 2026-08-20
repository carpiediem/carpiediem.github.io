import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Typography from "@mui/material/Typography";
import ZoomIcon from "@mui/icons-material/ZoomIn";
import LinkIcon from "@mui/icons-material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";

// import Skill from './Skill';
import projectsData from "../content/projects.json";
import type { ProjectSummary } from "../content/types";

const projects = projectsData as ProjectSummary[];

const Root = styled("section")(({ theme }) => ({
  maxWidth: 960,
  padding: "0 15px",
  margin: "auto",
  marginBottom: 100,
  "& .h2": {
    color: "rgb(61, 68, 81)",
    fontSize: "1.88rem",
    fontWeight: 600,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
    "& a": {
      paddingTop: 50,
      textDecoration: "none",
      color: "inherit",
      outline: "none",
    },
  },
  "& .gridList": {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    overflowY: "hidden",
  },
  "& .tile": {
    "& .MuiImageListItemBar-titleWrap": {
      marginTop: 175,
      transition: "all 0.25s ease-out",
    },
    "&:hover .MuiImageListItemBar-titleWrap": {
      marginTop: 0,
    },
  },
  "& .tileBar": {
    transform: "translate(0, 55px)",
    background:
      "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.65) 100%)",
    height: "75%",
    bottom: 55,
    fontSize: 13,
    fontWeight: 400,
    "& h3": {
      color: "white",
      fontSize: 18,
      fontWeight: 600,
      textTransform: "uppercase",
    },
    "& div.tags span": {
      color: "rgba(255, 255, 255, 0.5)",
      textTransform: "uppercase",
    },
    "& div.actions": {
      marginTop: 20,
      "& a.MuiButton-root": {
        padding: 10,
        margin: "0 5px",
        color: theme.palette.primary.light,
        borderColor: "white",
        "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.25)" },
        "& svg": { fontSize: "1.8rem" },
      },
    },
  },
  "& .icon": {
    color: "white",
  },
}));

const Portfolio = forwardRef<HTMLElement>((_props, ref) => {
  const scrollUp = () => window.scrollTo(0, 0);

  return (
    <Root ref={ref} data-testid="Portfolio" aria-labelledby="portfolio-heading">
      <Typography
        variant="h4"
        component="h2"
        id="portfolio-heading"
        className="h2"
      >
        <a id="portfolio" href="#portfolio">
          Portfolio
        </a>
      </Typography>
      <ImageList rowHeight={300} gap={15} cols={2} className="gridList">
        {projects.map((tile) => (
          <ImageListItem
            key={tile.img}
            cols={tile.featured ? 2 : 1}
            rows={tile.featured ? 2 : 1}
            className="tile"
            // component={Link}
            // to={`/projects/${tile.id}`}
            // onClick={scrollUp}
          >
            <img src={tile.img} alt={tile.title} />
            <ImageListItemBar
              title={
                <React.Fragment>
                  <h3>{tile.title}</h3>
                  <div className="tags">
                    {tile.tags && tile.tags.length ? (
                      tile.tags.sort().map((tag, i) => (
                        <span key={tag}>
                          {i ? ", " : ""}
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </div>
                  <div className="actions">
                    <Button
                      variant="outlined"
                      component={Link}
                      to={`/projects/${tile.id}`}
                      onClick={scrollUp}
                      aria-label={`View details for ${tile.title}`}
                    >
                      <ZoomIcon />
                    </Button>
                    {tile.demo && (
                      <Button
                        variant="outlined"
                        component="a"
                        href={tile.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View live demo of ${tile.title}`}
                      >
                        <LinkIcon />
                      </Button>
                    )}
                    {tile.github && (
                      <Button
                        variant="outlined"
                        component="a"
                        href={tile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View source for ${tile.title} on GitHub`}
                      >
                        <GitHubIcon />
                      </Button>
                    )}
                  </div>
                </React.Fragment>
              }
              className="tileBar"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Root>
  );
});
Portfolio.displayName = "Portfolio";

export default Portfolio;
