import { Box, styled } from '@mui/material';

export const AppHeaderBox = styled(Box)(() => ({
  height: '100%',
}));

export const AppHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
  cursor: 'pointer',
}));
