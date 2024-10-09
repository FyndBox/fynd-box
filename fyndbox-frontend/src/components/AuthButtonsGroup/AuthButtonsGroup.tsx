import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginButton, RegisterButton } from './AuthButtonsGroup.styles';
import { ButtonsGroupWrapper } from '../../styles/commonStyles';

interface AuthButtonsGroupProps {
  showLoginButton?: boolean;
  showRegisterButton?: boolean;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

const AuthButtonsGroup: FC<AuthButtonsGroupProps> = ({
  showLoginButton = true,
  showRegisterButton = true,
  onLoginClick,
  onRegisterClick,
}) => {
  const { t } = useTranslation();
  return (
    <ButtonsGroupWrapper>
      {showLoginButton && (
        <LoginButton fullWidth variant="contained" onClick={onLoginClick}>
          {t('login.submit')}
        </LoginButton>
      )}
      {showRegisterButton && (
        <RegisterButton fullWidth variant="outlined" onClick={onRegisterClick}>
          {t('signup.submit')}
        </RegisterButton>
      )}
    </ButtonsGroupWrapper>
  );
};

export default AuthButtonsGroup;
