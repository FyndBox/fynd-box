import { Box, Container, styled } from '@mui/material';

export const DashboardContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(0, 0),
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.1),
  paddingTop: theme.spacing(5),
}));

export const SubContainer = styled(Box)(({}) => ({
  //marginLeft: theme.spacing(1.2),
}));
