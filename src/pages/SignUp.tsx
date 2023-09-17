import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [schoolOrOrganization, setSchoolOrOrganization] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Handle sign-up logic here (e.g., send a request to your authentication server)
    console.log("Signing up with data:", {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      telephone,
      schoolOrOrganization,
    });
    navigate("/section", { replace: true });
  };

  return (
    <Container maxWidth="xs">
      <div>
        <Typography variant="h4">Sign up</Typography>
        <form>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <TextField
            label="Telephone"
            fullWidth
            margin="normal"
            variant="outlined"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
          {/* <PhoneInput
            placeholder="Enter phone number"
            value={value}
            onChange={setValue}
          /> */}

          <TextField
            label="School or Organization"
            fullWidth
            margin="normal"
            variant="outlined"
            value={schoolOrOrganization}
            onChange={(e) => setSchoolOrOrganization(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </form>
        <Grid container justifyContent="center">
          <Grid item>
            <Link
              variant="body2"
              onClick={() => {
                navigate("/sign-in", { replace: true });
              }}
            >
              Already have an account? Sign In
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default SignUp;
