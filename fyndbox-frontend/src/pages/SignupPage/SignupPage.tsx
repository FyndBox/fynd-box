import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Typography } from '@mui/material';

import {
  StyledContainer,
  StyledTextField,
  StyledHeader,
  ButtonGroup,
  OutlinedButton,
} from './SignupPage.styles';

export const SignupPage = () => {
  return (
    <div>
      <form>
        <StyledContainer>
          <StyledHeader variant="h2">Skapa nytt konto</StyledHeader>

          <StyledTextField
            fullWidth
            margin="normal"
            type={'text'}
            label="Name"
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
            label="Email@example.com"
            variant="standard"
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

          <Typography variant="caption" color="error">
              * Vänligen ange giltig e-postadress
          </Typography>

          <StyledTextField
            fullWidth
            margin="normal"
            type={'password'}
            label="Password"
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

          <ButtonGroup>
            <OutlinedButton fullWidth variant="outlined">
              Bli medlem
            </OutlinedButton>
          </ButtonGroup>
   

        </StyledContainer>
      </form>
    </div>
  );
};

export default SignupPage;
