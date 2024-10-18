import { styled} from '@mui/material';
import { BaseButton  } from '../../styles/commonStyles';


export const CancelButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  borderRadius: '2px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
}));

export const DeleteButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  borderRadius: '2px',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

