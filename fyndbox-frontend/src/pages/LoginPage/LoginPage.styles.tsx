import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LoginFormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  padding: theme.spacing(2),
  maxWidth: 400,
  height: '100vh',
}));

export const StyledHeader = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1.5, 0),
  alignSelf: 'flex-start',
}));

export const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '95%',
  gap: theme.spacing(2),
  padding: theme.spacing(4, 0),
  margin: '0 auto',
}));

export const BaseButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  padding: theme.spacing(1.5, 4),
  textTransform: 'none',
}));

export const StyledButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#3D6249',
  },
}));

export const OutlinedButton = styled(BaseButton)(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  '&:hover': {
    borderColor: '#3D6249',
    color: '#3D6249',
  },
}));
