import { Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import bkImage from '../../assets/banner.jpg';

export const StyledContainer = styled(Container)({
  backgroundImage: `url(${bkImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '100vh',
  backgroundPositionX: 'center',
});

export const StyledTypography = styled(Typography)({
  color: '#ffffff',
});

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  padding: theme.spacing(1.5, 4),
  textTransform: 'none',
}));
