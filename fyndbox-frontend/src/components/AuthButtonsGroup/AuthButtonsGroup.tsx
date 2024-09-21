import { FC } from 'react';

import {
  AuthButtonsWrapper,
  LoginButton,
  RegisterButton,
} from './AuthButtonsGroup.styles';

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
  return (
    <AuthButtonsWrapper>
      {showLoginButton && (
        <LoginButton fullWidth variant="contained" onClick={onLoginClick}>
          Logga in
        </LoginButton>
      )}
      {showRegisterButton && (
        <RegisterButton fullWidth variant="outlined" onClick={onRegisterClick}>
          Bli medlem
        </RegisterButton>
      )}
    </AuthButtonsWrapper>
  );
};

export default AuthButtonsGroup;
