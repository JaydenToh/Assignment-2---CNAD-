import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css"; // or reuse "Login.css" if they share design
import seniorsImage from "../assets/seniors.png"; // same image or a new one

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // more fields if needed
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signed up successfully!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", data.userId);

        // Optionally fetch user role
        const roleResponse = await fetch(
          `http://localhost:3000/users/${data.userId}/role`
        );
        const roleData = await roleResponse.json();
        if (roleResponse.ok) {
          localStorage.setItem("userRole", roleData.role);
        }

        // Navigate after success
        navigate("/");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Failed to sign up.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        {/* Left side: image */}
        <div className="signup-left">
          <img src={seniorsImage} alt="Seniors knitting" />
        </div>

        {/* Right side: sign-up form */}
        <div className="signup-right">
          <h1 className="signup-title">Sign Up</h1>
          <p className="signup-subtitle">Create your account in a few steps</p>

          <form onSubmit={handleSubmit} className="signup-form">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="signup-button">
              Create Account
            </button>
          </form>

          <p className="login-redirect">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
