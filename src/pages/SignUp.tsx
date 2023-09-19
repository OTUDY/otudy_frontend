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
import validator from "validator";
import axios from 'axios';
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [schoolOrOrganization, setSchoolOrOrganization] = useState("");
  const [isStudent] = useState(false);
  // const [urlEndpoint, setUrlEndpoint] = useState('https://backend.otudy.co/api/v1/user/teacher/register');
  const navigate = useNavigate();

  const checkEmailValidity = (email: string) => {
    setEmail(email);
    if (validator.isEmail(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  // const changeRole = () => {
  //   setIsStudent(true);
  // }

  const handleSignUp = async () => {
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
    const body = {
      'email': email,
      'pwd': password,
      'fname': firstName,
      'surname': lastName,
      'phone': telephone,
      'role': Number(isStudent) + 1,
      'affiliation': schoolOrOrganization,
      'class_id': ''
    };

    // if (isStudent) {
    //   await setUrlEndpoint('https://backend.otudy.co/api/v1/user/student/register');
    // };
    
    if (password === confirmPassword) {
      const response = await axios.post('https://backend.otudy.co/api/v1/user/teacher/register/', body, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status == 200 || response.status == 201 || response.status == 202){
        console.log(response.data);
        navigate('/sign-in', { replace: true });
      }
      else {
        console.log(`Account with email: ${email} is already existed.`);
        // Please perform logic to inform user to check their entries.

      }
      
    }

  };

  return (
    <Container maxWidth="xs">
      <div>
        <Typography variant="h4">Sign up</Typography>
        <form>
          <TextField
            label="First Name *"
            fullWidth
            margin="normal"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name *"
            fullWidth
            margin="normal"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <TextField
            label="Confirm Password *"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <TextField
            label="Telephone *"
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
            label="School or Organization *"
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
            disabled={!isEmailValid || email.length === 0}
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
