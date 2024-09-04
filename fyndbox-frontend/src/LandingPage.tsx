import { Container, Typography, Button, Box } from "@mui/material";
import { FC } from "react";

const LandingPage: FC = () => {
  return (
    <Container maxWidth="md">
      <Box textAlign="center" mt={8}>
        <Typography variant="h2" gutterBottom>
          Välkommen till FyndBox
        </Typography>
        <Typography variant="h5" gutterBottom>
          Vi erbjuder en effektiv och smidig lösning för att få fullständig
          kontroll över ditt lager. Med vår webbplatform kan du enkelt
          organisera och hantera dina inventarier genom att lägga till lådor och
          ange bilder samt antal för varje objekt.
        </Typography>
        <Button variant="contained" color="primary" href="#login">
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
