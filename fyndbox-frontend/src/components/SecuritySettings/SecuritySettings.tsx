import { IconButton } from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { isPasswordValid } from '../../utils/validation';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import { TextFieldsContainer } from '../../styles/commonStyles';
import { ButtonsGroupWrapper } from '../../styles/commonStyles';
import { SaveButton } from '../ActionButtonsGroup/ActionButtonsGroup.styles';
import { SecuritySettingsContainer } from './SecuritySettings.styles';

export const SecuritySettings = () => {
  const { t } = useTranslation();
  const { updatePassword, error, setError } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);

  const handlePasswordUpdate = async () => {
    setCurrentPasswordError(false);
    setNewPasswordError(false);
    setError(null);

    if (isPasswordValid(newPassword)) {
      const success = await updatePassword(currentPassword, newPassword);
      if (success) {
        setCurrentPasswordError(true);
        alert(t('securitysettings.incorrectCurrentPassword'));
        return;
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
          label={t('securitysettings.currentPassword')}
          type={showPassword ? 'text' : 'password'}
          value={currentPassword}
          onChange={(e) => {
            setCurrentPassword(e.target.value);
            setCurrentPasswordError(false);
            if (error) setError(null);
          }}
          error={currentPasswordError}
          helperText={
            currentPasswordError ? t('common.password.loginErrorMessage') : ''
          }
          startIcon={<Lock />}
          endIcon={
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
        />

        <CustomTextField
          label={t('securitysettings.newPassword')}
          type={showPassword ? 'text' : 'password'}
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setNewPasswordError(false);
            if (error) setError(null);
          }}
          error={newPasswordError}
          helperText={
            newPasswordError ? t('common.password.loginErrorMessage') : ''
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
        <SaveButton
          variant="contained"
          fullWidth
          onClick={handlePasswordUpdate}
        >
          {t('securitysettings.savePassword')}
        </SaveButton>
      </ButtonsGroupWrapper>
    </SecuritySettingsContainer>
  );
};

export default SecuritySettings;
