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

export const StyledHeader = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1.5, 0),
  alignSelf: 'flex-start',
}));

export const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '95%',
  gap: theme.spacing(2),
  padding: theme.spacing(4, 0),
  margin: '0 auto',
}));

export const BaseButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  padding: theme.spacing(1.5, 4),
  textTransform: 'none',
}));

export const OutlinedButton = styled(BaseButton)(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  '&:hover': {
    borderColor: '#3D6249',
    color: '#3D6249',
  },
}));

// ///////////////////////////////

// export const StyledTypography = styled(Typography)({
//   color: "#000000",
//   padding: 3,
//   textAlign:'center',
//   lineHeight: '2.5',
// });



export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiInputBase-input': {
    color: 'black', // Text color
    padding: '10px', // Input padding
  },
  '& .MuiInputLabel-root': {
    color: 'black', // Label color
    fontWieght: 'bold',
  },
  '& .MuiInputLabel-shrink': {
    color: 'black', // Label color when input is focused or filled
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'gray', // Underline color before focus
  },
  '& .MuiInput-underline:hover:before': {
    borderBottomColor: '#121212', // Underline color on hover
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'gray', // Underline color after focus
  },
}));




// export const StyledButton = styled(Button)({
//   color: "#000000",
//   marginTop:8,
//   textAlign:'center',
//   borderRadius:50,
//   flexDirection:'row',
//   padding:'6px 60px',
//   border: '0.5px solid #757e79',
//   transition: 'borderColor 0.3s ease',
//   width:'70%',
//   '&:hover': {
//     background:'#d9dfdc8f',
//   },
// });