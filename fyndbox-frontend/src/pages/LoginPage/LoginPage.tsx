import { FC, useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { isEmailValid, isPasswordValidForLogin } from '../../utils/validation';
import AppHeader from '../../components/AppHeader/AppHeader';
import PageHeader from '../../components/PageHeader/PageHeader';
import AuthButtonsGroup from '../../components/AuthButtonsGroup/AuthButtonsGroup';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import {
  FullPageContainer,
  TextFieldsContainer,
} from '../../styles/commonStyles';

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
      <FullPageContainer>
        <PageHeader heading="Logga in" />
        <TextFieldsContainer>
          <CustomTextField
            label="E-postadress"
            type="email"
            placeholder="exempel@domän.com"
            value={email}
            onChange={(e) => {
              setEmailError(false);
              setEmail(e.target.value);
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
            helperText={passwordError ? '* Lösenord krävs' : ''}
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
          onLoginClick={handleLoginClick}
          onRegisterClick={handleSignupClick}
        />
      </FullPageContainer>
    </>
  );
};

export default LoginPage;
