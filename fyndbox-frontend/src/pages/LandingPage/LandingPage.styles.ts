import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

export const HomeContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(0),
}));

export const HomeSubContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(0, 2),
}));
