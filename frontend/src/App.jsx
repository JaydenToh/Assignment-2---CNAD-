import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import HealthAssessment from "./pages/HealthAssessment";
import Exercise from "./pages/Exercise";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/assessment" element={<HealthAssessment />} />
      <Route path="/exercise" element={<Exercise />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/" element={<HomePage />} />{" "}
      {/* Default route to HomePage */}
    </Routes>
  );
}

export default App;
