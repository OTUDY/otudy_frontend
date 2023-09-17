import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import Home from "./pages/Home.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Section from "./pages/Section.tsx";
import Landing from "./pages/Landing.tsx";
import ClassRoom from "./pages/ClassRoom.tsx";

const About = () => <h1>About Page</h1>;
const Contact = () => <h1>Contact Page</h1>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/section" element={<Section />} />
        <Route path="/class/:classId" element={<ClassRoom />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
