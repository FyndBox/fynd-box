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
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import {
  isEmailValid,
  isNameValid,
  isPasswordValid,
} from '../../utils/validation';
import PageHeader from '../../components/PageHeader/PageHeader';
import AuthButtonsGroup from '../../components/AuthButtonsGroup/AuthButtonsGroup';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import {
  FullPageContainer,
  TextFieldsContainer,
} from '../../styles/commonStyles';
import AppHeader from '../../components/AppHeader/AppHeader';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';

export const SignupPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
        <PageHeader heading={t('signup.title')} />
        <TextFieldsContainer>
          <CustomTextField
            label={t('signup.name.label')}
            placeholder={t('signup.name.placeholder')}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(false);
              if (error) setError(null);
            }}
            error={nameError}
            helperText={
              nameError
                ? t('signup.name.errorMessage')
                    .split('\n')
                    .map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))
                : ''
            }
            startIcon={<AccountCircle />}
          />
          <CustomTextField
            label={t('common.email.label')}
            placeholder={t('common.email.placeholder')}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(false);
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
              passwordError
                ? t('common.password.signupErrorMessage')
                    .split('\n')
                    .map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))
                : ''
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
        <LanguageSelector />
      </FullPageContainer>
    </>
  );
};

export default SignupPage;
