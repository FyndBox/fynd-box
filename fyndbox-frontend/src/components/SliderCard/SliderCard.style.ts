import { Box, Card } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StepCounter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: '60px',
  height: '60px',
  color: theme.palette.primary.dark,
  backgroundColor: theme.palette.primary.light,
  margin: theme.spacing(1),
}));

export const CardContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
}));
