import { IconButton, Typography } from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { isPasswordValid, isPasswordNonEmpty } from '../../utils/validation';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import { TextFieldsContainer } from '../../styles/commonStyles';
import { ButtonsGroupWrapper } from '../../styles/commonStyles';
import { SaveButton } from '../ActionButtonsGroup/ActionButtonsGroup.styles';
import { SecuritySettingsContainer } from './SecuritySettings.styles';

export const SecuritySettings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updatePassword, error, setError } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handlePasswordUpdate = async () => {
    const isCurrentPasswordValid = isPasswordNonEmpty(currentPassword);
    const isNewPasswordValid = isPasswordValid(newPassword);
    const isDifferentPasswords = currentPassword !== newPassword;

    setCurrentPasswordError(!isCurrentPasswordValid);
    setNewPasswordError(!isNewPasswordValid);
    setPasswordMatchError(!isDifferentPasswords);

    if (isCurrentPasswordValid && isNewPasswordValid && isDifferentPasswords) {
      const success = await updatePassword(currentPassword, newPassword);
      if (success) {
        navigate('/dashboard');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SecuritySettingsContainer>
      <TextFieldsContainer>
        <CustomTextField
          label={t('settings.security.currentPassword')}
          type={showPassword ? 'text' : 'password'}
          value={currentPassword}
          onChange={(e) => {
            setCurrentPassword(e.target.value);
            setCurrentPasswordError(false);
            if (error) setError(null);
          }}
          error={currentPasswordError}
          helperText={
            currentPasswordError
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
        <CustomTextField
          label={t('settings.security.newPassword')}
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
      </TextFieldsContainer>
      <ButtonsGroupWrapper>
        <SaveButton variant="contained" onClick={handlePasswordUpdate}>
          {t('settings.security.savePassword')}
        </SaveButton>
      </ButtonsGroupWrapper>
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
      {passwordMatchError && (
        <Typography variant="caption" color="error">
          {t('settings.security.passwordMatchError')}
        </Typography>
      )}
    </SecuritySettingsContainer>
  );
};

export default SecuritySettings;
