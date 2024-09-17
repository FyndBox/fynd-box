import { Box } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ButtonGroup,
  OutlinedButton,
  StyledButton,
  StyledContainer,
  StyledTypography,
} from './LandingPage.styles';

const LandingPage: FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <StyledContainer maxWidth="md">
      <Box textAlign="center" pt={6}>
        <StyledTypography variant="h1" mb={6}>
          Välkommen till FyndBox
        </StyledTypography>
        <StyledTypography variant="body1" mb={10}>
          Vi erbjuder en effektiv och smidig lösning för att få fullständig
          kontroll över ditt lager. Med vår webbplatform kan du enkelt
          organisera och hantera dina inventarier genom att lägga till lådor och
          ange bilder samt antal för varje objekt.
        </StyledTypography>
        <ButtonGroup>
          <StyledButton
            fullWidth
            variant="contained"
            onClick={handleLoginClick}
          >
            Logga in
          </StyledButton>

          <OutlinedButton
            fullWidth
            variant="outlined"
            onClick={handleSignupClick}
          >
            Bli medlem
          </OutlinedButton>
        </ButtonGroup>
      </Box>
    </StyledContainer>
  );
};

export default LandingPage;
