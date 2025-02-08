import React, { useState } from "react";
import Header from "./Header"; // Adjust the path if Header.jsx is located in a different folder
import "./ProfilePage.css";
import userAvatar from "../assets/seniors.png"; // Placeholder avatar

function ProfilePage() {
  const [formData, setFormData] = useState({
    email: "johndoe@example.com",
    name: "John Doe",
    phone: "+65 9123 4567",
    address: "123 Senior Home, Singapore",
    lunch: "-- None --",
    age: "",
    interest: "",
    subscribe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement saving logic (e.g., API call)
    console.log("Saved changes:", formData);
  };

  const handleCancel = () => {
    // TODO: Implement cancel logic (e.g., reset form or navigate away)
    console.log("Cancelled changes");
  };

  return (
    <div>
      {/* Include the header component */}
      <Header />

      <div className="account-settings-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <button className="sidebar-btn active" aria-label="Profile">
            <span role="img" aria-hidden="true">
              👤
            </span>{" "}
            Profile
          </button>
          <button className="sidebar-btn" aria-label="Settings">
            <span role="img" aria-hidden="true">
              ⚙️
            </span>{" "}
            Settings
          </button>
        </aside>

        {/* Settings / Profile Content */}
        <main className="settings-content">
          <h2 className="settings-title">Account Settings</h2>
          <form className="settings-box" onSubmit={handleSubmit}>
            {/* Profile Image Section */}
            <div className="profile-image-section">
              <img src={userAvatar} alt="User Avatar" className="profile-img" />
              <button
                type="button"
                className="edit-photo-btn"
                onClick={() => console.log("Edit photo clicked")}
              >
                📷 Edit Photo
              </button>
            </div>

            {/* Input Fields */}
            <div className="input-group">
              <div className="input-box">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-box">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-box">
                <label htmlFor="age">Age</label>
                <input
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  type="number"
                />
              </div>
              <div className="input-box">
                <label htmlFor="interest">Interests</label>
                <input
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-box">
                <label htmlFor="lunch">Lunch Preference</label>
                <select
                  id="lunch"
                  name="lunch"
                  value={formData.lunch}
                  onChange={handleChange}
                  className="select-input"
                >
                  <option value="-- None --">-- None --</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
              </div>
            </div>

            <div className="checkbox-group">
              <label htmlFor="subscribe">
                <input
                  type="checkbox"
                  id="subscribe"
                  name="subscribe"
                  checked={formData.subscribe}
                  onChange={handleChange}
                />
                Subscribe to newsletter
              </label>
            </div>

            {/* Action Buttons */}
            <div className="button-group">
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default ProfilePage;
