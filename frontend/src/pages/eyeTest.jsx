import React, { useState } from "react";
import "./eyeTest.css"; // Ensure styles are defined here
import Header from "./Header"; // Keep Navbar
import Footer from "./Footer"; // Keep Footer
import sampleImage from "../assets/sampleImage.jpg"; // Replace with actual images

const questions = [
  {
    id: 1,
    text: "Do you experience blurry vision throughout the day?",
    image: sampleImage,
  },
  {
    id: 2,
    text: "Do you struggle to read small text on your phone/computer?",
    image: sampleImage,
  },
  {
    id: 3,
    text: "Do you find it hard to see at night compared to the daytime?",
    image: sampleImage,
  },
  {
    id: 4,
    text: "Do you frequently rub your eyes due to discomfort or dryness?",
    image: sampleImage,
  },
  {
    id: 5,
    text: "Do you experience eye strain after using screens for long periods?",
    image: sampleImage,
  },
  {
    id: 6,
    text: "Do bright lights (e.g., sunlight, car headlights) bother your eyes?",
    image: sampleImage,
  },
  {
    id: 7,
    text: "Do your eyes feel tired even after getting enough sleep?",
    image: sampleImage,
  },
  {
    id: 8,
    text: "Do you experience frequent headaches after reading or screen use?",
    image: sampleImage,
  },
  {
    id: 9,
    text: "Do you feel like your vision is worse than before?",
    image: sampleImage,
  },
  {
    id: 10,
    text: "Do you squint often to see things clearly?",
    image: sampleImage,
  },
];

const EyeQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswer = (value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = value;
    setAnswers(updatedAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert("Quiz Complete! Submit results.");
      // Handle submission logic here
    }
  };

  return (
    <div className="eye-quiz-page">
      <Header /> {/* Navbar */}

      <div className="eye-quiz-container">
        <h2 className="question-text">{questions[currentQuestion].text}</h2>

        <div className="question-image-container">
          <img
            src={questions[currentQuestion].image}
            alt="Question"
            className="question-image"
          />
        </div>

        <div className="answer-options">
          {["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"].map(
            (option, index) => (
              <button
                key={index}
                className={`answer-btn ${answers[currentQuestion] === index + 1 ? "selected" : ""}`}
                onClick={() => handleAnswer(index + 1)}
              >
                {option}
              </button>
            )
          )}
        </div>

        <button className="next-btn" onClick={nextQuestion}>
          {currentQuestion < questions.length - 1 ? "Next →" : "Finish"}
        </button>
      </div>

      <Footer /> {/* Footer */}
    </div>
  );
};

export default EyeQuiz;
