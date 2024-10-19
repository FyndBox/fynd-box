import { Box, Card } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StepCounter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.light,
  margin: theme.spacing(1),
}));

export const CardContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
}));
