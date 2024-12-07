import { FC, useEffect, useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import {
  CustomLink,
  FullPageContainer,
  TextFieldsContainer,
} from '../../styles/commonStyles';
import AppHeader from '../../components/AppHeader/AppHeader';
import PageHeader from '../../components/PageHeader/PageHeader';
import { useAuth } from '../../hooks/useAuth';
import { ButtonContainer, SendButton } from './ResetPasswordPage.styles';
import { isPasswordNonEmpty, isPasswordValid } from '../../utils/validation';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';

const ResetPasswordPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('token');
  const email = searchParams.get('email');
  const { resetPassword, validateResetToken, error, setError, loading } =
    useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [tokenError, setTokenError] = useState('');

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (email && resetToken) {
        try {
          await validateResetToken(email, resetToken);
        } catch (err: any) {
          console.log(err);
          setTokenError(err.message);
        }
      }
    };

    checkTokenValidity();
  }, [email, resetToken]);

  const handleResetPassword = async () => {
    if (tokenError) return;
    const isNewPasswordValid = isPasswordValid(newPassword);
    const isConfirmPasswordValid = isPasswordNonEmpty(confirmPassword);
    const doPasswordsMatch = newPassword === confirmPassword;

    setNewPasswordError(!isNewPasswordValid);
    setPasswordMatchError(!doPasswordsMatch);

    if (isNewPasswordValid && isConfirmPasswordValid && doPasswordsMatch) {
      const success = await resetPassword(email!, resetToken!, newPassword);

      if (success) {
        navigate('/login');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FullPageContainer>
      <AppHeader />
      {loading && <Typography variant="body1">Loading...</Typography>}
      {tokenError && (
        <Typography variant="body1" color="error" py={2}>
          {tokenError}
        </Typography>
      )}
      {!tokenError && (
        <>
          <PageHeader heading={t('resetPassword.title')} />
          <Typography variant="body1" py={2}>
            {t('resetPassword.description')}
          </Typography>
          <TextFieldsContainer>
            <CustomTextField
              label={t('resetPassword.newPassword.label')}
              placeholder={t('resetPassword.newPassword.placeholder')}
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setNewPasswordError(false);
                if (error) setError(null);
              }}
              error={newPasswordError}
              helperText={
                newPasswordError
                  ? t('common.password.invalidPasswordError')
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
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
            />
            <CustomTextField
              label={t('resetPassword.confirmPassword.label')}
              type={showPassword ? 'text' : 'password'}
              placeholder={t('resetPassword.confirmPassword.placeholder')}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPasswordError(false);
                setConfirmPassword(e.target.value);
                if (error) setError(null);
              }}
              error={confirmPasswordError}
              helperText={
                confirmPasswordError
                  ? t('common.password.passwordRequiredError')
                  : ''
              }
              startIcon={<Lock />}
              endIcon={
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
            />
          </TextFieldsContainer>
          {passwordMatchError && (
            <Typography variant="caption" color="error">
              {t('resetPassword.error.mismatch')}
            </Typography>
          )}
          <ButtonContainer>
            <SendButton variant="contained" onClick={handleResetPassword}>
              {t('resetPassword.submit')}
            </SendButton>
          </ButtonContainer>
        </>
      )}
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
      <CustomLink href="/login" underline="always">
        {t('forgotPassword.backToLogin')}
      </CustomLink>
      <LanguageSelector />
    </FullPageContainer>
  );
};

export default ResetPasswordPage;
