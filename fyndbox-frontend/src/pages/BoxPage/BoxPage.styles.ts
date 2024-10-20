import { Box, Container, IconButton, styled } from '@mui/material';
import { BaseButton } from '../../styles/commonStyles';

export const BoxContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(0, 0),
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

export const PrintQRButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(10, 0),
}));

export const BackButton = styled(IconButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  textAlign: 'left',
  padding: theme.spacing(2),
}));
