// HealthQuiz.jsx
import React, { useState, useEffect } from "react";

function HealthQuiz() {
  const [questions, setQuestions] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [riskCategory, setRiskCategory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/random-questions")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setQuestions(data))
      .catch((error) => setError(error.message));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Health Quiz</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={question._id || index}>
            <h2>Question {index + 1}:</h2>
            <p>{question.question}</p>
            <div>
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value}>
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
      {totalScore > 0 && <h2>Your Total Score: {totalScore}</h2>}
      {riskCategory && <h2>Your Risk Category: {riskCategory}</h2>}
    </div>
  );
}

export default HealthQuiz;
