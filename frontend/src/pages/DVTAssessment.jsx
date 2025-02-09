// src/pages/DVTAssessment.jsx
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { getQuestions, submitAssessment, getTTS } from "../services/dvtService";
import "./DVTAssessment.css"; // Import custom DVT CSS
import { FiVolume2 } from "react-icons/fi";

const navTranslations = {
  "en-US": { next: "Next", prev: "Previous", submit: "Submit" },
  "ms-MY": { next: "Seterusnya", prev: "Sebelumnya", submit: "Hantar" },
  "zh-CN": { next: "下一页", prev: "上一页", submit: "提交" },
};

function DVTAssessment() {
  const [language, setLanguage] = useState("en-US");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [missingModalVisible, setMissingModalVisible] = useState(false);

  // Fetch questions when language changes
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getQuestions(language);
        data.sort((a, b) => a.question_id - b.question_id);
        setQuestions(data.slice(0, 20));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
      setLoading(false);
    }
    fetchData();
  }, [language]);

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [currentIndex]: e.target.value });
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      setMissingModalVisible(true);
      return;
    }
    const answersArray = questions.map(
      (q, index) => `q${q.question_id}: ${answers[index]}`
    );
    const payload = { user_id: "anonymous", answers: answersArray };
    try {
      const result = await submitAssessment(payload);
      setAssessmentResult(result);
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting your assessment. Please try again.");
    }
  };

  const handleTTS = async () => {
    try {
      const ttsData = await getTTS(
        questions[currentIndex].question_text,
        language
      );
      const audio = new Audio("data:audio/mp3;base64," + ttsData.audio_content);
      audio.play();
    } catch (error) {
      console.error("TTS error:", error);
    }
  };

  if (loading) {
    return (
      <div className="page-container dvt-assessment-container">
        <p>Loading questions...</p>
      </div>
    );
  }

  // Show language selection view if no questions loaded.
  if (questions.length === 0 && !loading) {
    return (
      <div className="page-container dvt-assessment-container">
        <Header />
        <div className="language-switcher" style={{ textAlign: "center" }}>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en-US">English</option>
            <option value="ms-MY">Malay</option>
            <option value="zh-CN">Chinese</option>
          </select>
        </div>
        <Footer />
      </div>
    );
  }

  // If assessment has been submitted, show result.
  if (assessmentResult) {
    return (
      <div className="page-container dvt-assessment-container">
        <Header />
        <div className="result-section" style={{ textAlign: "center" }}>
          <h2>Assessment Result</h2>
          <p><strong>DVT Risk:</strong> {assessmentResult.risk_status_dvt}</p>
          <p>
            <strong>Falling Risk:</strong> {assessmentResult.risk_status_falling}
          </p>
          <p><strong>DVT Score:</strong> {assessmentResult.score_dvt}</p>
          <p>
            <strong>Falling Score:</strong> {assessmentResult.score_falling}
          </p>
          <p>
            <strong>Assessment ID:</strong> {assessmentResult.assessment_id}
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="page-container dvt-assessment-container">
      <Header />
      <div className="language-switcher">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en-US">English</option>
          <option value="ms-MY">Malay</option>
          <option value="zh-CN">Chinese</option>
        </select>
      </div>
      <div className="assessment-content-wrapper">
        <div className="assessment-content">
          <div className="question-container">
            <h2 style={{ textAlign: "center" }}>
              Question {currentIndex + 1} of {questions.length}
            </h2>
            <div className="question-block">
              <h3 style={{ display: "inline-block" }}>
                {currentQuestion.question_text}
              </h3>
              <button className="audio-button" title="Listen" onClick={handleTTS}>
                <FiVolume2 size={28} />
              </button>
              <form>
                <div className="options">
                  {currentQuestion.options.map((opt, idx) => {
                    const radioId = `q${currentQuestion.question_id}_option${idx}`;
                    return (
                      <div className="option" key={idx}>
                        <input
                          type="radio"
                          name="answer"
                          id={radioId}
                          value={opt}
                          checked={answers[currentIndex] === opt}
                          onChange={handleAnswerChange}
                        />
                        <label htmlFor={radioId}>{opt}</label>
                      </div>
                    );
                  })}
                </div>
              </form>
            </div>
            <div className="nav-buttons">
              {currentIndex > 0 && (
                <button onClick={handlePrev}>
                  {navTranslations[language].prev}
                </button>
              )}
              {currentIndex < questions.length - 1 ? (
                <button onClick={handleNext}>
                  {navTranslations[language].next}
                </button>
              ) : (
                <button onClick={handleNext}>
                  {navTranslations[language].submit}
                </button>
              )}
            </div>
          </div>
          <div className="sidebar">
            <div className="nav-grid">
              {questions.map((q, index) => (
                <div
                  key={q.question_id}
                  className={`nav-item ${currentIndex === index ? "selected" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {missingModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Please answer all questions before submitting.</p>
            <button onClick={() => setMissingModalVisible(false)}>OK</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default DVTAssessment;
