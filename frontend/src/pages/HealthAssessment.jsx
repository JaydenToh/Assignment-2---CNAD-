// src/pages/HealthAssessment.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
import Header from "./Header";
import Footer from "./Footer";
import "./HealthAssessment.css";
import assessmentIcon from "../assets/seniors.png";
import exerciseIcon from "../assets/seniors.png";
import clinicIcon from "../assets/seniors.png";
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
          <button
            className="audio-button"
            title="Read Aloud"
            aria-label="Read Aloud"
          >
            <FiVolume2 size={28} />
          </button>
        </div>

        {/* Options Section */}
        <div className="options-section">
          <p className="options-prompt">{translations.whatWouldYouLikeToDo}</p>
          <div className="options-grid">
            <Link to="/Rules" className="option-card">
              <img src={assessmentIcon} alt="Assessment" />
              <span>{translations.assessment}</span>
            </Link>
            <Link to="/exercise" className="option-card">
              <img src={exerciseIcon} alt="Recommended Exercise" />
              <span>{translations.exercises}</span>
            </Link>
            <Link to="/healthquiz" className="option-card">
              <img src={clinicIcon} alt="Health Quiz" />
              <span>Health Quiz</span>
            </Link>
            <Link to="/reaction" className="option-card">
              <img src={clinicIcon} alt="Reaction Time Test" />
              <span>Reaction Time Test</span>
            </Link>
            <Link to="/dvt-assessment" className="option-card">
              <img src={assessmentIcon} alt="DVT Assessment" />
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
