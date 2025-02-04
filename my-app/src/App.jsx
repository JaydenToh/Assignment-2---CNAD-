import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  // For simplicity, track auth state here
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage setAuth={setIsAuthenticated} />}
      />
      <Route
        path="/signup"
        element={<SignUpPage setAuth={setIsAuthenticated} />}
      />
      <Route
        path="/home"
        element={
          isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/profile"
        element={
          isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
