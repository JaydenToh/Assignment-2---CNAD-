// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import HealthAssessment from "./pages/HealthAssessment";
import Exercise from "./pages/Exercise";
import Clinic from "./pages/Clinic";
import GeneralTest from "./pages/GeneralTest";
import RulesPage from "./pages/RulesPage";
import ResultPage from "./pages/ResultPage";
import LandingPage from "./pages/LandingPage";
import ReactionTime from "./pages/ReactionTime";
import HealthQuiz from "./pages/HealthQuiz";
import Notification from "./pages/Notification";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/assessment" element={<HealthAssessment />} />
      <Route path="/exercise" element={<Exercise />} />
      <Route path="/clinic" element={<Clinic />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/reaction" element={<ReactionTime />} />
      <Route path="/healthquiz" element={<HealthQuiz />} />
      <Route path="/generalTest" element={<GeneralTest />} />
      <Route path="/rules" element={<RulesPage />} />
      <Route path="/resultTest" element={<ResultPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/notification" element={<Notification />} /> {/* Notification page */}
      <Route path="/" element={<HomePage />} /> {/* Default route to HomePage */}
    </Routes>
  );
}

export default App;