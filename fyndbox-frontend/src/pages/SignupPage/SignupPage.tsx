import InputAdornment from '@mui/material/InputAdornment';
import { IconButton, TextField, Typography } from '@mui/material';
import {
  Email,
  Lock,
  AccountCircle,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  SignupContainer,
  SignupHeader,
  RegisterButton,
  ActionButtonsGroup,
  TextFieldsContainer,
} from './SignupPage.styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

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

  const isNameValid = (name: string): boolean => {
    if (!name.trim() || name.length < 3 || name.length > 50) {
      return false;
    }
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
  };

  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return false;
    }
    return true;
  };

  const isPasswordValid = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (!password || !passwordRegex.test(password)) {
      return false;
    }
    return true;
  };

  const handleSignupClick = async () => {
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);

    if (!isNameValid(name)) setNameError(true);
    if (!isEmailValid(email)) setEmailError(true);
    if (!isPasswordValid(password)) setPasswordError(true);

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
    <SignupContainer>
      <SignupHeader variant="h2">Skapa nytt konto</SignupHeader>

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
                - Måste innehålla minst en siffra <br />- Måste innehålla minst
                ett specialtecken (endast @$!%*#?& är tillåtna) .
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
      <ActionButtonsGroup>
        <RegisterButton
          fullWidth
          variant="outlined"
          onClick={handleSignupClick}
        >
          Bli medlem
        </RegisterButton>
      </ActionButtonsGroup>
    </SignupContainer>
  );
};

export default SignupPage;
