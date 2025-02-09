import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.jpg"; // Ensure correct logo path
import defaultAvatar from "../assets/seniors.png"; // Default profile icon

function Header() {
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || defaultAvatar
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setProfileImage(localStorage.getItem("profileImage") || defaultAvatar);
    };

    window.addEventListener("storage", handleStorageChange); // Listen for localStorage changes

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <header className="header-container">
      {/* Left side: Logo */}
      <div className="header-left">
        <Link to="/home">
          <img src={logo} alt="Company Logo" className="logo" />
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <nav className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/assessment">Assessment</Link>
        <Link to="/exercise">Exercise</Link>
        <Link to="/clinic">Clinic</Link>
        <Link to="/login" className="cta-link">
          Get Started Today
        </Link>
      </nav>

      {/* Right side: Profile Image instead of Icon */}
      <div className="header-right">
        {/* Notification Icon */}
        <button className="icon-btn" title="Notifications">
          <i className="bell-icon">🔔</i>
        </button>
        <Link to="/profile" className="profile-img-link">
          <img
            src={profileImage}
            alt="Profile"
            className="profile-header-img"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
