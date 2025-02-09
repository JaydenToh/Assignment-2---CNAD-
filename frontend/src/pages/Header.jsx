import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.jpg"; // Ensure correct logo path
import defaultAvatar from "../assets/seniors.png"; // Default profile icon

function Header() {
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || defaultAvatar
  );
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const handleStorageChange = () => {
      setProfileImage(localStorage.getItem("profileImage") || defaultAvatar);
    };

    window.addEventListener("storage", handleStorageChange); // Listen for localStorage changes

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleNotificationClick = () => {
    navigate("/notification"); // Navigate to the notification page
  };

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

      {/* Right side: Profile Image and Notifications */}
      <div className="header-right">
        {/* Notification Button */}
        <button
          className="icon-btn"
          title="Notifications"
          onClick={handleNotificationClick}
        >
          <i className="bell-icon">🔔</i>
        </button>
        {/* Profile Image */}
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
