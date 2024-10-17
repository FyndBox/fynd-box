import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SliderCardContainer = styled(Container)(({ theme }) => ({
  backgroundColor: `#F4F2F2`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  role: 'presentation',
}));

export const SliderCardCSubContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(5, 0.5),
}));
