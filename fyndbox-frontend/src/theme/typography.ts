import { TypographyOptions } from "@mui/material/styles/createTypography";

const typography: TypographyOptions = {
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  h1: {
    fontSize: "2.5rem",
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: "-0.01562em",
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: "-0.00833em",
  },
  h3: {
    fontSize: "1.75rem",
    fontWeight: 700,
    lineHeight: 1.4,
    letterSpacing: "0em",
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: "0.00735em",
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.00938em",
  },
  button: {
    textTransform: "none",
    fontWeight: 500,
    fontSize: "1rem",
  },
};

export default typography;
