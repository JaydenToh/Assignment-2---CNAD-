export const translateText = async (text, targetLang) => {
  try {
    const response = await fetch("http://localhost:5000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: targetLang,
        format: "text",
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Return original text on failure
  }
};

export const translateMultiple = async (texts, targetLang) => {
  return Promise.all(texts.map((text) => translateText(text, targetLang)));
};
