import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.png"; // Adjust path

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
        <button className="translate-btn" title="Change Language">
          <span>A</span>
          <span style={{ fontSize: "0.8em", marginLeft: "4px" }}>言</span>
        </button>

        <button className="icon-btn" title="Notifications">
          <i className="bell-icon">🔔</i>
        </button>

        <button className="icon-btn" title="Profile">
          <i className="user-icon">👤</i>
        </button>
      </div>
    </header>
  );
}

export default Header;
