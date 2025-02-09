import React, { useState } from "react";
import "./eyeTest.css"; // Ensure styles are defined here
import Header from "./Header"; // Keep Navbar
import Footer from "./Footer"; // Keep Footer
import sampleImage1 from "../assets/blurry.jpg"; // Replace with actual images
import sampleImage2 from "../assets/smalltext.jpg"; // Replace with actual images
import sampleImage3 from "../assets/night.jpg"; // Replace with actual images
import sampleImage4 from "../assets/rub.jpg"; // Replace with actual images
import sampleImage5 from "../assets/strain.jpg"; // Replace with actual images
import sampleImage6 from "../assets/light.jpg"; // Replace with actual images
import sampleImage7 from "../assets/tired.jpg"; // Replace with actual images
import sampleImage8 from "../assets/headache.jpg"; // Replace with actual images
import sampleImage9 from "../assets/vision.jpg"; // Replace with actual images
import sampleImage10 from "../assets/squint.jpg"; // Replace with actual images

import trueFalseImage1 from "../assets/cat.jpg"; // Replace with actual images
import trueFalseImage2 from "../assets/4animals.jpg"; // Replace with actual images
import trueFalseImage3 from "../assets/visionimage.png"; // Replace with actual images


const questions = [
  { id: 1, text: "Do you experience blurry vision throughout the day?", image: sampleImage1, type: "scale" },
  { id: 2, text: "Do you struggle to read small text on your phone/computer?", image: sampleImage2, type: "scale" },
  { id: 3, text: "Do you find it hard to see at night compared to the daytime?", image: sampleImage3, type: "scale" },
  { id: 4, text: "Do you frequently rub your eyes due to discomfort or dryness?", image: sampleImage4, type: "scale" },
  { id: 5, text: "Do you experience eye strain after using screens for long periods?", image: sampleImage5, type: "scale" },
  { id: 6, text: "Do bright lights (e.g., sunlight, car headlights) bother your eyes?", image: sampleImage6, type: "scale" },
  { id: 7, text: "Do your eyes feel tired even after getting enough sleep?", image: sampleImage7, type: "scale" },
  { id: 8, text: "Do you experience frequent headaches after reading or screen use?", image: sampleImage8, type: "scale" },
  { id: 9, text: "Do you feel like your vision is worse than before?", image: sampleImage9, type: "scale" },
  { id: 10, text: "Do you squint often to see things clearly?", image: sampleImage10, type: "scale" },
  { id: 11, text: "Is the image below clear to you?", image: trueFalseImage1, type: "boolean" },
  { id: 12, text: "Do you see 4 animals in the image below?", image: trueFalseImage2, type: "boolean" },
  { id: 13, text: "Solve this: 5 + 3 = ?", answer: "8", type: "input" },
  { id: 14, text: "What word do you see in the image below?", image: trueFalseImage3, answer: "Vision", type: "input" },
];

const EyeQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [riskMessage, setRiskMessage] = useState("");

  const handleAnswer = (value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = value;
    setAnswers(updatedAnswers);
    setErrorMessage(""); // Clear error when answered
  };

  const nextQuestion = () => {
    if (answers[currentQuestion] === null) {
      setErrorMessage("Please answer the question before proceeding.");
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitResults();
    }
  };

  const submitResults = async () => {
    // ✅ Calculate total score (sum of 1-5 scale answers)
    let score = answers.slice(0, 10).reduce((acc, val) => acc + (val || 0), 0);

    // ✅ Add penalties for incorrect boolean/math answers
    if (answers[12] !== "8") score += 1;
    if (answers[13]?.toLowerCase() !== "vision") score += 1;

    // ✅ Determine risk category
    let category = "Excellent";
    if (score >= 40) category = "High Risk";
    else if (score >= 30) category = "Medium Risk";
    else if (score >= 20) category = "Good";

    // ✅ Update state to display results
    setTotalScore(score);
    setRiskMessage(category);
    setIsSubmitted(true);

    console.log("📊 Total Score:", score);
    console.log("📊 Risk Category:", category);

    // ✅ Send data to backend
    try {
      const response = await fetch("http://localhost:4000/api/eye-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q1_blurry_vision: answers[0],
          q2_small_text: answers[1],
          q3_night_vision: answers[2],
          q4_eye_rubbing: answers[3],
          q5_eye_strain: answers[4],
          q6_light_sensitivity: answers[5],
          q7_tired_eyes: answers[6],
          q8_headaches: answers[7],
          q9_worsening_vision: answers[8],
          q10_squinting: answers[9],
          q11_boolean_1: answers[10],
          q12_boolean_2: answers[11],
          simple_test_1: answers[12] === "8",
          simple_test_2: answers[13]?.toLowerCase() === "vision",
          total_score: score,
          risk_category: category
        }),
      });

      const data = await response.json();
      console.log("✅ Response from Backend:", data);

      if (!response.ok) {
        console.error("❌ Backend Error:", data.message);
        alert(`Error: ${data.message}`);
        return;
      }
    } catch (error) {
      console.error("❌ Error saving eye quiz result:", error);
      alert("❌ Error saving results. Please check console logs.");
    }

    
  };

  return (
    <div className="eye-quiz-page">
      <Header />

      <div className="eye-quiz-container">
        {isSubmitted ? (
          // ✅ Show results after finishing quiz
          <div className="results-container">
            <h2>Your Eye Quiz Result</h2>
            <p className="result-score">Total Score: {totalScore}</p>
            <h3 className={`risk-category ${riskMessage.replace(" ", "-").toLowerCase()}`}>
              {riskMessage}
            </h3>

            {/* ✅ Fall Risk Category Display */}
            <p className={`fall-risk-text ${riskMessage.replace(" ", "-").toLowerCase()}`}>
              <strong>Fall Risk:</strong> {riskMessage === "Excellent"
                ? "Minimal fall risk. Your vision health is in great condition!"
                : riskMessage === "Good"
                ? "Moderate fall risk. Consider regular eye check-ups."
                : riskMessage === "Medium Risk"
                ? "Increased fall risk. You may need corrective measures."
                : "High fall risk. Urgent medical attention is recommended!"}
            </p>

            {/* ⚠️ High-Risk Warning Message */}
            {riskMessage === "High Risk" && (
              <p className="high-risk-warning">
                ⚠️ **WARNING:** Your results indicate a **High Fall Risk**. It is strongly recommended that you **consult an eye specialist immediately** for further clinical assessment.
              </p>
            )}
          </div>

        ) : (
          // ✅ Show quiz while taking the test
          <>
            <h2 className="question-text">{questions[currentQuestion].text}</h2>

            {questions[currentQuestion].image && (
              <div className="question-image-container">
                <img src={questions[currentQuestion].image} alt="Question" className="question-image" />
              </div>
            )}

            <div className="answer-options">
              {questions[currentQuestion].type === "scale" &&
                ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"].map((option, index) => (
                  <button
                    key={index}
                    className={`answer-btn ${answers[currentQuestion] === index + 1 ? "selected" : ""}`}
                    onClick={() => handleAnswer(index + 1)}
                  >
                    {option}
                  </button>
                ))}

              {questions[currentQuestion].type === "boolean" && (
                <div>
                  <button className={`answer-btn ${answers[currentQuestion] === true ? "selected" : ""}`} onClick={() => handleAnswer(true)}>True</button>
                  <button className={`answer-btn ${answers[currentQuestion] === false ? "selected" : ""}`} onClick={() => handleAnswer(false)}>False</button>
                </div>
              )}

              {questions[currentQuestion].type === "input" && (
                <input type="text" className="text-input" placeholder="Enter answer here" onChange={(e) => handleAnswer(e.target.value)} />
              )}
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button className="next-btn" onClick={nextQuestion}>
              {currentQuestion < questions.length - 1 ? "Next →" : "Finish"}
            </button>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default EyeQuiz;
