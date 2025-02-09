import React, { useState, useEffect } from "react";
import Header from "./Header"; // Adjust the path if needed
import "./ProfilePage.css";
import userAvatar from "../assets/seniors.png"; // Placeholder avatar

function ProfilePage() {
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    contactNumber: "",
    age: "",
  });

  const [editMode, setEditMode] = useState(false);

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
        setFormData({
          email: data.email || "",
          userName: data.userName || "",
          contactNumber: data.contactNumber || "",
          age: data.age || "",
        });
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
              <img src={userAvatar} alt="User Avatar" className="profile-img" />
              <button
                type="button"
                className="edit-photo-btn"
                onClick={() => console.log("Edit photo clicked")}
              >
                📷 Edit Photo
              </button>
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
                  disabled={!editMode} // Now email is editable when "Edit Profile" is clicked
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
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default ProfilePage;
