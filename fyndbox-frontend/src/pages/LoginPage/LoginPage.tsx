import { FC } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import {
  LoginFormContainer,
  LoginHeader,
  ActionButtonsGroup,
  TextFieldsContainer,
  LoginButton,
  RegisterButton,
} from './LoginPage.styles';
import { useNavigate } from 'react-router-dom';

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <LoginFormContainer maxWidth="md">
      <LoginHeader variant="h2">Logga in</LoginHeader>

      <TextFieldsContainer>
        <TextField
          fullWidth 
          label="Email"
          variant="standard"
          margin="normal"
          placeholder="email@adress.com"
          helperText=" * Vänligen ange giltig e-postadress"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            },
          }}
          required
        />

        <TextField
          fullWidth
          label="Lösenord"
          variant="standard"
          margin="normal"
          type="password"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            },
          }}
          required
        />
      </TextFieldsContainer>
      <ActionButtonsGroup>
        <LoginButton fullWidth variant="contained" onClick={handleLoginClick}>
          Logga in
        </LoginButton>
        <RegisterButton
          fullWidth
          variant="outlined"
          onClick={handleSignupClick}
        >
          Bli medlem
        </RegisterButton>
      </ActionButtonsGroup>
    </LoginFormContainer>
  );
};

export default LoginPage;
