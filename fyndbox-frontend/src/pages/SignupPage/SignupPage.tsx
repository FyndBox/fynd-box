import './SignupPageStyle';
import { StyledBox , StyledTypography, StyledButton, StyledTextField} from "./SignupPageStyle";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export const SignupPage =() =>{
    return(
        <div>
            <form>
                <StyledBox>
                    <StyledTypography variant='h2'>Skapa nytt konto</StyledTypography>
                    <StyledTextField
                        fullWidth
                        margin='normal' 
                        type={'text'} 
                        placeholder='Name' 
                        variant='standard'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <StyledTextField
                        fullWidth
                        margin='normal' 
                        type={'email'} 
                        placeholder="Email@example.com" 
                        variant="standard" 
                        helperText="*Some important text"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <StyledTextField
                        fullWidth
                        margin='normal' 
                        type={'password'} 
                        placeholder='Password' 
                        variant='standard' 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                        />
                    <StyledButton variant="outlined">Bli meolem</StyledButton>
                </StyledBox>
              
            </form>
        </div>


    )
}

export default SignupPage;