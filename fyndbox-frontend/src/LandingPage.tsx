import { Container, Typography, Button, Box } from "@mui/material";
import { FC } from "react";

const LandingPage: FC = () => {
  return (
    <Container maxWidth="md">
      <Box textAlign="center" mt={8}>
        <Typography variant="h2" gutterBottom>
          Welcome to FyndBox
        </Typography>
        <Typography variant="h5" gutterBottom>
          Your all-in-one solution for managing your storage.
        </Typography>
        <Button variant="contained" color="primary" href="#login">
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
