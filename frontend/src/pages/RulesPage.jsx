import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import "./RulesPage.css";

function RulesPage({ onAgree }) {
  const [isAgreed, setIsAgreed] = useState(false);
  const navigate = useNavigate();

  const handleAgreeChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  const handleStartTest = () => {
    if (isAgreed) {
      navigate("/generalTest");
    } else {
      alert("Please agree to the rules before proceeding.");
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <Header />

      <main className="rules-container">
        <h1>Rules for the General Test</h1>
        <ul className="rules-list">
          <li>
            1. This test is not a definitive diagnosis but is designed to help
            you identify potential health concerns.
          </li>
          <li>
            2. Results from this test do not replace professional medical
            advice. Always consult your doctor for an accurate assessment.
          </li>
          <li>
            3. If your results indicate a high-risk category, your family
            members and respective doctor will be informed for further action.
          </li>
          <li>
            4. By proceeding, you agree to answer all questions honestly to
            ensure accurate results.
          </li>
          <li>
            5. This test is designed as a risk assessment tool and cannot
            guarantee 100% accuracy.
          </li>
          <li>
            6. Your data will remain confidential and only shared with relevant
            parties in case of high risk.
          </li>
          <li>7. This test is suitable for individuals over the age of 18.</li>
        </ul>

        <div className="agreement-section">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={handleAgreeChange}
            />
            I have read and agree to the rules and terms of the General Test.
          </label>
        </div>

        <button
          className={`start-test-button ${isAgreed ? "" : "disabled"}`}
          onClick={handleStartTest}
          disabled={!isAgreed}
        >
          Start General Test
        </button>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default RulesPage;
