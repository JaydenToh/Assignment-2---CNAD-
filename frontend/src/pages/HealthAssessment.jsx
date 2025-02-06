import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./HealthAssessment.css";
import assessmentIcon from "../assets/seniors.png";
import exerciseIcon from "../assets/seniors.png";
import clinicIcon from "../assets/seniors.png";
import { FiVolume2 } from "react-icons/fi";

function HealthAssessment() {
  return (
    <div className="page-container">
      {/* Header */}
      <Header />

      <main className="health-assessment-container">
        {/* Greeting Section */}
        <div className="greeting-section">
          <div className="greeting-text">
            <h1>Hello, Mr Tan!</h1>
            <p>Welcome to your health assessment</p>
          </div>
          <button
            className="audio-button"
            title="Read Aloud"
            aria-label="Read Aloud"
          >
            <FiVolume2 size={28} />
          </button>
        </div>

        {/* Options Section */}
        <div className="options-section">
          <p className="options-prompt">What would you like to do?</p>
          <div className="options-grid">
            <Link to="/Rules" className="option-card">
              <img src={assessmentIcon} alt="Assessment" />
              <span>Assessment</span>
            </Link>
            <Link to="/exercise" className="option-card">
              <img src={exerciseIcon} alt="Recommended Exercise" />
              <span>Exercise</span>
            </Link>
            <Link to="/clinic" className="option-card">
              <img src={clinicIcon} alt="Clinic Nearby" />
              <span>Clinics Nearby</span>
            </Link>
          </div>
        </div>
      </main>
      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}

export default HealthAssessment;
