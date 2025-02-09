import React, { useState } from "react";
import "./ReactionTime.css";
import Header from "./Header";
import Footer from "./Footer";

const ReactionTimeTest = () => {
  const [gameState, setGameState] = useState("idle");
  const [reactionTimes, setReactionTimes] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [currentReactionTime, setCurrentReactionTime] = useState(null);
  const [finalMessage, setFinalMessage] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [warningMessage, setWarningMessage] = useState("");

  const startTest = () => {
    if (attempts >= 3) return;

    setGameState("waiting");
    setCurrentReactionTime(null);

    const randomDelay = Math.floor(Math.random() * 3000) + 2000;

    const id = setTimeout(() => {
      setStartTime(Date.now());
      setGameState("ready");
    }, randomDelay);

    setTimeoutId(id);
  };

  const handleClick = () => {
    if (gameState === "waiting") {
      clearTimeout(timeoutId);
      setGameState("tooSoon");
      return;
    }

    if (gameState === "ready") {
      const timeTaken = (Date.now() - startTime) / 1000;
      setCurrentReactionTime(timeTaken.toFixed(2) + " seconds");
      setReactionTimes([...reactionTimes, timeTaken]);
      setAttempts(attempts + 1);

      if (attempts === 2) {
        calculateFinalScore([...reactionTimes, timeTaken]);
      } else {
        setGameState("result");
      }
    }
  };

  const calculateFinalScore = async (times) => {
    const total = times.reduce((sum, time) => sum + time, 0);
    setTotalTime(total.toFixed(2));

    let message = "Low";
    let warning = "";

    if (total >= 2.5) {
      message = "High Risk";
      warning =
        "⚠️ WARNING: Your reaction time suggests a higher fall risk. Vulnerable cases should undergo further clinical assessment by a doctor.";
    } else if (total >= 1.5) {
      message = "Okay";
    }

    setFinalMessage(message);
    setWarningMessage(warning);
    setGameState("complete");

    try {
      const response = await fetch("http://localhost:3000/api/reaction-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          test_1: times[0],
          test_2: times[1],
          test_3: times[2],
          total_time: total,
          result_category: message,
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

      <div
        className={`reaction-test-container ${gameState}`}
        onClick={
          gameState === "ready" || gameState === "waiting" ? handleClick : null
        }
      >
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
            <p className="big-white-text">Wait for green...</p>
          </div>
        )}

        {gameState === "tooSoon" && (
          <div className="reaction-box tooSoon">
            <p className="big-text">Clicked too soon!</p>
            <button className="start-btn" onClick={startTest}>
              Try Again
            </button>
          </div>
        )}

        {gameState === "ready" && (
          <div className="reaction-box ready">
            <p className="big-white-text">CLICK NOW!</p>
          </div>
        )}

        {gameState === "result" && (
          <div className="reaction-box result">
            <p className="big-text">
              Your reaction time: <strong>{currentReactionTime}</strong>
            </p>
            <button className="start-btn" onClick={startTest}>
              Next Test ({attempts + 1}/3)
            </button>
          </div>
        )}

        {gameState === "complete" && (
          <div
            className={`reaction-box final ${finalMessage
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            <h1>Test Complete!</h1>
            <p className="big-text">Your Risk Level:</p>
            <h2
              className={`risk-text ${finalMessage
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {finalMessage}
            </h2>
            <p className="big-text">
              Total Time Taken: <strong>{totalTime} seconds</strong>
            </p>

            {finalMessage === "High Risk" && (
              <p className="warning-text">{warningMessage}</p>
            )}
          </div>
        )}
      </div>

      <div className="instructions-container">
        <div className="instruction-step" data-step="1">
          Click on "Start Test".
        </div>
        <div className="instruction-step" data-step="2">
          Wait for the screen <br /> to turn green.
        </div>
        <div className="instruction-step" data-step="3">
          If you click too early, <br /> you must restart.
        </div>
        <div className="instruction-step" data-step="4">
          Repeat the test <br /> 3 times.
        </div>
        <div className="instruction-step" data-step="5">
          Your reaction time <br /> determines your fall risk.
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReactionTimeTest;
