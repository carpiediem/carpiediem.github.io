import React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AboutIcon from "@mui/icons-material/Help";
import SkillsIcon from "@mui/icons-material/Star";
import PortfolioIcon from "@mui/icons-material/PhotoLibrary";
import ExperienceIcon from "@mui/icons-material/Work";
import EducationIcon from "@mui/icons-material/School";

const Root = styled("div")(({ theme }) => ({
  flexGrow: 1,
  "& .appbar": {
    backgroundColor: "white",
    color: "black",
  },
  "& .title": {
    flexGrow: 1,
    color: theme.palette.primary.light,
    fontFamily: "'Contrail One', cursive",
    textDecoration: "none",
    "@media only screen and (max-width: 599px)": { marginBottom: -15 },
  },
  "& .buttonGroup": {
    "& a": {
      borderColor: "transparent !important",
      backgroundColor: "transparent !important",
      color: "inherit",
      fontSize: "13px",
      fontWeight: "700",
    },
    "& > a > span:after": {
      content: '""',
      position: "absolute",
      left: 8,
      bottom: 4,
      width: 0,
      height: 3,
      borderRadius: 10,
      transition: "width 0.2s ease-out",
      backgroundColor: theme.palette.primary.main,
    },
    "& > button:hover > span:after": { width: "calc(100% - 16px)" },
  },
  "& .scrolledTo": {
    "& > span:after": { width: "calc(100% - 16px) !important" },
  },
  "& .atTop": {
    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.7)",
    boxShadow: "none",
  },
}));

export default function NavBar(props) {
  const { section } = props;
  const narrow = window.innerWidth < 600;

  return (
    <Root data-testid="NavBar">
      <AppBar color="transparent" className={section ? "appbar" : "atTop"}>
        <Toolbar variant="dense">
          <Typography variant="h6" component="a" href="/" className="title">
            RSLC
          </Typography>
          <ButtonGroup
            variant="text"
            color="primary"
            disableRipple
            className="buttonGroup"
          >
            <Button
              component="a"
              href="/#about"
              className={section === "about" ? "scrolledTo" : undefined}
            >
              {narrow ? <AboutIcon /> : "About"}
            </Button>
            <Button
              component="a"
              href="/#skills"
              className={section === "skills" ? "scrolledTo" : undefined}
            >
              {narrow ? <SkillsIcon /> : "Skills"}
            </Button>
            <Button
              component="a"
              href="/#portfolio"
              className={section === "portfolio" ? "scrolledTo" : undefined}
            >
              {narrow ? <PortfolioIcon /> : "Portfolio"}
            </Button>
            <Button
              component="a"
              href="/#experience"
              className={section === "experience" ? "scrolledTo" : undefined}
            >
              {narrow ? <ExperienceIcon /> : "Experience"}
            </Button>
            <Button
              component="a"
              href="/#education"
              className={section === "education" ? "scrolledTo" : undefined}
            >
              {narrow ? <EducationIcon /> : "Education"}
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Root>
  );
}
