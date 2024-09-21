import { IconButton, Typography } from '@mui/material';
import {
  Email,
  Lock,
  AccountCircle,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
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
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import {
  FullPageContainer,
  TextFieldsContainer,
} from '../../styles/commonStyles';

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
      <FullPageContainer>
        <PageHeader heading="Skapa nytt konto" />
        <TextFieldsContainer>
          <CustomTextField
            label="Namn"
            placeholder="John Doe"
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
            startIcon={<AccountCircle />}
          />
          <CustomTextField
            label="E-postadress"
            placeholder="exempel@domän.com"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(false);
              if (error) setError(null);
            }}
            error={emailError}
            helperText={emailError ? '* Vänligen ange giltig e-postadress' : ''}
            startIcon={<Email />}
          />
          <CustomTextField
            label="Lösenord"
            type={showPassword ? 'text' : 'password'}
            value={password}
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
            startIcon={<Lock />}
            endIcon={
              <IconButton
                onClick={togglePasswordVisibility}
                aria-label="toggle password visibility"
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            }
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
      </FullPageContainer>
    </>
  );
};

export default SignupPage;
