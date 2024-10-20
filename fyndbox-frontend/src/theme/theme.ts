import { createTheme } from '@mui/material/styles';
import typography from './typography';
const theme = createTheme({
  palette: {
    primary: {
      light: '#15714580',
      main: '#157145',
      dark: '#0e4f30',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ECEFF1',
      main: '#ffffff',
      dark: '#CFD8DC',
      contrastText: '#000000',
    },
    error: {
      dark: '#7a3c3c',
      main: '#AF5757',
      light: '#bf7878',
    },
  },
  typography,
});
export default theme;
