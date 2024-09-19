import { Typography, Button, TextField, Container,Box, } from "@mui/material";
import { styled } from "@mui/material/styles";


export const StyledContainer = styled(Container)({
  display:'flex',
  alignItems:'center',
  alignContent:'center',
  flexDirection:'column',
  margin:'auto',
  marginTop:5,
  padding:30,
});

export const SignupHeader = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1.5, 0),
  alignSelf: 'flex-start',
}));

export const ActionButtonsGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(6, 0),
}));

export const BaseButton = styled(Button)(({ theme }) => ({
  borderRadius: '28px',
  padding: theme.spacing(1.25, 2),
  textTransform: 'none',
  width: '20rem',
}));

export const RegisterButton = styled(BaseButton)(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  width: '100%',
}));  

