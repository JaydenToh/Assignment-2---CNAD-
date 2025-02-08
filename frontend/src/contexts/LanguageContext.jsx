import React, { createContext, useState, useEffect } from "react";
import { translateBatch } from "../services/translate"; // Import batch translation

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(false);

  const updateTranslations = async (newLang) => {
    setLoading(true);

    // Check if translations exist in localStorage (faster switching)
    const cachedTranslations = localStorage.getItem(`translations_${newLang}`);
    if (cachedTranslations) {
      setTranslations(JSON.parse(cachedTranslations));
      setLoading(false);
      return;
    }

    // If no cached data, fetch translations
    const texts = {
      welcome: "Welcome to My Senior App",
      empowering: "Empowering seniors to live healthy & independent lives.",
      getStarted: "Get Started",
      whyChoose: "Why Choose Our App?",
      fallRisk: "Fall Risk Assessment",
      fallRiskDesc: "Quickly assess your fall risk at home.",
      exercises: "Recommended Exercises",
      exercisesDesc: "Tailored workouts to build strength and stability.",
      clinics: "Nearby Clinics",
      clinicsDesc: "Locate the nearest healthcare provider in your area.",
      whatWouldYouLikeToDo: "What would you like to do?",
      assessment: "Assessment",
    };

    // Batch translate all texts at once
    const translatedValues = await translateBatch(
      Object.values(texts),
      newLang
    );

    // Map translated values back to keys
    const newTranslations = Object.keys(texts).reduce((acc, key, index) => {
      acc[key] = translatedValues[index];
      return acc;
    }, {});

    // Save translations to localStorage for future use
    localStorage.setItem(
      `translations_${newLang}`,
      JSON.stringify(newTranslations)
    );

    setTranslations(newTranslations);
    setLoading(false);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        translations,
        loading,
        updateTranslations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
