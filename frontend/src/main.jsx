import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // Optional: keep or remove if you want minimal styling
import { LanguageProvider } from "./contexts/LanguageContext";

// Get the root container element from the DOM
const container = document.getElementById("root");

// Create a root.
const root = createRoot(container);

// Render your application using the new root.render API.
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </React.StrictMode>
);
