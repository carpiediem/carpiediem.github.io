import React, { forwardRef } from "react";
import { styled } from "@mui/material/styles";
import Timeline from "@mui/lab/Timeline";
import Typography from "@mui/material/Typography";

import School from "./School";
import schools from "../content/schools.json";

const Root = styled("section")({
  maxWidth: 960,
  padding: "0 15px",
  margin: "auto",
  marginBottom: -400,
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
});

const Education = forwardRef((props, ref) => {
  return (
    <Root ref={ref} data-testid="Education">
      <Typography variant="h4" component="h2" className="h2">
        <a name="education" href="#education">
          Education
        </a>
      </Typography>

      <Timeline align="alternate">
        {schools.map((school) => (
          <School key={school.years} {...school} />
        ))}
      </Timeline>
    </Root>
  );
});
Education.displayName = "Education";

export default Education;
