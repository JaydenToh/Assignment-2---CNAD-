import React, { useState, useEffect } from "react";
import "./Exercise.css";
import Header from "./Header";
import Footer from "./Footer";

const Exercise = () => {
  const [riskLevel, setRiskLevel] = useState("mild");
  const [exercise, setExercise] = useState({});
  const [progress, setProgress] = useState(0); // Progress starts at 0

  // Fetch exercise details from backend
  useEffect(() => {
    fetch(`http://localhost:5000/api/exercises/${riskLevel}`)
      .then((res) => res.json())
      .then((data) => setExercise(data))
      .catch((error) => console.error("Error fetching exercises:", error));
  }, [riskLevel]);

  // Handle progress update
  const handleProgress = () => {
    const newProgress = progress < 100 ? progress + 10 : 100;
    setProgress(newProgress);
  };

  return (
    <div className="exercise-page">
      <Header /> {/* ✅ Integrated Header Component */}
      <div className="exercise-container">
        <h1>Guided, Adaptive Exercise for Fall Prevention</h1>

        <div className="exercise-selection">
          <h2>Personalized Exercise Routines</h2>
          <p>Select your risk level to get tailored exercises:</p>
          <div className="risk-buttons">
            {["mild", "moderate", "high"].map((level) => (
              <button
                key={level}
                className={`risk-btn ${riskLevel === level ? "active" : ""}`}
                onClick={() => setRiskLevel(level)}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)} Risk
              </button>
            ))}
          </div>

          {exercise.title && (
            <div className="exercise-details">
              <h3>{exercise.title}</h3>
              <p>{exercise.description}</p>
              <ul>
                {exercise.benefits?.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
              {exercise.videoUrl ? (
                <div className="video-container">
                  <video controls>
                    <source src={exercise.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <p>No video available.</p>
              )}
            </div>
          )}
        </div>

        <div className="progress-tracking">
          <h2>Gamification & Progress Tracking</h2>
          <p>
            Progress Goal:{" "}
            {exercise.progressGoal || "Complete exercises daily!"}
          </p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}>
              {progress}%
            </div>
          </div>
          <button className="track-btn" onClick={handleProgress}>
            Complete Exercise
          </button>
        </div>

        <div className="fall-prevention">
          <h2>Fall Prevention & Safety Tips</h2>
          <ul>
            {exercise.safetyTips?.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
      <Footer /> {/* ✅ Integrated Footer Component */}
    </div>
  );
};

export default Exercise;
