import { FC, useState } from 'react';
import { Button, Typography } from '@mui/material';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import {
  FullPageContainer,
  TextFieldsContainer,
} from '../../styles/commonStyles';
import { useTranslation } from 'react-i18next';
import AppHeader from '../../components/AppHeader/AppHeader';

const ForgotPasswordPage: FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendEmail = async () => {
    setEmailError(false);
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !email.includes('@')) {
      setEmailError(true);
      return;
    }

    try {
      // await sendForgotPasswordEmail(email); // API call
      setSuccessMessage(t('forgotPassword.successMessage'));
    } catch (error: any) {
      setErrorMessage(error.message || t('forgotPassword.errorMessage'));
    }
  };

  return (
    <FullPageContainer>
      <AppHeader />
      <Typography variant="h4" gutterBottom>
        {t('forgotPassword.title')}
      </Typography>
      <TextFieldsContainer>
        <CustomTextField
          label={t('common.email.label')}
          placeholder={t('common.email.placeholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          helperText={emailError ? t('common.email.errorMessage') : ''}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendEmail}
          sx={{ marginTop: 2 }}
        >
          {t('forgotPassword.submitButton')}
        </Button>
      </TextFieldsContainer>
      {successMessage && (
        <Typography variant="body1" color="success" sx={{ marginTop: 2 }}>
          {successMessage}
        </Typography>
      )}
      {errorMessage && (
        <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
          {errorMessage}
        </Typography>
      )}
    </FullPageContainer>
  );
};

export default ForgotPasswordPage;
