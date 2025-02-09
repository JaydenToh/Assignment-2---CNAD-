// src/pages/HealthAssessment.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
import Header from "./Header";
import Footer from "./Footer";
import "./HealthAssessment.css";
import assessmentIcon from "../assets/seniors.png";
import quizIcon from "../assets/quiz.jpg";
import eyeIcon from "../assets/eye1.jpg";
import dvtIcon from "../assets/dvt.jpg";
import assesIcon from "../assets/assess.jpg";
import reactionIcon from "../assets/reactiontime.jpg";
import { FiVolume2 } from "react-icons/fi";

function HealthAssessment() {
  const { language, setLanguage, translations, loading, updateTranslations } =
    useContext(LanguageContext);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!translations.welcome) {
      updateTranslations("en");
    }
  }, [translations, updateTranslations]);

  const handleLanguageChange = async (newLang) => {
    setLanguage(newLang);
    await updateTranslations(newLang);
  };

  if (loading) {
    return <div className="loading">Loading translations...</div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="page-container">
      <Header />

      {/* Language Selector: centered */}
      <div className="language-switcher">
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
        >
          <option value="en">English</option>
          <option value="zh">中文</option>
          <option value="ms">Bahasa Melayu</option>
        </select>
      </div>

      <main className="health-assessment-container">
        {/* Greeting Section: centered */}
        <div className="greeting-section">
          <div className="greeting-text">
            <h1>{translations.welcome}</h1>
            <p>{translations.empowering}</p>
          </div>
        </div>

        {/* Options Section */}
        <div className="options-section">
          <p className="options-prompt">{translations.whatWouldYouLikeToDo}</p>
          <div className="options-grid">
            <Link to="/Rules" className="option-card">
              <img src={assesIcon} alt="Assessment" />
              <span>{translations.assessment}</span>
            </Link>
            <Link to="/reaction" className="option-card">
              <img src={reactionIcon} alt="DVT Assessment" />
              <span>Reaction Time</span>
            </Link>
            <Link to="/healthquiz" className="option-card">
              <img src={quizIcon} alt="Health Quiz" />
              <span>Health Quiz</span>
            </Link>
            <Link to="/eye-test" className="option-card">
              <img src={eyeIcon} alt="Eye quiz" />
              <span>Eye Quiz</span>
            </Link>
            <Link to="/dvt-assessment" className="option-card">
              <img src={dvtIcon} alt="DVT Assessment" />
              <span>DVT Assessment</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HealthAssessment;
