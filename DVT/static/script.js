// static/script.js
document.addEventListener("DOMContentLoaded", function() {
    let selectedLanguage = "en-US"; // default language
  
    // Elements
    const languageSelection = document.getElementById("languageSelection");
    const assessmentFormContainer = document.getElementById("assessmentFormContainer");
    const languageSelect = document.getElementById("languageSelect");
    const startButton = document.getElementById("startAssessment");
    const backButton = document.getElementById("backButton");
    const ttsButtons = document.querySelectorAll(".ttsButton");
    const assessmentForm = document.getElementById("assessmentForm");
    const resultDiv = document.getElementById("result");
  
    // API key (must match backend expected value)
    const API_KEY = "secret_assignment_key";
  
    // Helper function to translate text using the /api/translate endpoint.
    function translateText(text, targetLang) {
      return fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY
        },
        body: JSON.stringify({
          text: text,
          target_lang: targetLang
        })
      })
      .then(response => {
        if (!response.ok) throw new Error("Translation API error");
        return response.json();
      })
      .then(data => data.translated_text);
    }
  
    // Translate all questions on the page.
    function translateQuestions(targetLang) {
      const questions = document.querySelectorAll(".question");
      questions.forEach(question => {
        const span = question.querySelector(".question-text");
        // Store original text if not already stored.
        const originalText = span.getAttribute("data-original") || span.textContent;
        if (!span.getAttribute("data-original")) {
          span.setAttribute("data-original", originalText);
        }
        translateText(originalText, targetLang)
          .then(translated => {
            span.textContent = translated;
            // Update corresponding TTS button's data-text attribute.
            const ttsButton = question.querySelector(".ttsButton");
            ttsButton.setAttribute("data-text", translated);
          })
          .catch(err => {
            console.error("Translation error for question:", err);
          });
      });
    }
  
    // When "Start Assessment" is clicked.
    startButton.addEventListener("click", function() {
      selectedLanguage = languageSelect.value;
      languageSelection.classList.add("hidden");
      assessmentFormContainer.classList.remove("hidden");
      // Translate questions if language is not English.
      if (selectedLanguage !== "en-US") {
        translateQuestions(selectedLanguage);
      }
    });
  
    // "Back" button functionality.
    backButton.addEventListener("click", function() {
      window.history.back();
    });
  
    // Attach TTS functionality.
    ttsButtons.forEach(button => {
      button.addEventListener("click", function() {
        const text = this.getAttribute("data-text");
        fetch("/api/tts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": API_KEY
          },
          body: JSON.stringify({
            text: text,
            language_code: selectedLanguage
          })
        })
        .then(response => {
          if (!response.ok) throw new Error("TTS API error");
          return response.json();
        })
        .then(data => {
          const audio = new Audio("data:audio/mp3;base64," + data.audio_content);
          audio.play();
        })
        .catch(err => {
          console.error("Error with TTS:", err);
        });
      });
    });
  
    // Handle assessment form submission.
    assessmentForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const formData = new FormData(assessmentForm);
      const answers = [];
      for (let [key, value] of formData.entries()) {
        answers.push(`${key}: ${value}`);
      }
      const assessmentPayload = {
        user_id: "anonymous",
        answers: answers
      };
  
      fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY
        },
        body: JSON.stringify(assessmentPayload)
      })
      .then(response => {
        if (!response.ok) throw new Error("Submission error");
        return response.json();
      })
      .then(data => {
        if (data.risk_status === "at risk") {
          resultDiv.textContent = "Warning: You are at high risk for DVT. Please seek medical advice immediately.";
        } else {
          resultDiv.textContent = "You are not at high risk for DVT. However, please monitor your health and consult a doctor if symptoms develop.";
        }
      })
      .catch(err => {
        console.error("Assessment submission error:", err);
        resultDiv.textContent = "There was an error submitting your assessment. Please try again.";
      });
    });
  });
  