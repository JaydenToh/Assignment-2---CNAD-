import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./ProfilePage.css";
import userAvatar from "../assets/user-avatar.png"; // Placeholder avatar

function ProfilePage() {
  const [user, setUser] = useState({
    firstName: "Sara",
    lastName: "Tancredi",
    email: "sara.tancredi@gmail.com",
    phone: "+65 9123 4567",
    location: "New York, USA",
    postalCode: "23728167",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-container">
      <Header />

      <div className="profile-layout">
        {/* Sidebar - Only 'User Info' & 'Logout' */}
        <aside className="sidebar">
          <h2>User Profile</h2>
          <nav>
            <Link to="/profile" className="active">
              👤 User Info
            </Link>
          </nav>
          <button className="logout-btn">🔴 Log out</button>
        </aside>

        {/* Profile Content */}
        <section className="profile-content">
          <div className="profile-header">
            <img src={userAvatar} alt="User Avatar" className="profile-img" />
            <div>
              <h2 className="user-name">
                {user.firstName} {user.lastName}
              </h2>
              <p className="user-location">{user.location}</p>
            </div>
          </div>

          <div className="profile-form">
            <div className="form-row">
              <div className="input-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={user.location}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={user.postalCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button className="save-btn">Save Changes</button>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default ProfilePage;
