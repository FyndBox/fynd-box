import './SignupPageStyle';
import { StyledContainer, StyledTypography, StyledButton, StyledTextField} from "./SignupPageStyle";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export const SignupPage =() =>{
    return(
        <div>
            <form>
                <StyledContainer>
                    <StyledTypography variant='h2'>Skapa nytt konto</StyledTypography>

                 
                    <StyledTextField
                        fullWidth
                        margin='normal' 
                        type={'text'} 
                        label='Name' 
                        variant='standard'
                        slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <AccountCircleIcon />
                                </InputAdornment>
                              ),
                            },
                          }}
                    />
                    <StyledTextField
                        fullWidth
                        margin='normal' 
                        type={'email'} 
                        label="Email@example.com" 
                        variant="standard" 
                        helperText="*Some important text"
                        slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailIcon />
                                </InputAdornment>
                              ),
                            },
                        }}
                    />
                    <StyledTextField
                        fullWidth
                        margin='normal' 
                        type={'password'} 
                        label='Password' 
                        variant='standard' 
                        slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockIcon />
                                </InputAdornment>
                              ),
                            },
                        }}
                    />

               


                    <StyledButton variant="outlined">Bli meolem</StyledButton>

                    
                </StyledContainer>
              
            </form>
        </div>


    )
}

export default SignupPage;