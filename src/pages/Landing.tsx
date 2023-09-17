import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const handleSignInClick = () => {
    navigate("/sign-in", { replace: true });
  };
  const handleSignUpClick = () => {
    navigate("/sign-up", { replace: true });
  };

  return (
    <div>
      <h1>Welcome to Our App</h1>
      <div className="feature-text">
        <p>
          App Feature 1: Lorem ipsum dolor sit amet, consectetur adipiscing
          elit.
        </p>
        <p>
          App Feature 2: Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
        <p>
          App Feature 3: Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className="action-buttons">
        <Button
          variant="contained"
          color="primary"
          className="sign-in-button"
          onClick={handleSignInClick}
        >
          Sign In
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="sign-up-button"
          onClick={handleSignUpClick}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};
export default Landing;
