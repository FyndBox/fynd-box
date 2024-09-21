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
  ActionButtonsGroup,
  TextFieldsContainer,
  LoginButton,
  RegisterButton,
} from './LoginPage.styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { isEmailValid, isPasswordValidForLogin } from '../../utils/validation';
import AppHeader from '../../components/AppHeader/AppHeader';
import PageHeader from '../../components/PageHeader/PageHeader';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { login, error, setError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLoginClick = async () => {
    setEmailError(!isEmailValid(email));
    setPasswordError(!isPasswordValidForLogin(password));

    if (isEmailValid(email) && isPasswordValidForLogin(password)) {
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
    <>
      <AppHeader />
      <LoginFormContainer maxWidth="md">
        <PageHeader heading="Logga in" />
        <TextFieldsContainer>
          <TextField
            fullWidth
            label="E-postadress"
            type="email"
            variant="standard"
            margin="normal"
            placeholder="exempel@domän.com"
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
    </>
  );
};

export default LoginPage;
