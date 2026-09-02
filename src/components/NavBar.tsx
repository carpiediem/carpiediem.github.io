import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AboutIcon from "@mui/icons-material/Person";
import SkillsIcon from "@mui/icons-material/Build";
import PortfolioIcon from "@mui/icons-material/Dashboard";
import ExperienceIcon from "@mui/icons-material/Work";
import EducationIcon from "@mui/icons-material/School";

const sections = [
  { id: "about", label: "About", Icon: AboutIcon },
  { id: "skills", label: "Skills", Icon: SkillsIcon },
  { id: "portfolio", label: "Portfolio", Icon: PortfolioIcon },
  { id: "experience", label: "Experience", Icon: ExperienceIcon },
  { id: "education", label: "Education", Icon: EducationIcon },
];

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
    color: "rgba(255, 255, 255, 0.85)",
    boxShadow: "none",
  },
}));

interface NavBarProps {
  section?: string | false | null;
}

export default function NavBar(props: NavBarProps) {
  const { section } = props;
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const listener = () => setNarrow(window.innerWidth < 600);
    listener();
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  return (
    <Root data-testid="NavBar">
      <AppBar color="transparent" className={section ? "appbar" : "atTop"}>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            component="a"
            href="/"
            aria-label="Ryan SL Carpenter home"
            className="title"
          >
            RSLC
          </Typography>
          <nav aria-label="Main">
            <ButtonGroup
              variant="text"
              color="primary"
              disableRipple
              className="buttonGroup"
            >
              {sections.map(({ id, label, Icon }) => (
                <Button
                  key={id}
                  component="a"
                  href={`/#${id}`}
                  aria-label={label}
                  aria-current={section === id ? "true" : undefined}
                  className={section === id ? "scrolledTo" : undefined}
                >
                  {narrow ? <Icon /> : label}
                </Button>
              ))}
            </ButtonGroup>
          </nav>
        </Toolbar>
      </AppBar>
    </Root>
  );
}
