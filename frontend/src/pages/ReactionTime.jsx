import React, { useState } from "react";
import "./ReactionTime.css";
import Header from "./Header";
import Footer from "./Footer";

const ReactionTimeTest = () => {
  const [gameState, setGameState] = useState("idle"); // 'idle' | 'waiting' | 'tooSoon' | 'ready' | 'result' | 'complete'
  const [reactionTimes, setReactionTimes] = useState([]); // Stores multiple attempts
  const [startTime, setStartTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [attempts, setAttempts] = useState(0); // Track 3 attempts
  const [currentReactionTime, setCurrentReactionTime] = useState(null);
  const [finalMessage, setFinalMessage] = useState("");

  const startTest = () => {
    if (attempts >= 3) return; // Limit to 3 turns

    setGameState("waiting");
    setCurrentReactionTime(null);

    const randomDelay = Math.floor(Math.random() * 3000) + 2000; // 2s-5s delay

    const id = setTimeout(() => {
      setStartTime(Date.now());
      setGameState("ready");
    }, randomDelay);

    setTimeoutId(id);
  };

  const handleClick = () => {
    if (gameState === "waiting") {
      clearTimeout(timeoutId);
      setGameState("tooSoon"); // Change state to tooSoon
      return;
    }

    if (gameState === "ready") {
      const timeTaken = (Date.now() - startTime) / 1000; // Convert ms to seconds
      setCurrentReactionTime(timeTaken.toFixed(2) + " seconds"); // Round to 2 decimal places
      setReactionTimes([...reactionTimes, timeTaken]);
      setAttempts(attempts + 1);

      if (attempts === 2) {
        calculateFinalScore([...reactionTimes, timeTaken]);
      } else {
        setGameState("result"); // Switch to result screen
      }
    }
  };

  const calculateFinalScore = async (times) => {
    const total = times.reduce((sum, time) => sum + time, 0);
    let message = "Good";
    if (total >= 20) message = "High Risk"; // Adjusted for seconds
    else if (total >= 15) message = "Okay";

    setFinalMessage(message);
    setGameState("complete"); // Change gameState to "complete"

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

      {/* Reaction Test Box (TOP) */}
      <div className={`reaction-test-container ${gameState}`} onClick={gameState === "ready" || gameState === "waiting" ? handleClick : null}>
        {gameState === "idle" && (
          <div className="reaction-box idle">
            <h1>Reaction Time Test</h1>
            <p>Click the button to start the test.</p>
            <button className="start-btn" onClick={startTest}>
              Start Test ({attempts + 1}/3)
            </button>
          </div>
        )}

        {gameState === "waiting" && (
          <div className="reaction-box waiting">
            <p className="big-white-text">Wait for <br /> green...</p>
          </div>
        )}

        {gameState === "tooSoon" && (
          <div className="reaction-box tooSoon">
            <p className="big-text">Clicked too soon!</p>
            <button className="start-btn" onClick={startTest}>Try Again</button>
          </div>
        )}

        {gameState === "ready" && (
          <div className="reaction-box ready">
            <p className="big-white-text">CLICK NOW!</p>
          </div>
        )}

        {gameState === "result" && (
          <div className="reaction-box result">
            <p className="big-text">Your reaction time: <strong>{currentReactionTime}</strong></p>
            <button className="start-btn" onClick={startTest}>
              Next Test ({attempts + 1}/3)
            </button>
          </div>
        )}

        {gameState === "complete" && (
          <div className={`reaction-box final ${finalMessage.toLowerCase().replace(" ", "-")}`}>
            <h1>Test Complete!</h1>
            <p className="big-text">Your Risk Level:</p>
            <h2 className={`risk-text ${finalMessage.toLowerCase().replace(" ", "-")}`}>{finalMessage}</h2>
          </div>
        )}
      </div>

      {/* Instructions Section (BOTTOM) */}
      <div className="instructions-container">
        <div className="instruction-step" data-step="1">
          Click on <span className="highlight">"Start Test"</span>.
        </div>
        <div className="instruction-step" data-step="2">
          Wait for the screen <br /> to turn green.
        </div>
        <div className="instruction-step" data-step="3">
          Repeat the test <br /> 3 times.
        </div>
        <div className="instruction-step" data-step="4">
          Your reaction time <br />determines your eye safety.
        </div>
       
      </div>

      <Footer />
    </div>
  );
};

export default ReactionTimeTest;
