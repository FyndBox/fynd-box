import { Box, Button, styled } from '@mui/material';

export const QrContainer = styled(Box)(({}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
}));

export const QrReaderContainer = styled(Box)(({}) => ({
  position: 'relative',
  width: '80%',
  maxWidth: '400px',
  aspectRatio: '1',
  border: '2px solid red',
  overflow: 'hidden',
}));

export const ButtonContainer = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));
