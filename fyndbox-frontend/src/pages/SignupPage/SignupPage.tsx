import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from '@mui/material';
import { Email, Lock, AccountCircle } from '@mui/icons-material';
import {
  SignupContainer,
  SignupHeader,
  RegisterButton,
  ActionButtonsGroup,
  TextFieldsContainer,
} from './SignupPage.styles';

export const SignupPage = () => {
  return (
    <SignupContainer>
      <SignupHeader variant="h2">Skapa nytt konto</SignupHeader>

      <TextFieldsContainer>
        <TextField
          fullWidth
          margin="normal"
          label="Namn"
          placeholder="John Doe"
          variant="standard"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          type="email"
          placeholder="example@domain.com"
          label="Email"
          variant="standard"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Lösenord"
          placeholder=""
          variant="standard"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            },
          }}
        />
      </TextFieldsContainer>

      <ActionButtonsGroup>
        <RegisterButton
          fullWidth
          variant="outlined"
          // onClick={handleSignupClick}
        >
          Bli medlem
        </RegisterButton>
      </ActionButtonsGroup>
    </SignupContainer>
  );
};

export default SignupPage;
