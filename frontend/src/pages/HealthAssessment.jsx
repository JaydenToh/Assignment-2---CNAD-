import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext"; // Import Language Context
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

  // Load default translations on mount if not already loaded
  useEffect(() => {
    if (!translations.welcome) {
      updateTranslations("en"); // Default to English
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLanguageChange = async (newLang) => {
    setLanguage(newLang);
    await updateTranslations(newLang);
  };

  if (loading) {
    return <div className="loading">Loading translations...</div>;
  }

  return (
    <div className="page-container">
      {/* Header */}
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
            <Link to="/reaction" className="option-card">
              <img src={clinicIcon} alt="Reaction Time Test" />
              <span>Reaction Time Test</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}

export default HealthAssessment;
