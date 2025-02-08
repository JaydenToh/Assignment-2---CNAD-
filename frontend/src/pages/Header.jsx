import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/seniors.png"; // Adjust if needed

function Header() {
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
      </nav>

      {/* Right side: Icons */}
      <div className="header-right">
        {/* Notification Icon */}
        <button className="icon-btn" title="Notifications">
          <i className="bell-icon">🔔</i>
        </button>

        {/* Profile Icon - Links to Profile Page */}
        <Link to="/profile" className="icon-btn" title="Profile">
          <i className="user-icon">👤</i>
        </Link>
      </div>
    </header>
  );
}

export default Header;
