export const translateBatch = async (texts, targetLang) => {
  try {
    const response = await fetch("http://localhost:3000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: texts, // Send an array of texts for batch translation
        source: "en",
        target: targetLang,
        format: "text",
      }),
    });

    return await response.json(); // Returns an array of translated texts
  } catch (error) {
    console.error("Translation error:", error);
    return texts; // Return original texts on failure
  }
};
