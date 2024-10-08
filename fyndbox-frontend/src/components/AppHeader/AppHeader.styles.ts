import { AppBar, Box, styled } from '@mui/material';

export const AppHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(1, 0),
  cursor: 'pointer',
}));

export const AppbarContainer = styled(AppBar)(({ theme }) => ({
  height: '60px',
  paddingRight: theme.spacing(0.25),
  color: 'default',
}));
