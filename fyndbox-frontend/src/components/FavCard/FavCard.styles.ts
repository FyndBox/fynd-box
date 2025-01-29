import { Box, styled } from '@mui/material';

export const FavCardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  marginTop: theme.spacing(0),
  width: '100%',
}));
