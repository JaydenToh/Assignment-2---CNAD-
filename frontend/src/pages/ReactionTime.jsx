import React, { useState } from "react";
import "./ReactionTime.css";
import Header from "./Header";
import Footer from "./Footer";

const ReactionTimeTest = () => {
  const [gameState, setGameState] = useState("idle"); // 'idle' | 'waiting' | 'ready'
  const [reactionTimes, setReactionTimes] = useState([]); // Stores multiple attempts
  const [startTime, setStartTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [attempts, setAttempts] = useState(0); // Track 3 attempts
  const [finalMessage, setFinalMessage] = useState("");

  const startTest = () => {
    if (attempts >= 3) return; // Limit to 3 turns

    setGameState("waiting");
    const randomDelay = Math.floor(Math.random() * 3000) + 2000; // Random delay (2s-5s)

    const id = setTimeout(() => {
      setStartTime(Date.now());
      setGameState("ready");
    }, randomDelay);

    setTimeoutId(id);
  };

  const handleClick = () => {
    if (gameState === "waiting") {
      clearTimeout(timeoutId);
      setGameState("idle");
      alert("Too soon! Try again.");
    } else if (gameState === "ready") {
      const timeTaken = Date.now() - startTime;
      setReactionTimes([...reactionTimes, timeTaken]);
      setAttempts(attempts + 1);
      setGameState("idle");

      if (attempts === 2) {
        calculateFinalScore([...reactionTimes, timeTaken]);
      }
    }
  };

  const calculateFinalScore = async (times) => {
    const total = times.reduce((sum, time) => sum + time, 0);
    let message = "Good";
    if (total >= 20000) message = "High Risk";
    else if (total >= 15000) message = "Okay";

    setFinalMessage(message);

    // Save to backend
    try {
      const response = await fetch("http://localhost:3000/api/reaction-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          test_1: times[0],
          test_2: times[1],
          test_3: times[2],
        }),
      });
      const data = await response.json();
      console.log("Saved to backend:", data);
    } catch (error) {
      console.error("Error saving reaction time:", error);
    }
  };

  return (
    <div className="reaction-test-page">
      <Header />

      {/* Reaction Time Test Section */}
      <div className="reaction-test-container">
        <h1>Reaction Time Test</h1>
        {attempts < 3 && <button onClick={startTest}>Start Test {attempts + 1}/3</button>}
        {gameState === "waiting" && <p>Wait for the color to change...</p>}
        {gameState === "ready" && <p>CLICK NOW!</p>}
        <div className={`reaction-box ${gameState}`} onClick={handleClick}></div>

        {finalMessage && (
          <p className={`result-message ${finalMessage.toLowerCase()}`}>
            Your risk level: {finalMessage}
          </p>
        )}
      </div>

      {/* Instructions Section */}
      <div className="instructions-container">
        <h2>How to Take the Reaction Test</h2>
        <ul>
          <li>Click the "Start Test" button to begin.</li>
          <li>Wait for the screen to turn <span className="green-text">green</span>.</li>
          <li>Click as quickly as possible once it turns green.</li>
          <li>Repeat this 3 times to get your final result.</li>
          <li>Your reaction time will determine your fall risk category.</li>
        </ul>
      </div>

      <Footer />
    </div>
  );
};

export default ReactionTimeTest;
