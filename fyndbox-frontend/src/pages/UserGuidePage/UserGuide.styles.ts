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
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  fontSize: 'small',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
}));
