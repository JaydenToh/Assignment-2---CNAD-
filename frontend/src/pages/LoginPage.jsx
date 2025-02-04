import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import seniorsImage from "../assets/seniors.png";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Example: call your login endpoint
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, keepLoggedIn }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Login success:", data);
      navigate("/home");
    } else {
      alert(`Login error: ${data.message}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left side: image */}
        <div className="login-left">
          <img src={seniorsImage} alt="Seniors knitting" />
        </div>

        {/* Right side: form */}
        <div className="login-right">
          <h1 className="login-title">Login</h1>
          <p className="login-subtitle">Login your account in a seconds</p>

          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="login-options">
              <div className="checkbox">
                <input
                  id="keepLoggedIn"
                  type="checkbox"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                />
                <label htmlFor="keepLoggedIn" className="checkbox-label">
                  Keep me logged in
                </label>
              </div>
              <Link to="/forgot-password" className="forgot-link">
                Forget password?
              </Link>
            </div>

            <button type="submit" className="login-button">
              Log in
            </button>
          </form>

          <p className="signup-text">
            Don’t have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
