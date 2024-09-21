import InputAdornment from '@mui/material/InputAdornment';
import { IconButton, TextField, Typography } from '@mui/material';
import {
  Email,
  Lock,
  AccountCircle,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { SignupContainer, TextFieldsContainer } from './SignupPage.styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  isEmailValid,
  isNameValid,
  isPasswordValid,
} from '../../utils/validation';
import AppHeader from '../../components/AppHeader/AppHeader';
import PageHeader from '../../components/PageHeader/PageHeader';
import AuthButtonsGroup from '../../components/AuthButtonsGroup/AuthButtonsGroup';

export const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, error, setError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignupClick = async () => {
    setNameError(!isNameValid(name));
    setEmailError(!isEmailValid(email));
    setPasswordError(!isPasswordValid(password));

    if (isNameValid(name) && isEmailValid(email) && isPasswordValid(password)) {
      const success = await signup(name, email, password);
      if (success) {
        alert('Signup successful!');
        navigate('/dashboard');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <AppHeader />
      <SignupContainer>
        <PageHeader heading="Skapa nytt konto" />

        <TextFieldsContainer>
          <TextField
            fullWidth
            margin="normal"
            label="Namn"
            placeholder="John Doe"
            variant="standard"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(false);
              if (error) setError(null);
            }}
            error={nameError}
            helperText={
              nameError ? (
                <>
                  * Vänligen ange ett giltigt namn: <br />
                  - Namnet får bara innehålla bokstäver och mellanslag. <br />-
                  Namnet måste vara 3-50 tecken långt.
                </>
              ) : (
                ''
              )
            }
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
            placeholder="exempel@domän.com"
            label="E-postadress"
            variant="standard"
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
            margin="normal"
            label="Lösenord"
            placeholder=""
            variant="standard"
            value={password}
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
              if (error) setError(null);
            }}
            error={passwordError}
            helperText={
              passwordError ? (
                <>
                  * Vänligen ange ett giltigt lösenord: <br />
                  - Måste innehålla 8-20 tecken <br />
                  - Måste innehålla minst en bokstav <br />
                  - Måste innehålla minst en siffra <br />- Måste innehålla
                  minst ett specialtecken (endast @$!%*#?& är tillåtna) .
                </>
              ) : (
                ''
              )
            }
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
        <AuthButtonsGroup
          showLoginButton={false}
          onRegisterClick={handleSignupClick}
        />
      </SignupContainer>
    </>
  );
};

export default SignupPage;
