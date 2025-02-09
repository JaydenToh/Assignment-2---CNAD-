import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import seniorsImage from "../assets/seniors.png"; // Using seniorsImage instead of logo

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Logged in successfully!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", data.userId);

        // Fetch the user role
        try {
          const roleResponse = await fetch(
            `http://localhost:3000/users/${data.userId}/role`
          );
          if (roleResponse.ok) {
            const roleData = await roleResponse.json();
            localStorage.setItem("userRole", roleData.role);
          } else {
            console.error("Error fetching user role.");
          }
        } catch (roleError) {
          console.error("Error fetching user role:", roleError);
        }

        console.log("Logged in:", localStorage.getItem("isLoggedIn"));
        console.log("User ID:", localStorage.getItem("userId"));
        console.log("User Role:", localStorage.getItem("userRole"));

        navigate("/"); // Redirect to homepage
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to log in.");
    }
  };

  return (
    <div className="auth-page">
      {/* Left section with the image */}
      <div className="auth-left">
        <img src={seniorsImage} alt="Mindsphere Seniors" className="logo" />
      </div>

      {/* Right section with the form */}
      <div className="auth-right">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Log in</h2>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-button">
            Log in
          </button>
          <div className="or-section">
            <span></span>
          </div>
          <Link to="/signup">
            <button type="button" className="signup-button">
              Create new account
            </button>
          </Link>
        </form>
        <p className="footer-text">Where learning meets achievement.</p>
      </div>
    </div>
  );
}

export default LoginPage;
