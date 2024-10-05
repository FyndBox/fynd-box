import { Box, Button, styled } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';


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


// Modal Entity buttons
export const ModalBaseButton = styled(Button)(({ theme }) => ({
  borderRadius: '5px',
  textTransform: 'none',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  FontSize:'30px !important',
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
  backgroundColor:theme.palette.error.main,
  flexDirection:'row',
  
  '&:hover': {
    backgroundColor:theme.palette.error.dark,
  },
}));



// Styled component for CheckIcon
export const StyledCheckIcon = styled(CheckIcon)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  fontSize: '30px !important',  
  fontWeight: 900,
  '& .MuiButton-startIcon': {
    marginRight: '4px', 
  },
}));

// Styled component for DeleteIcon
export const StyledDeleteIcon = styled(DeleteIcon)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  fontSize: '30px !important', 
  fontWeight: 900,
  '& .MuiButton-startIcon': {
    marginRight: '4px', 
  },
}));




