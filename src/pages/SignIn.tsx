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

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const checkEmailValidity = (email: string) => {
    setEmail(email);
    if (validator.isEmail(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handleSignIn = () => {
    if (validator.isEmail(email)) {
      // Email is valid, you can proceed with sign-in logic
      console.log("Signing in with email:", email);
    } else {
      // Email is not valid
      setIsEmailValid(false);
    }
  };

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
                <Link href="/sign-up" variant="body2">
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
