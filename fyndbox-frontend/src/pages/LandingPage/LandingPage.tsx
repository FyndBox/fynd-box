import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ActionButtonsGroup,
  HomeContainer,
  RegisterButton,
  LoginButton,
  HomeSubContainer,
} from './LandingPage.styles';
import { Typography } from '@mui/material';

const LandingPage: FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <HomeContainer maxWidth="md">
      <HomeSubContainer>
        <Typography variant="h1" mb={8}>
          Välkommen till FyndBox
        </Typography>
        <Typography variant="body1" mb={10}>
          Vi erbjuder en effektiv och smidig lösning för att få fullständig
          kontroll över ditt lager. Med vår webbplatform kan du enkelt
          organisera och hantera dina inventarier genom att lägga till lådor och
          ange bilder samt antal för varje objekt.
        </Typography>
        <ActionButtonsGroup mt={10}>
          <RegisterButton
            fullWidth
            variant="outlined"
            onClick={handleSignupClick}
          >
            Bli medlem
          </RegisterButton>
          <LoginButton fullWidth variant="contained" onClick={handleLoginClick}>
            Logga in
          </LoginButton>
        </ActionButtonsGroup>
      </HomeSubContainer>
    </HomeContainer>
  );
};

export default LandingPage;
