import { createTheme } from '@mui/material/styles';
import typography from './typography';
const theme = createTheme({
  palette: {
    primary: {
      light: '#438d6a',
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
    // tertiary: {
    //   light: '#ff7961',
    //   main: '#f44336',
    //   dark: '#ba000d',
    //   contrastText: '#000000',
    // },
  },
  typography, 
});
export default theme;
