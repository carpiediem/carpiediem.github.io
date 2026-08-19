import { createTheme } from "@mui/material/styles";

// https://coolors.co/006d77-83c5be-edf6f9-ffddd2-e29578
// 006d77,83c5be,edf6f9,ffddd2,e29578
export const theme = createTheme({
  palette: {
    primary: { main: "#006d77", light: "#83c5be" },
    secondary: { main: "#e29578", light: "#ffddd2" },
  },
  typography: {
    fontWeight: 400,
    fontFamily: [
      '"Open Sans"',
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
