import { FC } from 'react';

import {
  AuthButtonsWrapper,
  LoginButton,
  RegisterButton,
} from './AuthButtonsGroup.styles';
import { useTranslation } from 'react-i18next';

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
    <AuthButtonsWrapper>
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
    </AuthButtonsWrapper>
  );
};

export default AuthButtonsGroup;
