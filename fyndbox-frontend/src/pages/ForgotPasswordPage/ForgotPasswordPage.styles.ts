import { Box, styled } from '@mui/material';
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
