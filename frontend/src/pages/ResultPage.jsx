import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./ResultPage.css";

function ResultPage() {
  return (
    <div className="page-container">
      {/* Header */}
      <Header />

      <main className="result-container">
        <h1>Your Test Results</h1>

        {/* Risk Status */}
        <div className="result-status high">
          <h2>You are High Risk</h2>
        </div>

        {/* Score Section */}
        <div className="score-section">
          <h3>Your Score:</h3>
          <p className="score">85</p>
        </div>

        {/* Risk Areas Section */}
        <div className="risk-areas-section">
          <h3>Areas to Focus On:</h3>
          <ul>
            <li>Leg Pain</li>
            <li>Knee Stiffness</li>
          </ul>
        </div>

        {/* Suggested Exercises Section */}
        <div className="suggestions-section">
          <h3>Suggested Exercises:</h3>
          <ul>
            <li>Walking</li>
            <li>Leg Stretches</li>
            <li>Yoga</li>
          </ul>
        </div>

        {/* Return to Home Button */}
        <button className="return-home-button">Return to Home</button>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ResultPage;
