import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import userAvatar from "../assets/seniors.png"; // Placeholder image

function ProfilePage() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+65 9123 4567",
    address: "123 Senior Home, Singapore",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <img src={userAvatar} alt="Profile" className="profile-img" />
        <button className="upload-btn">📷 Upload Photo</button>
        <ul className="sidebar-menu">
          <li className="active">👤 Profile</li>
          <li>⚙️ Settings</li>
          <li>🚪 Log Out</li>
        </ul>
      </div>

      <div className="profile-main">
        <h1 className="profile-title">Profile</h1>

        <div className="profile-info">
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <label>Home Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <button className="update-profile-btn">Update Information</button>
      </div>
    </div>
  );
}

export default ProfilePage;
