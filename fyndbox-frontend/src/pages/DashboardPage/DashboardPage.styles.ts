import { Box, Container, styled } from '@mui/material';

export const DashboardContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
  padding: theme.spacing(1, 0),
}));

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.1),
}));

export const SubContainer = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1.2),
}));
