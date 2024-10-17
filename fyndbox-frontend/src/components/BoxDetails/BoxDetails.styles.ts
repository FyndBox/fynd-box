import { Box, styled } from '@mui/material';

export const ImageBox = styled('img')(({}) => ({
  width: 80,
  height: 80,
  objectFit: 'cover',
}));

export const BoxDetailsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  margin: theme.spacing(4, 0),
}));
