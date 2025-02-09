// src/services/dvtService.js

const API_BASE_URL = "http://localhost:8080";
const API_KEY = "AIzaSyBruOTBaUluGiKITRCDXVIuoom8AlyaOow";

export async function getQuestions(language) {
  const response = await fetch(
    `${API_BASE_URL}/api/questions?lang=${encodeURIComponent(language)}`,
    {
      method: "GET",
      headers: { "X-API-Key": API_KEY },
    }
  );
  if (!response.ok) {
    throw new Error("Error fetching questions");
  }
  return await response.json();
}

export async function submitAssessment(assessmentPayload) {
  const response = await fetch(`${API_BASE_URL}/api/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    },
    body: JSON.stringify(assessmentPayload),
  });
  if (!response.ok) {
    throw new Error("Error submitting assessment");
  }
  return await response.json();
}

export async function getTTS(text, languageCode) {
  const response = await fetch(`${API_BASE_URL}/api/tts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    },
    body: JSON.stringify({
      text,
      language_code: languageCode,
    }),
  });
  if (!response.ok) {
    throw new Error("Error fetching TTS audio");
  }
  return await response.json();
}
