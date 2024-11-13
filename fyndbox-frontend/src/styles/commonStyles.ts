import { Box, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SvgIcon } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

export const FullPageContainer = styled(Container)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
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
  minWidth: '20rem',
}));

export const ButtonsGroupWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(3, 0),
}));

export const GoBackButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  textAlign: 'left',
  padding: theme.spacing(2, 0),
}));

export const StyledArrowBack = styled(ArrowBack)(({ theme }) => ({
  fontSize: 'small',
  borderRadius: '50%',
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  width: '30px',
  height: '30px',
}));
