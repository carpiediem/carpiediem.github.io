import { forwardRef } from "react";
import { styled } from "@mui/material/styles";
import Timeline from "@mui/lab/Timeline";
import Typography from "@mui/material/Typography";

import School from "./School";
import schoolsData from "../content/schools.json";
import type { School as SchoolData } from "../content/types";

const schools = schoolsData as SchoolData[];

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

const Education = forwardRef<HTMLElement>((_props, ref) => {
  return (
    <Root ref={ref} data-testid="Education" aria-labelledby="education-heading">
      <Typography
        variant="h4"
        component="h2"
        id="education-heading"
        className="h2"
      >
        <a id="education" href="#education">
          Education
        </a>
      </Typography>

      <Timeline position="alternate">
        {schools.map((school) => (
          <School key={school.years} {...school} />
        ))}
      </Timeline>
    </Root>
  );
});
Education.displayName = "Education";

export default Education;
