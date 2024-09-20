import InputAdornment from '@mui/material/InputAdornment';
import { IconButton,TextField } from '@mui/material';
import {  Email, Lock, AccountCircle,Visibility, VisibilityOff} from '@mui/icons-material';
import {
  SignupContainer,
  SignupHeader,
  RegisterButton,
  ActionButtonsGroup,
  TextFieldsContainer,
} from './SignupPage.styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, error, setError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Function to validate the name input: no numbers and not empty
  const validateName = (name: string) => {
    const regex = /^[A-Za-z\s]+$/; // Only letters and spaces
    if (!name) {
      setNameError('Name cannot be empty.');
      return false;
    } else if (!regex.test(name)) {
      setNameError('Name should only contain letters and spaces.');
      return false;
    } else if (password.length > 20) {
      setPasswordError('Password cannot exceed 20 characters.');
      return false;
    } else {
      setNameError('');
      return true;
    }
  };

  // Function to validate email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError('Please provide a valid email address.');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  // Function to validate password
  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{1,20}$/;
    if (!password) {
      setPasswordError('Password cannot be empty.');
      return false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError('Password must include letters, numbers, and special characters.');
      return false;
    } else if (password.length > 20) {
      setPasswordError('Password cannot exceed 20 characters.');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  // Function to handle form submission
  const handleSignupClick = async () => {
    const isNameValid = validateName(name);
    const isEmailValid = isValidEmail(email);
    const isPasswordValid = isValidPassword(password);

    if (isNameValid && isEmailValid && isPasswordValid) {
      const success = await signup(name, email, password); // Call signup function from your auth context
      if (success) {
        alert('Signup successful!');
        navigate('/dashboard'); // Redirect after successful signup
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <SignupContainer>
      <SignupHeader variant="h2">Skapa nytt konto</SignupHeader>

      <TextFieldsContainer>
        <TextField
          fullWidth
          margin="normal"
          label="Namn"
          placeholder="John Doe"
          variant="standard"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(null); // Clear error from previous attempt
          }}
          error={!!nameError}
          helperText={nameError}
          inputProps={{ maxLength: 20 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          type="email"
          placeholder="example@domain.com"
          label="Email"
          variant="standard"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          error={!!emailError}
          helperText={emailError}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Lösenord"
          placeholder=""
          variant="standard"
          inputProps={{ maxLength: 20 }}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError(null);
          }}
          error={!!passwordError}
          helperText={passwordError}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </TextFieldsContainer>

      <ActionButtonsGroup>
        <RegisterButton
          fullWidth
          variant="outlined"
          onClick={handleSignupClick}
        >
          Bli medlem
        </RegisterButton>
      </ActionButtonsGroup>
    </SignupContainer>
  );
};

export default SignupPage;
