// src/components/LandingPage.tsx
import { Button, Box } from "@mui/material";
import { FC } from "react";
import { StyledContainer, StyledTypography } from "./LandingPageStyles";

const LandingPage: FC = () => {
  return (
    <StyledContainer maxWidth="md">
      <Box textAlign="center">
        <StyledTypography variant="h3" gutterBottom mb={8}>
          Välkommen till FyndBox
        </StyledTypography>
        <StyledTypography variant="h6" gutterBottom mb={10}>
          Vi erbjuder en effektiv och smidig lösning för att få fullständig
          kontroll över ditt lager. Med vår webbplatform kan du enkelt
          organisera och hantera dina inventarier genom att lägga till lådor och
          ange bilder samt antal för varje objekt.
        </StyledTypography>
        <Button variant="contained" color="primary" href="#login">
          Login
        </Button>
      </Box>
    </StyledContainer>
  );
};

export default LandingPage;
