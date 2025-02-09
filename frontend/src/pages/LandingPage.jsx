import React from "react";
import "./LandingPage.css";
import seniorImage from "../assets/landingpage1.webp";
import seniorImage2 from "../assets/landingpage2.webp";

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Stay Active, Stay Independent</h1>
          <p>
            Designed for seniors, our app is simple, secure, and effective in
            helping you stay active and safe.
          </p>
          <button className="schedule-button">Let's Get Started</button>
        </div>
        <div className="hero-image">
          <img
            src={seniorImage} // Replace with the actual image
            alt="Pet"
            className="main-pet-image"
          />
          <img
            src={seniorImage2} // Replace with the smaller pet image
            alt="Small Pet"
            className="small-pet-image"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <img
            src="https://via.placeholder.com/80" // Replace with feature icon/image
            alt="Feature 1"
            className="feature-icon"
          />
          <h3>Title 1</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="feature-card">
          <img
            src="https://via.placeholder.com/80" // Replace with feature icon/image
            alt="Feature 2"
            className="feature-icon"
          />
          <h3>Title 2</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="feature-card">
          <img
            src="https://via.placeholder.com/80" // Replace with feature icon/image
            alt="Feature 3"
            className="feature-icon"
          />
          <h3>Title 3</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
