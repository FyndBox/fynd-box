import { Button, DialogActions, styled } from '@mui/material';

export const BaseButton = styled(Button)(({}) => ({
  borderRadius: '28px',
  textTransform: 'none',
  width: '8rem',
}));

export const CancelButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  border: `1px solid ${theme.palette.secondary.contrastText}`,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

export const DeleteButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

export const ActionButtonsContainer = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2),
}));
