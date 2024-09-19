import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { FormHelperText } from '@mui/material';
import {
  StyledContainer,
  StyledTextField,
  SignupHeader,
  RegisterButton,
  ActionButtonsGroup,
  
} from './SignupPage.styles';

export const SignupPage = () => {
  return (
    <div>
      <form>
        <StyledContainer>
          <SignupHeader variant="h2">Skapa nytt konto</SignupHeader>

          <StyledTextField
            fullWidth
            margin="normal"
            type={'text'}
            label="Namn"
            variant="standard"
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
            margin="normal"
            type={'email'}
            label="email@adress.com"
            variant="standard"
            // helperText=" * Vänligen ange giltig e-postadress"
            helperText={
              <FormHelperText>
                <span style={{ color: 'red' }}>*</span> Vänligen ange giltig e-postadress
              </FormHelperText>
            }
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
            margin="normal"
            type={'password'}
            label="Losenard"
            variant="standard"
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
 
          <ActionButtonsGroup>
            <RegisterButton
              fullWidth
              variant="outlined"
              // onClick={handleSignupClick}
            >
              Bli medlem
            </RegisterButton>
          </ActionButtonsGroup>
    
        </StyledContainer>
      </form>
    </div>
  );
};

export default SignupPage;
