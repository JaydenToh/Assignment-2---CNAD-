import React, { createContext, useState } from "react";
import { translateText } from "../services/translate"; // <-- Add this import

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(false);

  const updateTranslations = async (newLang) => {
    setLoading(true);
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
    };

    const translatedValues = await Promise.all(
      Object.values(texts).map((text) =>
        translateText(text, newLang).then((res) => res.translatedText)
      )
    );

    const newTranslations = Object.keys(texts).reduce((acc, key, index) => {
      acc[key] = translatedValues[index];
      return acc;
    }, {});

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
