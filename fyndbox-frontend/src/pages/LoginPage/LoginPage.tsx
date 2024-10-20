import { FC, useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { isEmailValid, isPasswordValidForLogin } from '../../utils/validation';
import PageHeader from '../../components/PageHeader/PageHeader';
import AuthButtonsGroup from '../../components/AuthButtonsGroup/AuthButtonsGroup';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import {
  FullPageContainer,
  TextFieldsContainer,
} from '../../styles/commonStyles';
import { useTranslation } from 'react-i18next';
import AppHeader from '../../components/AppHeader/AppHeader';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
        navigate('/dashboard');
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
    <FullPageContainer>
      <AppHeader />
      <PageHeader heading={t('login.title')} />
      <TextFieldsContainer>
        <CustomTextField
          label={t('common.email.label')}
          type="email"
          placeholder={t('common.email.placeholder')}
          value={email}
          onChange={(e) => {
            setEmailError(false);
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          error={emailError}
          helperText={emailError ? t('common.email.errorMessage') : ''}
          startIcon={<Email />}
        />
        <CustomTextField
          label={t('common.password.label')}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
            if (error) setError(null);
          }}
          error={passwordError}
          helperText={
            passwordError ? t('common.password.loginErrorMessage') : ''
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
        onLoginClick={handleLoginClick}
        onRegisterClick={handleSignupClick}
      />
      <LanguageSelector />
    </FullPageContainer>
  );
};

export default LoginPage;
