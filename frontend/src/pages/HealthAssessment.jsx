// HealthAssessment.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./HealthAssessment.css";
import assessmentIcon from "../assets/seniors.png";
import exerciseIcon from "../assets/seniors.png";
import clinicIcon from "../assets/seniors.png";
import { FiVolume2 } from "react-icons/fi";

function HealthAssessment() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Fetch questions from the server when the component mounts.
  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:3000/random-questions", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handle the quiz form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    let totalScore = 0;
    const answers = {};

    // Use FormData to easily extract the radio input values.
    const formData = new FormData(e.target);
    questions.forEach((question, index) => {
      const answer = formData.get(`answer-${index}`);
      const answerNum = parseInt(answer, 10);
      answers[question._id] = answerNum;
      totalScore += answerNum;
    });
    setResult({ totalScore });

    // Calculate risk category by sending the totalScore to the risk calculation endpoint.
    try {
      const riskResponse = await fetch("http://localhost:3002/calculate-risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalScore }),
      });
      if (!riskResponse.ok) {
        throw new Error(`HTTP error! status: ${riskResponse.status}`);
      }
      const riskData = await riskResponse.json();
      setResult((prev) => ({ ...prev, riskCategory: riskData.riskCategory }));
    } catch (err) {
      setResult((prev) => ({ ...prev, riskError: err.message }));
    }

    // Submit the survey answers to the server.
    try {
      const surveyResponse = await fetch("http://localhost:3001/submit-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, totalScore }),
      });
      const surveyData = await surveyResponse.json();
      console.log("Survey submission response:", surveyData);
    } catch (err) {
      console.error("Error submitting survey:", err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="page-container">
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

        {/* Questions Section */}
        <div className="questions-section">
          <h2>Health Assessment Questions</h2>
          <form onSubmit={handleSubmit} id="quiz-form">
            {questions.map((question, index) => (
              <div key={question._id || index} className="question-block">
                <h3>Question {index + 1}:</h3>
                <p>{question.question}</p>
                <div className="options">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <span key={value} className="option">
                      <input
                        type="radio"
                        id={`answer-${index}-${value}`}
                        name={`answer-${index}`}
                        value={value}
                        required
                      />
                      <label htmlFor={`answer-${index}-${value}`}>{value}</label>
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <button type="submit">Submit Quiz</button>
          </form>

          {result && (
            <div className="result-section">
              <h2>Your Total Score is: {result.totalScore}</h2>
              {result.riskCategory && (
                <h2>Your Risk Category is: {result.riskCategory}</h2>
              )}
              {result.riskError && (
                <h2>Error calculating risk: {result.riskError}</h2>
              )}
            </div>
          )}
        </div>

        {/* Options Section */}
        <div className="options-section">
          <p className="options-prompt">What would you like to do?</p>
          <div className="options-grid">
            <Link to="/assessment" className="option-card">
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

      <Footer />
    </div>
  );
}

export default HealthAssessment;
