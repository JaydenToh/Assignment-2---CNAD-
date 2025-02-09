// src/pages/DVTAssessment.jsx

import React, { useEffect, useState } from "react";
import { getQuestions, submitAssessment } from "../services/dvtservice";
import "./DVTAssessment.css"; // Ensure this CSS file is available (or import your shared CSS)
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
  const [showSidebar, setShowSidebar] = useState(false);

  // Fetch questions when language changes
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getQuestions(language);
        // Sort questions by question_id
        data.sort((a, b) => a.question_id - b.question_id);
        setQuestions(data.slice(0, 20)); // Use first 20 questions
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
      setLoading(false);
    }
    fetchData();
  }, [language]);

  const handleAnswerChange = (event) => {
    setAnswers({ ...answers, [currentIndex]: event.target.value });
  };

  const goToQuestion = (index) => {
    setCurrentIndex(index);
    setShowSidebar(false);
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
      alert("Please answer all questions before submitting.");
      return;
    }
    // Build answers array in the format "q{question_id}: answer"
    const answersArray = questions.map((q, index) => `q${q.question_id}: ${answers[index]}`);
    const payload = { user_id: "anonymous", answers: answersArray };
    try {
      const result = await submitAssessment(payload);
      setAssessmentResult(result);
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting your assessment. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="page-container health-assessment-container">
        <p>Loading questions...</p>
      </div>
    );
  }

  // Language selection view if no questions loaded yet
  if (questions.length === 0 && !loading) {
    return (
      <div className="page-container health-assessment-container">
        <div className="greeting-section">
          <h1>DVT Self-Assessment</h1>
          <p>Please choose your language to begin:</p>
          <div className="language-switcher">
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en-US">English</option>
              <option value="ms-MY">Malay</option>
              <option value="zh-CN">Chinese</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  // If assessment has been submitted, show results.
  if (assessmentResult) {
    return (
      <div className="page-container health-assessment-container">
        <div className="result-section">
          <h2>Assessment Result</h2>
          <p><strong>DVT Risk:</strong> {assessmentResult.risk_status_dvt}</p>
          <p><strong>Falling Risk:</strong> {assessmentResult.risk_status_falling}</p>
          <p><strong>DVT Score:</strong> {assessmentResult.score_dvt}</p>
          <p><strong>Falling Score:</strong> {assessmentResult.score_falling}</p>
          <p><strong>Assessment ID:</strong> {assessmentResult.assessment_id}</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="page-container health-assessment-container">
      <div className="greeting-section">
        <h1>DVT Self-Assessment</h1>
        <div className="language-switcher">
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en-US">English</option>
            <option value="ms-MY">Malay</option>
            <option value="zh-CN">Chinese</option>
          </select>
        </div>
      </div>

      <div className="questions-section">
        <h2>
          Question {currentIndex + 1} of {questions.length}
        </h2>
        <div className="question-block">
          <h3>{currentQuestion.question_text}</h3>
          <form>
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
          </form>
          {/* Optional audio button */}
          <button className="audio-button" title="Listen">
            <FiVolume2 size={28} />
          </button>
        </div>
      </div>

      <div className="options-section">
        <div className="options-grid">
          <button onClick={handlePrev}>{navTranslations[language].prev}</button>
          <button onClick={() => setShowSidebar(true)}>Questions</button>
          <button onClick={handleNext}>
            {currentIndex === questions.length - 1 ? navTranslations[language].submit : navTranslations[language].next}
          </button>
        </div>
      </div>

      {showSidebar && (
        <div className="sidebar">
          <div className="nav-grid">
            {questions.map((q, index) => (
              <div
                key={q.question_id}
                className={`nav-item ${answers[index] ? "selected" : ""}`}
                onClick={() => goToQuestion(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <button onClick={() => setShowSidebar(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default DVTAssessment;
