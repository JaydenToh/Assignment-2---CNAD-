import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./GeneralTest.css"; // Create this CSS file for styling
import { FiVolume2 } from "react-icons/fi";

function GeneralTest() {
  return (
    <div className="page-container">
      {/* Header */}
      <Header />

      <main className="general-test-container">
        <h1>General Test</h1>
        <p>Answer the question below</p>

        <div className="question-section">
          <img
            src="https://via.placeholder.com/150" // Replace with actual image
            alt="Leg condition"
            className="question-image"
          />
          <div className="question-text">
            <h2>Question 1/5</h2>
            <p>Are you got leg condition?</p>
          </div>
          <button className="audio-button" title="Read Aloud">
            <FiVolume2 size={24} />
          </button>
        </div>

        <div className="answers-section">
          <button className="answer-button">Always Very Pain</button>
          <button className="answer-button">Sometimes Pain</button>
          <button className="answer-button">Seldom Pain</button>
          <button className="answer-button">No Problem</button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default GeneralTest;
