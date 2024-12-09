import { Box, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BaseButton } from '../../styles/commonStyles';

export const SendButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5, 0),
}));

export const ErrorCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.common.black}`,
  color: theme.palette.error.main,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
}));

export const ErrorCardContainer = styled(Box)(({}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}));
