import { FC, useState } from 'react';
import { InputAdornment, TextField, Typography } from '@mui/material';
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
import { useAuth } from '../../hooks/useAuth';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { login, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLoginClick = async () => {
    setEmailError(false);
    setPasswordError(false);

    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    if (email && password) {
      const success = await login(email, password);

      if (success) {
        alert('done');
      }
    }
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
          placeholder="example@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          helperText={emailError ? '* Vänligen ange giltig e-postadress' : ''}
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
          label="Lösenord"
          variant="standard"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          helperText={passwordError ? '* Lösenord krävs' : ''}
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
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
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
