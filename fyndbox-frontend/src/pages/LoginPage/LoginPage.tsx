import { FC, useState } from 'react';
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
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
  const { login, error, setError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLoginClick = async () => {
    setEmailError(false);
    setPasswordError(false);

    console.info(isValidEmail(email));

    if (!email || !isValidEmail(email)) {
      setEmailError(true);
    }

    if (!password) {
      setPasswordError(true);
    }

    if (email && isValidEmail(email) && password) {
      const success = await login(email, password);

      if (success) {
        alert('done');
      }
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginFormContainer maxWidth="md">
      <LoginHeader variant="h2">Logga in</LoginHeader>
      <TextFieldsContainer>
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="standard"
          margin="normal"
          placeholder="example@domain.com"
          value={email}
          onChange={(e) => {
            setEmailError(false);
            setEmail(e.target.value);
            if (error) setError(null);
          }}
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
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
            if (error) setError(null);
          }}
          error={passwordError}
          helperText={passwordError ? '* Lösenord krävs' : ''}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
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
