import { forwardRef } from "react";
import { styled } from "@mui/material/styles";
import Timeline from "@mui/lab/Timeline";
import Typography from "@mui/material/Typography";

import Job from "./Job";
import jobsData from "../content/jobs.json";
import type { Job as JobData } from "../content/types";

const jobs = jobsData as JobData[];

const Root = styled("section")({
  maxWidth: 960,
  padding: "0 15px",
  margin: "auto",
  "@media only screen and (min-width: 600px)": { marginBottom: -980 },
  "& .h2": {
    color: "rgb(61, 68, 81)",
    // outline: 'none',
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

const Experience = forwardRef<HTMLElement>((_props, ref) => {
  return (
    <Root
      ref={ref}
      data-testid="Experience"
      aria-labelledby="experience-heading"
    >
      <Typography
        variant="h4"
        component="h2"
        id="experience-heading"
        className="h2"
      >
        <a id="experience" href="#experience">
          Work Experience
        </a>
      </Typography>

      <Timeline position="alternate">
        {jobs.map((job) => (
          <Job key={job.years} {...job} />
        ))}
      </Timeline>
    </Root>
  );
});
Experience.displayName = "Experience";

export default Experience;
