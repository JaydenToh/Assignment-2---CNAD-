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

  // Load default translations on mount if not already loaded
  useEffect(() => {
    if (!translations.welcome) {
      updateTranslations("en");
    }
  }, [translations, updateTranslations]);

  // Handle language change
  const handleLanguageChange = async (newLang) => {
    setLanguage(newLang);
    await updateTranslations(newLang);
  };

  // Show loading if translations are still loading
  if (loading) {
    return <div className="loading">Loading translations...</div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="page-container">
      <Header />

      {/* Language Selector */}
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
        {/* Greeting Section */}
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

<<<<<<< HEAD
=======
        
>>>>>>> 74cf70b07d6f47986e499f4c6e456450d97d3679
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
            <Link to="/reaction" className="option-card">
              <img src={clinicIcon} alt="Reaction Time Test" />
              <span>Reaction Time Test</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HealthAssessment;
