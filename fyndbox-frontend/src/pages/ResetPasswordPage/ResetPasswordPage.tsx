import { FC, useState } from 'react';
import { Typography } from '@mui/material';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import {
  CustomLink,
  FullPageContainer,
  TextFieldsContainer,
} from '../../styles/commonStyles';
import { useTranslation } from 'react-i18next';
import AppHeader from '../../components/AppHeader/AppHeader';
import PageHeader from '../../components/PageHeader/PageHeader';
import { useAuth } from '../../hooks/useAuth';
import { ButtonContainer, SendButton } from './ResetPasswordPage.styles';

const ResetPasswordPage: FC = () => {
  const { t } = useTranslation();
  const { resetPassword, error, setError, loading } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleResetPassword = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const resetToken = searchParams.get('reset-token');
    const email = searchParams.get('email');

    if (!resetToken || !email) {
      setError('Invalid or expired reset token.');
      return;
    }

    const success = await resetPassword(email, resetToken, password);
    if (success) {
      setSuccessMessage('Password reset successfully.');
    }
  };

  return (
    <FullPageContainer>
      <AppHeader />
      {loading && <Typography variant="body1">Loading...</Typography>}
      {successMessage && (
        <Typography variant="caption" color="info">
          {successMessage}
        </Typography>
      )}
      <PageHeader heading={t('resetPassword.title')} />
      <Typography variant="body1" py={2}>
        {t('resetPassword.description')}
      </Typography>
      <TextFieldsContainer>
        <CustomTextField
          label={t('resetPassword.newPassword.label')}
          type="password"
          placeholder={t('resetPassword.newPassword.placeholder')}
          value={password}
          onChange={(e) => {
            setPasswordError(false);
            setPassword(e.target.value);
            if (error) setError(null);
          }}
          error={passwordError}
          helperText={
            passwordError ? t('resetPassword.newPassword.errorMessage') : ''
          }
        />
        <CustomTextField
          label={t('resetPassword.confirmPassword.label')}
          type="password"
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
              ? t('resetPassword.confirmPassword.errorMessage')
              : ''
          }
        />
      </TextFieldsContainer>
      <ButtonContainer>
        <SendButton variant="contained" onClick={handleResetPassword}>
          {t('resetPassword.submit')}
        </SendButton>
      </ButtonContainer>
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
      <CustomLink href="/login" underline="always">
        {t('resetPassword.backToLogin')}
      </CustomLink>
    </FullPageContainer>
  );
};

export default ResetPasswordPage;
