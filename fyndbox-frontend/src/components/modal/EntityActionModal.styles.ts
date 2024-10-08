import { Box, Button, styled } from '@mui/material';

export const ModalBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: 'auto',
  borderRadius: '16px',
  padding: '15px',
  textAlign: 'center',
}));

// Cancel Button
export const CancelButton = styled(Button)(({ theme }) => ({
  textAlign: 'left',
  cursor: 'pointer',
  color: theme.palette.secondary.contrastText,
}));

// Image Boxes
export const ImageUploader = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1.2),
}));

export const ModalImageBox = styled('img')({
  width: 100,
  height: 100,
  objectFit: 'cover',
});


