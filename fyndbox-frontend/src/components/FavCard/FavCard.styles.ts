import { Box, styled } from '@mui/material';

export const FavCardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.secondary.contrastText}`,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
  cursor: 'pointer',
  transition: 'background-color 0.2s',
}));
