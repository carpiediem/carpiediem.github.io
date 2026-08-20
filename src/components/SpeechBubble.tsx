import React from "react";
import { styled } from "@mui/material/styles";

const Root = styled("div")(({ theme }) => ({
  // float: 'left',
  marginBottom: 18,
  "& span": {
    minWidth: "150px",
    padding: "9px 12px",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.1,
    display: "inline-block",
    textTransform: "uppercase",
    position: "relative",
  },
  "& span:before": {
    content: '""',
    width: 0,
    height: 0,
    top: "100%",
    left: 5,
    display: "block",
    position: "absolute",
    borderStyle: "solid",
    borderLeftColor: theme.palette.primary.main,
    borderWidth: "0 0 8px 8px",
    borderColor: "transparent",
  },
}));

interface SpeechBubbleProps {
  text?: React.ReactNode;
}

export default function SpeechBubble({ text }: SpeechBubbleProps) {
  return (
    <Root>
      <span>{text}</span>
    </Root>
  );
}
