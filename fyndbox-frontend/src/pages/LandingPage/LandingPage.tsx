import { Box } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  StyledButton,
  StyledContainer,
  StyledTypography,
} from './LandingPage.styles';

const LandingPage: FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };
  return (
    <StyledContainer maxWidth="md">
      <Box textAlign="center">
        <StyledTypography variant="h1" mb={6}>
          Välkommen till FyndBox
        </StyledTypography>
        <StyledTypography variant="body1" mb={10}>
          Vi erbjuder en effektiv och smidig lösning för att få fullständig
          kontroll över ditt lager. Med vår webbplatform kan du enkelt
          organisera och hantera dina inventarier genom att lägga till lådor och
          ange bilder samt antal för varje objekt.
        </StyledTypography>
        <StyledButton
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLoginClick}
        >
          Logga in
        </StyledButton>
      </Box>
    </StyledContainer>
  );
};

export default LandingPage;
