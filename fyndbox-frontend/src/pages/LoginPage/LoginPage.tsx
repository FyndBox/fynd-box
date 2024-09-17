import { FC } from 'react';
import { InputAdornment, TextField, Typography } from '@mui/material';
import { MailOutline, LockOutlined } from '@mui/icons-material';
import {
  LoginFormContainer,
  LoginHeader,
  LoginFormSubContainer,
  ActionButtonsGroup,
} from './LoginPage.styles';
import { LoginButton, RegisterButton } from '../LandingPage/LandingPage.styles';
import { useNavigate } from 'react-router-dom';

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <LoginFormContainer maxWidth="md">
      <LoginFormSubContainer>
        <LoginHeader variant="h2">Logga in</LoginHeader>

        <TextField
          fullWidth
          label="Email"
          variant="standard"
          margin="normal"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutline />
                </InputAdornment>
              ),
            },
          }}
        />

        <Typography variant="caption" color="error">
          * Vänligen ange giltig e-postadress
        </Typography>

        <TextField
          fullWidth
          label="Lösenord"
          variant="standard"
          margin="normal"
          type="password"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),
            },
          }}
        />

        <ActionButtonsGroup pt={10}>
          <LoginButton fullWidth variant="contained" onClick={handleLoginClick}>
            Logga in
          </LoginButton>
          <RegisterButton
            fullWidth
            variant="outlined"
            onClick={handleSignupClick}
          >
            Bli medlem
          </RegisterButton>
        </ActionButtonsGroup>
      </LoginFormSubContainer>
    </LoginFormContainer>
  );
};

export default LoginPage;
