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
import { Email } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { isEmailValid } from '../../utils/validation';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import { ButtonContainer, SendButton } from './ForgotPasswordPage.styles';

const ForgotPasswordPage: FC = () => {
  const { t } = useTranslation();
  const { forgotPassword, error, setError, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSendEmail = async () => {
    setEmailError(!isEmailValid(email));

    if (isEmailValid(email)) {
      setError(null);
      try {
        const success = await forgotPassword(email);
        if (success) {
          setSuccessMessage(t('api.auth.forgotPassword.success'));
          setEmail('');
        }
      } catch (err) {
        setSuccessMessage('');
      }
    }
  };

  return (
    <FullPageContainer>
      <AppHeader />
      {loading && <Typography variant="body1">Loading...</Typography>}
      <PageHeader heading={t('forgotPassword.title')} />
      {successMessage && (
        <Typography variant="caption" color="info">
          {successMessage}
        </Typography>
      )}
      <Typography variant="body1" py={2}>
        {t('forgotPassword.description')}
      </Typography>
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
      </TextFieldsContainer>
      <ButtonContainer>
        <SendButton variant="contained" onClick={handleSendEmail}>
          {t('forgotPassword.submit')}
        </SendButton>
      </ButtonContainer>
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

export default ForgotPasswordPage;
