import React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Root = styled("div")(({ theme }) => ({
  paddingBottom: 15,
  borderBottom: "thin solid #ddd",
  textAlign: "left",
  "@media (max-width: 599px)": {
    textAlign: "center",
  },
  "& .name": {
    fontWeight: 700,
    textAlign: "center",
    [theme.breakpoints.up("sm")]: { textAlign: "left" },
    "& > span.thin": { fontWeight: 300 },
  },
  "& .role": {
    fontWeight: 400,
    textAlign: "center",
    [theme.breakpoints.up("sm")]: { textAlign: "left" },
  },
}));

interface IntroductionProps {
  name?: React.ReactNode;
  role?: React.ReactNode;
}

export default function Introduction({
  name = "John Smith",
  role = "Human Person",
}: IntroductionProps) {
  return (
    <Root>
      <Typography
        variant="h4"
        component="h1"
        id="about-heading"
        className="name"
      >
        {name}
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        className="role"
      >
        {role}
      </Typography>
    </Root>
  );
}
