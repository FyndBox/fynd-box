import { Box, Container, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

export const HomeContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '100vh',
  backgroundPosition: 'center',
  color: theme.palette.primary.contrastText,
  role: 'presentation',
}));

export const HomeSubContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(8, 6),
  height: '100vh',
}));


export const GuideLink = styled(Link)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  display: 'inline-block',
  cursor: 'pointer',
  color: theme.palette.secondary.contrastText
}));
