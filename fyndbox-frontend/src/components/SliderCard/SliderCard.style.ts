import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SliderCardContainer = styled(Container)(({ theme }) => ({
  backgroundColor: `#F4F2F2`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  role: 'presentation',
}));

export const StepCounter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%' ,
  width: '50px',
  height: '50px',
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.light,
  margin: theme.spacing(2)
}));
