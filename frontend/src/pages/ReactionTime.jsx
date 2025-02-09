import React, { useState } from "react";
import "./ReactionTime.css";
import Header from "./Header";
import Footer from "./Footer";

const translations = {
  en: {
    title: "Reaction Time Test",
    startTest: "Start Test",
    waitGreen: "Wait for green...",
    tooSoon: "Clicked too soon!",
    tryAgain: "Try Again",
    clickNow: "CLICK NOW!",
    yourTime: "Your reaction time:",
    nextTest: "Next Test",
    testComplete: "Test Complete!",
    riskLevel: "Your Risk Level:",
    totalTime: "Total Time Taken:",
    warningHighRisk: "⚠️ WARNING: Your reaction time suggests a higher fall risk. Vulnerable cases should undergo further clinical assessment by a doctor.",
    instructions: [
      "Click on 'Start Test'.",
      "Wait for the screen to turn green.",
      "If you click too early, you must restart.",
      "Repeat the test 3 times.",
      "Your reaction time determines your fall risk."
    ]
  },
  zh: {
    title: "反应时间测试",
    startTest: "开始测试",
    waitGreen: "等待变绿...",
    tooSoon: "点击太早了！",
    tryAgain: "再试一次",
    clickNow: "立即点击！",
    yourTime: "您的反应时间：",
    nextTest: "下一次测试",
    testComplete: "测试完成！",
    riskLevel: "您的风险等级：",
    totalTime: "总用时：",
    warningHighRisk: "⚠️ 警告：您的反应时间表明您有较高的跌倒风险。易受伤害的情况应接受医生的进一步临床评估。",
    instructions: [
      "点击“开始测试”。",
      "等待屏幕变绿。",
      "如果您过早点击，则必须重新开始。",
      "重复测试3次。",
      "您的反应时间决定您的跌倒风险。"
    ]
  }
};

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
  const [language, setLanguage] = useState("en");

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
      warning = translations[language].warningHighRisk;
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
      
      {/* Language Switcher */}
      <div className="language-switch">
        <button onClick={() => setLanguage("en")} className={language === "en" ? "active" : ""}>English</button>
        <button onClick={() => setLanguage("zh")} className={language === "zh" ? "active" : ""}>中文</button>
      </div>

      <div className={`reaction-test-container ${gameState}`} onClick={gameState === "ready" || gameState === "waiting" ? handleClick : null}>
        {gameState === "idle" && (
          <div className="reaction-box idle">
            <h1>{translations[language].title}</h1>
            <p>{translations[language].startTest}</p>
            <button className="start-btn" onClick={startTest}>
              {translations[language].startTest} ({attempts + 1}/3)
            </button>
          </div>
        )}

        {gameState === "waiting" && (
          <div className="reaction-box waiting">
            <p className="big-white-text">{translations[language].waitGreen}</p>
          </div>
        )}

        {gameState === "tooSoon" && (
          <div className="reaction-box tooSoon">
            <p className="big-text">{translations[language].tooSoon}</p>
            <button className="start-btn" onClick={startTest}>
              {translations[language].tryAgain}
            </button>
          </div>
        )}

        {gameState === "ready" && (
          <div className="reaction-box ready">
            <p className="big-white-text">{translations[language].clickNow}</p>
          </div>
        )}

        {gameState === "result" && (
          <div className="reaction-box result">
            <p className="big-text">{translations[language].yourTime} <strong>{currentReactionTime}</strong></p>
            <button className="start-btn" onClick={startTest}>
              {translations[language].nextTest} ({attempts + 1}/3)
            </button>
          </div>
        )}

        {gameState === "complete" && (
          <div className={`reaction-box final ${finalMessage.toLowerCase().replace(" ", "-")}`}>
            <h1>{translations[language].testComplete}</h1>
            <p className="big-text">{translations[language].riskLevel}</p>
            <h2 className={`risk-text ${finalMessage.toLowerCase().replace(" ", "-")}`}>{finalMessage}</h2>
            <p className="big-text">{translations[language].totalTime} <strong>{totalTime} seconds</strong></p>
            {finalMessage === "High Risk" && <p className="warning-text">{warningMessage}</p>}
          </div>
        )}
      </div>

      <div className="instructions-container">
        {translations[language].instructions.map((instruction, index) => (
          <div key={index} className="instruction-step" data-step={index + 1}>
            {instruction}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ReactionTimeTest;
