import { Box, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SvgIcon } from '@mui/material';

export const FullPageContainer = styled(Container)({
  height: '100vh',
});

export const TextFieldsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  width: '100%',
}));

export const CustomIcon = styled(SvgIcon)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: '30px !important',
}));

export const BaseButton = styled(Button)(({ theme }) => ({
  borderRadius: '28px',
  padding: theme.spacing(1.25, 2),
  textTransform: 'none',
  width: '20rem',
}));

export const ButtonsGroupWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  alignItems: 'center',
  textAlign: 'center',
}));