import { Box, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LoginFormContainer = styled(Container)(({}) => ({
  height: '100vh',
}));

export const TextFieldsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  width: '100%',
}));

export const ActionButtonsGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(6, 0),
}));

export const BaseButton = styled(Button)(({ theme }) => ({
  borderRadius: '28px',
  padding: theme.spacing(1.25, 2),
  textTransform: 'none',
  width: '20rem',
}));

export const LoginButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const RegisterButton = styled(BaseButton)(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}));
