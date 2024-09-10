import './SignupPageStyle';
import { Button, Stack, Typography, TextField, Box } from "@mui/material";
import { StyledSignup} from "./SignupPageStyle";


export const SignupPage =() =>{
    return(
        <StyledSignup maxWidth="sm">
            <Box
            sx={{
                // backgroundColor:'primary.main',
            }}>
            <Stack spacing={4}>
                <Typography variant="h1" gutterBottom mb={4}> Skapa nytt konto</Typography>
                <Stack spacing={4}>
                    <TextField label='Name' variant='standard' />
                    <TextField label="Email@example.com" variant="standard" helperText="*Some important text" />
                    <TextField label='Password' variant='standard' />

                </Stack>
                <Stack spacing={4}>
                    <Button variant="outlined" size="small" color="primary" >Bli meolem</Button>
                </Stack>
            </Stack>
            </Box>
          
        </StyledSignup>

    )
}

export default SignupPage;