import { createTheme } from "@mui/material/styles";
import typography from "./typography";
const theme = createTheme({
  palette: {
    primary: {
      main: "#157145",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography,
});
export default theme;
