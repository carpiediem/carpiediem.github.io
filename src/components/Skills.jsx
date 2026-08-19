import React, { forwardRef } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Skill from "./Skill";
import skills from "../content/skills.json";

const Root = styled("section")({
  maxWidth: 960,
  padding: "0 15px",
  margin: "auto",
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
  "& .item": {
    width: "inherit",
    color: "rgb(61, 68, 81)",
  },
});

const Skills = forwardRef((props, ref) => {
  return (
    <Root ref={ref} data-testid="Skills">
      <Typography variant="h4" component="h2" className="h2">
        <a name="skills" href="#skills">
          Skills
        </a>
      </Typography>
      <Grid container spacing={5}>
        {skills.map((skill) => (
          <Grid key={skill.name} size={{ sm: 4 }} className="item">
            <Skill {...skill} />
          </Grid>
        ))}
      </Grid>
    </Root>
  );
});
Skills.displayName = "Skills";

export default Skills;
