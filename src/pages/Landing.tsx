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
      <h2>ยินดีต้อนรับเข้าสู่แอปพลิเคชัน OTUDY (โอทูดี้)</h2>
      <div className="feature-text">
        <p> แอปพลิเคชันเพื่อการจัดการห้องเรียนและเสริมสร้างการเรียนรู้ด้วยการจูงใจด้วยการทำภารกิจและของรางวัล</p>
      </div>
      <div className="action-buttons">
        <Button
          variant="contained"
          color="primary"
          className="sign-in-button"
          onClick={handleSignInClick}
        >
          เข้าสู่ระบบ
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="sign-up-button"
          onClick={handleSignUpClick}
        >
          สมัครสมาชิก
        </Button>
      </div>
    </div>
  );
};
export default Landing;
