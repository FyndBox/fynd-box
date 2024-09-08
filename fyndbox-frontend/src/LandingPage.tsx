import { Container, Typography, Button, Box } from "@mui/material";
import bkImage from '../src/assets/banner.jpg'
import { FC } from "react";

const LandingPage: FC = () => {
  return (
    <Container maxWidth="md" sx={{backgroundImage:`url(${bkImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover", paddingTop: '150px', paddingBottom: '250px', backgroundPositionX: 'center'}}>
      <Box textAlign="center">
        <Typography variant="h3" gutterBottom mb={8} sx={{color: '#ffffff'}}>
          Välkommen till FyndBox
        </Typography>
        <Typography variant="h6" gutterBottom mb={10}  sx={{color: '#ffffff'}}>
          Vi erbjuder en effektiv och smidig lösning för att få fullständig
          kontroll över ditt lager. Med vår webbplatform kan du enkelt
          organisera och hantera dina inventarier genom att lägga till lådor och
          ange bilder samt antal för varje objekt.
        </Typography>
        <Button variant="contained" color="primary" href="#login">
          Login
        </Button>
              
      </Box>
      <Typography variant='h1'>heading h1</Typography>
      <Typography variant='h2'>heading h2</Typography>
      <Typography variant='h3'>heading h3</Typography>
    </Container>
  );
};

export default LandingPage;
