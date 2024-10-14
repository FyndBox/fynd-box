import { Box, Container, styled } from '@mui/material';
import { BaseButton } from '../../styles/commonStyles';

export const BoxContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
  padding: theme.spacing(1, 0),
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
  marginTop: theme.spacing(6),
}));
