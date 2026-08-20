import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
// import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";

const Root = styled(TimelineItem)(({ theme }) => ({
  flexDirection: "row-reverse",
  "&.right": {
    flexDirection: "row",
    "& .MuiPaper-root span:first-child": {
      right: "auto",
      left: -12,
      backgroundPosition: "0 0",
      "&:before": {
        width: 0,
        height: 0,
        content: '""',
        display: "block",
        marginLeft: 2,
        borderLeft: "none",
        borderTop: "20px solid transparent",
        borderBottom: "20px solid transparent",
        borderRight: "10px solid #fff",
      },
    },
  },
  "& .MuiTimelineItem-content": { zIndex: 2 },
  "@media only screen and (max-width: 599px)": {
    top: "auto !important",
    marginBottom: 15,
    "& .MuiTimelineSeparator-root": { display: "none" },
    "&:before": { display: "none" },
    "& .MuiPaper-root span:first-child": { display: "none" },
  },
  "&.color-secondary": {
    "& .MuiPaper-root": { borderColor: theme.palette.secondary.main },
    // secondary.light (#ffddd2) on this card's white background is
    // ~1.27:1 contrast, and even secondary.main (#e29578) only reaches
    // ~2.39:1 - both well under WCAG AA's 4.5:1 for normal text. #b04c26
    // keeps the same hue, darkened to clear it at ~5.37:1.
    "& h3": { color: "#b04c26" },
  },
  "& .dot": { zIndex: 2 },
  "& .paper": {
    position: "relative",
    padding: 20,
    textAlign: "left",
    borderTop: "thick solid",
    borderColor: theme.palette.primary.main,
  },
  "& .arrow": {
    right: -12,
    backgroundImage: "url(img/arrows.png)",
    backgroundPosition: "-18px 0",
    top: "calc(50% - 22px)",
    width: 12,
    height: 41,
    marginBottom: -41,
    display: "block",
    position: "absolute",
    "&:before": {
      width: 0,
      height: 0,
      content: '""',
      display: "block",
      marginRight: 2,
      borderTop: "20px solid transparent",
      borderBottom: "20px solid transparent",
      borderLeft: "10px solid #fff",
    },
  },
  "& .years": {
    marginBottom: 0,
    fontSize: 16,
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  "& .degree": {
    fontSize: 22,
    fontWeight: 400,
    marginTop: 5,
    marginBottom: 20,
  },
  "& .school": { color: "#757575", textDecoration: "none" },
}));

export default function School(props) {
  const {
    years = "THEN - NOW",
    school = "School of Hard Knocks",
    url = "https://en.wikipedia.org/wiki/School_of_Hard_Knocks",
    degree = "Doctor of Knockology",
    color,
    offset,
    side,
  } = props;

  return (
    <Root
      className={`${side} color-${color || "primary"}`}
      style={{ top: offset }}
    >
      <TimelineSeparator>
        <TimelineConnector className="topConnector" />
        <TimelineDot color={color || "primary"} className="dot" />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Paper elevation={3} className="paper">
          <span className="arrow"></span>
          <Typography variant="h6" component="h3" className="years">
            {years}
          </Typography>
          <Typography variant="body1" className="degree">
            {degree}
          </Typography>
          <Typography
            variant="overline"
            display="block"
            component="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="school"
          >
            {school}
          </Typography>
        </Paper>
      </TimelineContent>
    </Root>
  );
}
