import { Box, Button, styled } from '@mui/material';

export const StyledModalBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'80%',
  height:'auto',
  borderRadius: '16px',
  padding: '15px',
  textAlign: 'center',
}));

// image
export const UpdateImageBox = styled(Box)(({ theme }) =>({
  paddingTop: 20,
}));

export const ModalImageBox = styled('img')({
  width: 100,
  height: 100,
  objectFit: 'cover',
});


// button
export const ModalBaseButton = styled(Button)(({ theme }) => ({
  borderRadius: '5px',
  padding: theme.spacing(1.25, 2),
  textTransform: 'none',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const StyledModalAddButton = styled(ModalBaseButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  flexDirection:'row',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const StyledModalDeleteButton = styled(ModalBaseButton)(({ theme }) => ({
  backgroundColor:'#f44336',
  flexDirection:'row',
  '&:hover': {
    backgroundColor:'#ba000d',
  },
}));

// export const CheckIcon = styled(ModalBaseButton)(({ theme }) => ({
//   color: theme.palette.secondary.contrastText,
// }));




