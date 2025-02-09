import React, { useState, useEffect } from "react";

function HealthQuiz() {
  const [questions, setQuestions] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [riskCategory, setRiskCategory] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      <p>Please answer the questions based on the following scale:</p>
      <ul>
        <li>1: Less likely</li>
        <li>2: Somewhat unlikely</li>
        <li>3: Neutral</li>
        <li>4: Somewhat likely</li>
        <li>5: Highly likely</li>
      </ul>
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
      {totalScore > 0 && <h2>Your Total Score: {totalScore}</h2>}
      {riskCategory && <h2>Your Risk Category: {riskCategory}</h2>}
    </div>
  );
}

export default HealthQuiz;