import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from "@mui/material";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
  const [isStudent] = useState(false);
  const navigate = useNavigate();
  const [_, setCookie] = useCookies(['access_token']);

  const checkEmailValidity = (email: string) => {
    setEmail(email);
    if (validator.isEmail(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handleSignIn = async () => {
    if (validator.isEmail(email)) {
      // Email is valid, you can proceed with sign-in logic
      console.log("Signing in with email:", email);
      const url = "https://backend.otudy.co/api/v1/user/login"; // Replace with your OAuth2 token endpoint
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password.toString());
      formData.append('client_id', (Number(isStudent) + 1).toString());
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      // document.cookie = response.data.access_token;
      //localStorage.setItem("token", response.data.access_token);
      setCookie('access_token', response.data.access_token);
      console.log('Login completed! Navigating to section page.')
      navigate("/section", { replace: true });
  
    } catch (error) {
      console.error('Error:', error);
    }
    }
    else {
      setIsEmailValid(false);
      console.log("Login failed!");
      setErrorMessage("Incorrect email or password. Please try again."); // Set the error message

        // Show false modal here

        
      }};
    

  return (
    <Container maxWidth="xs">
      <div>
        <Typography variant="h4">Sign in</Typography>

        <Typography variant="body1" marginTop={"8px"}>
          {" "}
          Enter email and password to sign in{" "}
        </Typography>
        <form>
          <TextField
            label="Email *"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => checkEmailValidity(e.target.value)}
            error={!isEmailValid} // Apply error style if email is invalid
            helperText={!isEmailValid && "Invalid email format"}
          />
          <TextField
            label="Password *"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && ( // Render the error message if it exists
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignIn}
            sx={{ marginTop: "16px", marginBottom: "16px" }}
            disabled={!isEmailValid || email.length === 0}
          >
            Sign In
          </Button>
        </form>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Link href="/forgot-password" variant="body2">
              Forgot Password?
            </Link>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <Typography variant="body2">Don't have an account?</Typography>
              </Grid>
              <Grid item>
                <Link
                  variant="body2"
                  onClick={() => {
                    navigate("/sign-up", { replace: true });
                  }}
                >
                  Sign up
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default SignIn;
