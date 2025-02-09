import React, { useContext, useEffect } from "react";
import { LanguageContext } from "../contexts/LanguageContext";
import Header from "./Header";
import Footer from "./Footer";
import "./HomePage.css";

function HomePage() {
  const { language, setLanguage, translations, loading, updateTranslations } =
    useContext(LanguageContext);

  // Load the default translations (English) on mount if not already loaded.
  useEffect(() => {
    if (!translations.welcome) {
      updateTranslations("en");
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
    <div className="home-container">
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

      <section className="hero-section">
        <div className="hero-content">
          <h1>{translations.welcome}</h1>
          <p>{translations.empowering}</p>
          <button className="cta-button">{translations.getStarted}</button>
        </div>
      </section>

      <section className="features-section">
        <h2>{translations.whyChoose}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>{translations.fallRisk}</h3>
            <p>{translations.fallRiskDesc}</p>
          </div>
          <div className="feature-card">
            <h3>{translations.exercises}</h3>
            <p>{translations.exercisesDesc}</p>
          </div>
          <div className="feature-card">
            <h3>{translations.clinics}</h3>
            <p>{translations.clinicsDesc}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
