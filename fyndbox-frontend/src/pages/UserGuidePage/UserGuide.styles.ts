import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBack } from '@mui/icons-material';

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
