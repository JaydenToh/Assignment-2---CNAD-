import React from "react";
import Header from "./Header";
import Footer from "./Footer"; // ✅ Import Footer
import "./HomePage.css"; // ✅ Ensure HomePage styles are applied

function HomePage() {
  return (
    <div className="home-container">
      {/* Reusable header at the top */}
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to My Senior App</h1>
          <p>Empowering seniors to live healthy & independent lives.</p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* Some sample sections (features, testimonials, etc.) */}
      <section className="features-section">
        <h2>Why Choose Our App?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Fall Risk Assessment</h3>
            <p>Quickly assess your fall risk at home.</p>
          </div>
          <div className="feature-card">
            <h3>Recommended Exercises</h3>
            <p>Tailored workouts to build strength and stability.</p>
          </div>
          <div className="feature-card">
            <h3>Nearby Clinics</h3>
            <p>Locate the nearest healthcare provider in your area.</p>
          </div>
        </div>
      </section>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}

export default HomePage;
