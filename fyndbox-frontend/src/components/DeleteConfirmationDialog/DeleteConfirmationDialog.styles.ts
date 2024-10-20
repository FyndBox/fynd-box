import { styled} from '@mui/material';
import { BaseButton  } from '../../styles/commonStyles';


export const CancelButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  border: `1px solid ${theme.palette.secondary.contrastText}`,
  width: '8rem',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
}));

export const DeleteButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.primary.contrastText,
  width: '8rem',
  '&:hover': {
    backgroundColor: theme.palette.error.dark, 
  },
}));




