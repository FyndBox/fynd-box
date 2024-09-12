import { Box, Typography, Button, TextField, } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledBox = styled(Box)({
  display:'flex',
  alignItems:'flex-start',
  alignContent:'center',
  flexDirection:'column',
  // maxWidth:400,
  margin:'auto',
  marginTop:5,
  padding:30,
  // backgroundColor='red'
  borderRadius:5,
  boxShadow:'5px 5px 10px #ccc',
  '&:hover': {
    boxShadow: '10px 10px 15px #ccc',
  },
});

export const StyledTypography = styled(Typography)({
  color: "#000000",
  padding: 3,
  textAlign:'left',
  lineHeight: '2.3',

});

export const StyledTextField = styled(TextField)({
 
});

export const StyledButton = styled(Button)({
  color: "#000000",
  marginTop:8,
  textAlign:'center',
  borderRadius:50,
  flexDirection:'row',
  padding:'6px 60px',
  border: '0.5px solid #757e79',
  transition: 'borderColor 0.3s ease',
  width:'70%',
 });