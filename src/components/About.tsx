import { forwardRef } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Tooltip, { type TooltipProps } from "@mui/material/Tooltip";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

import Introduction from "./Introduction";

function ColorTooltip(props: TooltipProps) {
  return (
    <Tooltip
      {...props}
      slotProps={{
        tooltip: {
          sx: (theme) => ({
            backgroundColor: theme.palette.primary.light,
            color: "rgba(0, 0, 0, 0.87)",
            boxShadow: theme.shadows[1],
            fontSize: 11,
            marginTop: 0,
          }),
        },
        arrow: {
          sx: (theme) => ({ color: theme.palette.primary.light }),
        },
      }}
    />
  );
}

const Root = styled("div")(({ theme }) => ({
  "& .root": {
    maxWidth: 960,
    padding: "0 15px",
    margin: "auto",
  },
  "& .background": {
    backgroundSize: "cover",
    backgroundColor: "#242832",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: "url(img/background.jpg)",
    filter: "brightness(30%)",
    minHeight: 515,
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: -2,
  },
  "& .fadeToWhite": {
    minHeight: 515,
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: -1,
    background:
      "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 100%)",
  },
  "& .card": {
    margin: "100px auto 0 auto",
    minWidth: 275,
    borderRadius: 0,
    border: "none",
    "& a": { textDecoration: "none", color: "inherit" },
  },
  "& .content": { padding: "30px 20px 15px 20px", textAlign: "center" },
  "& .photo": { maxWidth: "100%" },
  "& .item": {
    color: "rgb(61, 68, 81)",
    "& a": { outline: "none" },
  },
  "& .list": {
    "& .MuiListItemText-primary": {
      textAlign: "center",
      [theme.breakpoints.up("sm")]: { textAlign: "left" },
    },
    "& .MuiListItemText-secondary": {
      textAlign: "center",
      [theme.breakpoints.up("sm")]: { textAlign: "left" },
    },
    "& li": {
      padding: "4px 0",
      "& span.MuiListItemText-primary": {
        fontSize: 12,
        fontWeight: 700,
        textTransform: "uppercase",
      },
      "& p.MuiListItemText-secondary": {
        color: "#757575",
        fontSize: 15,
        fontWeight: 400,
        "& a": { color: "inherit", textDecoration: "none" },
      },
      "@media (min-width: 600px)": {
        "& p.MuiListItemText-secondary": {
          marginTop: -20,
          marginLeft: 100,
        },
      },
    },
  },
  "& .actions": {
    backgroundColor: theme.palette.primary.main,
    justifyContent: "center",
    "& a": {
      color: "white",
      "& svg": { fill: "white" },
    },
  },
  "& .download": {
    color: "rgb(61, 68, 81)",
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 30,
    padding: "15px 55px",
    "&:hover": {
      boxShadow:
        "0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15)",
    },
  },
  "& .hello": { color: "black", fontSize: 20, fontWeight: 300 },
}));

const About = forwardRef<HTMLElement>((_props, ref) => {
  const triggerDownloadEvent = () =>
    window.ga?.("send", "event", "File", "Download", "Resume");
  const triggerEmailEvent = () =>
    window.ga?.("send", "event", "Link", "Click", "Email Address");

  return (
    <Root>
      <section
        ref={ref}
        className="root"
        data-testid="About"
        aria-labelledby="about-heading"
      >
        <Card className="card" variant="outlined">
          <CardContent className="content">
            <Grid
              container
              spacing={3}
              sx={{ justifyContent: { xs: "center", sm: "start" } }}
            >
              <Grid size={{ sm: 5 }} className="item">
                <a id="about" href="#about">
                  <img
                    alt="Ryan SL Carpenter"
                    src="/img/ryan.jpg"
                    className="photo"
                  />
                </a>
              </Grid>
              <Grid size={{ sm: 7 }} className="item">
                <Introduction
                  name={
                    <>
                      Ryan{" "}
                      <ColorTooltip arrow title="Scott Luong" placement="top">
                        <span>SL</span>
                      </ColorTooltip>{" "}
                      Carpenter
                    </>
                  }
                  role="Software Engineer & Entrepreneur"
                />
                <List className="list">
                  <ListItem>
                    <ListItemText
                      primary="Address"
                      secondary="Denver, CO, USA"
                    ></ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Email"
                      secondary={
                        <a
                          href="mailto:ryan.sl.carpenter@gmail.com"
                          onClick={triggerEmailEvent}
                        >
                          ryan.sl.carpenter@gmail.com
                        </a>
                      }
                    ></ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className="actions">
            <IconButton
              aria-label="LinkedIn"
              component="a"
              href="https://www.linkedin.com/in/ryanscarpenter/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              aria-label="GitHub"
              component="a"
              href="https://github.com/carpiediem/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              aria-label="AngelList"
              component="a"
              href="https://angel.co/u/ryanslcarpenter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className="fab fa-angellist" />
            </IconButton>
            <IconButton
              aria-label="Stack Overflow"
              component="a"
              href="https://stackoverflow.com/users/1811952/carpiediem?tab=profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className="fab fa-stack-overflow" />
            </IconButton>
          </CardActions>
          <CardContent className="content">
            <Button
              variant="outlined"
              size="large"
              component="a"
              href="/downloads/Resume-Ryan-SL-Carpenter.pdf"
              className="download"
              onClick={triggerDownloadEvent}
            >
              Download Resume
            </Button>
            {/* <Typography className="hello">
              Do I want an introductory paragraph here?
            </Typography> */}
          </CardContent>
        </Card>
      </section>
      <div className="fadeToWhite"></div>
      <div className="background"></div>
    </Root>
  );
});
About.displayName = "About";

export default About;
