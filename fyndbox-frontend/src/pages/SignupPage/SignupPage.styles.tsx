import { Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SignupContainer = styled(Container)({
  height: '100vh',
});

export const TextFieldsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  width: '100%',
}));
