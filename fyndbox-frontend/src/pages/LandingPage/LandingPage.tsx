import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import AuthButtonsGroup from '../../components/AuthButtonsGroup/AuthButtonsGroup';
import { HomeContainer, HomeSubContainer } from './LandingPage.styles';

const LandingPage: FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <HomeContainer>
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
        <AuthButtonsGroup
          onLoginClick={handleLoginClick}
          onRegisterClick={handleSignupClick}
        />
      </HomeSubContainer>
    </HomeContainer>
  );
};

export default LandingPage;
