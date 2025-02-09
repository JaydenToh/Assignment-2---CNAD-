import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // Keep everything the same
import "./ProfilePage.css";
import defaultAvatar from "../assets/seniors.png"; // Default profile image

function ProfilePage() {
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    contactNumber: "",
    age: "",
    profileImage: localStorage.getItem("profileImage") || defaultAvatar, // Ensure profile image persists
  });

  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${userId}/details`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          email: data.email || prev.email,
          userName: data.userName || prev.userName,
          contactNumber: data.contactNumber || prev.contactNumber,
          age: data.age || prev.age,
          profileImage:
            localStorage.getItem("profileImage") ||
            data.profileImage ||
            prev.profileImage,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfileImage = reader.result;
        setFormData((prev) => ({
          ...prev,
          profileImage: newProfileImage,
        }));
        localStorage.setItem("profileImage", newProfileImage); // Save to persist after refresh
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        setEditMode(false);
      } else {
        alert("Error updating profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("profileImage"); // Clear profile image on logout
    navigate("/login");
  };

  return (
    <div>
      <Header />

      <div className="account-settings-container">
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

        <main className="settings-content">
          <h2 className="settings-title">Account Settings</h2>
          <form className="settings-box" onSubmit={handleSubmit}>
            <div className="profile-image-section">
              <img
                src={formData.profileImage}
                alt="User Avatar"
                className="profile-img"
              />
              <button
                type="button"
                className="edit-photo-btn"
                onClick={triggerFileInput}
              >
                📷 Change Photo
              </button>
              <input
                type="file"
                accept="image/*"
                className="file-input"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </div>

            <div className="input-group">
              <div className="input-box">
                <label htmlFor="userName">Full Name</label>
                <input
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  disabled={!editMode}
                  required
                />
              </div>
              <div className="input-box">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-box">
                <label htmlFor="contactNumber">Phone Number</label>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </div>
              <div className="input-box">
                <label htmlFor="age">Age</label>
                <input
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  type="number"
                  disabled={!editMode}
                />
              </div>
            </div>

            <div className="button-group">
              {editMode ? (
                <>
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
                </>
              ) : (
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              )}
              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default ProfilePage;
