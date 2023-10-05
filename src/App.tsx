import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import Home from "./pages/Home.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Class from "./pages/Class.tsx";
import Landing from "./pages/Landing.tsx";
import ClassRoom from "./pages/ClassRoom.tsx";
import Mission from "./pages/Mission.tsx";
import Reward from "./pages/Reward.tsx";
import MissionStatus from "./pages/MissionStatus.tsx";
import RewardRedeem from "./pages/RewardRedeem.tsx";
import { ClassSubSectionProvider } from "./context/ClassSubSectionContext.tsx";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const About = () => <h1>About Page</h1>;
const Contact = () => <h1>Contact Page</h1>;

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Sarabun'
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
    <ClassSubSectionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/class" element={<Class />} />
          <Route path="/class/:classId" element={<ClassRoom />} />
          <Route path="/class/:classId/mission" element={<Mission />} />
          <Route path="/class/:classId/reward" element={<Reward />} />
          <Route
            path="/class/:classId/reward-redeem"
            element={<RewardRedeem />}
          />
          <Route
            path="/class/:classId/mission-status"
            element={<MissionStatus />}
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </ClassSubSectionProvider>
    </ThemeProvider>
  );
}

export default App;
