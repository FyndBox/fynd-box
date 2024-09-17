import { FC } from 'react';
import { InputAdornment, TextField, Typography } from '@mui/material';
import { MailOutline, LockOutlined } from '@mui/icons-material';
import {
  LoginFormContainer,
  StyledButton,
  OutlinedButton,
  StyledHeader,
  ButtonGroup,
} from './LoginPage.styles';

const LoginPage: FC = () => {
  return (
    <LoginFormContainer>
      <StyledHeader variant="h2">Logga in</StyledHeader>

      <TextField
        fullWidth
        label="Email"
        variant="outlined"
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
        variant="outlined"
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

      <ButtonGroup>
        <StyledButton fullWidth variant="contained">
          Logga in
        </StyledButton>

        <OutlinedButton fullWidth variant="outlined">
          Bli medlem
        </OutlinedButton>
      </ButtonGroup>
    </LoginFormContainer>
  );
};

export default LoginPage;
