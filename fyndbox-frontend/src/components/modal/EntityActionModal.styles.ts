import { Box, IconButton, styled, Typography } from '@mui/material';

export const ModalBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: 'auto',
  borderRadius: '16px',
  padding: theme.spacing(2),
  textAlign: 'center',
}));

// Cancel Button
export const CancelButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '50%',
  cursor: 'pointer',
  justifyContent: 'center',
  color: theme.palette.secondary.contrastText,
  width: '40px',
  height: '40px',
  top: theme.spacing(1.25),
  right: theme.spacing(1.25),
}));

// Image Boxes
export const ImageUploaderContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const ImageLabel = styled(Typography)(({ theme }) => ({
  paddingRight: theme.spacing(4),
  textAlign: 'center',
}));

export const ImageBox = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(2),
  objectFit: 'cover',
}));
