import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import seniorsImage from "../assets/seniors.png"; // Ensure this file exists

function SignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    contactNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure contactNumber is a number and within length range
    const contactRegex = /^[0-9]+$/;
    if (!contactRegex.test(formData.contactNumber)) {
      alert("Contact number must contain only numbers.");
      return;
    }

    if (
      formData.contactNumber.length < 8 ||
      formData.contactNumber.length > 15
    ) {
      alert("Contact number must be between 8 and 15 digits.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Sign up successful!");
        navigate("/login"); // Redirect to login page after successful signup
      } else {
        alert(`Error: ${data.message}`);
        console.error(data.errors); // Log Joi validation errors for debugging
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Failed to sign up.");
    }
  };

  return (
    <div className="auth-page">
      {/* Left section with the image */}
      <div className="auth-left">
        <img src={seniorsImage} alt="Seniors Illustration" className="logo" />
      </div>

      {/* Right section with the form */}
      <div className="auth-right">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Create a new account</h2>
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
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
          <p className="terms">
            By clicking Sign Up, you agree to our{" "}
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              Terms
            </a>
            ,{" "}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/cookies-policy" target="_blank" rel="noopener noreferrer">
              Cookies Policy
            </a>
            .
          </p>
          <button type="submit" className="signup-button">
            Sign up
          </button>
        </form>
        <p className="footer-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
