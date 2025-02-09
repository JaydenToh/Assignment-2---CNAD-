import React, { useState, useEffect } from "react";
import './healthquiz.css';

function HealthQuiz() {
  const [questions, setQuestions] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [riskCategory, setRiskCategory] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/random-questions")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let score = 0;
    const answers = {};
    const formData = new FormData(e.target);

    questions.forEach((question, index) => {
      const answer = formData.get(`answer-${index}`);
      const answerNum = parseInt(answer, 10);
      answers[question._id] = answerNum;
      score += answerNum;
    });

    setTotalScore(score);

    try {
      const riskResponse = await fetch("http://localhost:3002/calculate-risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalScore: score }),
      });
      if (!riskResponse.ok) {
        throw new Error(`HTTP error! status: ${riskResponse.status}`);
      }
      const riskData = await riskResponse.json();
      setRiskCategory(riskData.riskCategory);
    } catch (err) {
      console.error("Error calculating risk:", err);
      setError(err.message);
    }

    try {
      await fetch("http://localhost:3001/submit-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, totalScore: score }),
      });
    } catch (err) {
      console.error("Error submitting survey:", err);
    }
    setLoading(false);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Risk Fall Assessment Survey</h1>
      <div className="scale-text">
        <p>
            Please answer the questions based on the following scale:
            <br />
            1: Less likely
            <br />
            2: Somewhat unlikely
            <br />
            3: Neutral
            <br />
            4: Somewhat likely
            <br />
            5: Highly likely
        </p>
      </div>
      <form id="quiz-form" onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={question._id || index}>
            <h2>Question {index + 1}:</h2>
            <p>{question.question}</p>
            <div className="radio-group">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="radio-button">
                  <input
                    type="radio"
                    name={`answer-${index}`}
                    value={value}
                    required
                  />
                  {value}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit">Submit Quiz</button>
      </form>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Results</h2>
            <p>Total Score: {totalScore}</p>
            <p>Risk Category: {riskCategory}</p>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HealthQuiz;