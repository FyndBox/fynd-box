import { Box, styled } from '@mui/material';

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.1),
}));

export const SubContainer = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1.2),
}));
