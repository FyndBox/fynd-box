import { Box, Button, styled } from '@mui/material';


export const StyledModalBox = styled(Box)(({ theme }) => ({
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

// Action Button Group
export const ActionButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(6, 0),
}));

export const BaseButtonStyle = styled(Button)(({ theme }) => ({
  borderRadius: '5px',
  textTransform: 'none',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  fontSize: '30px !important', 
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(1.25, 2),

}));

export const SaveButton = styled(BaseButtonStyle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  flexDirection: 'row', 
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const DeleteButton = styled(BaseButtonStyle)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText, 
  flexDirection: 'row',
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));
