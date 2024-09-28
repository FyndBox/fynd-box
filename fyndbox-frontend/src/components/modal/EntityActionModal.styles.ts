

import { Box, styled } from '@mui/material';

export const WrapModal = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
  cursor: 'pointer',
}));