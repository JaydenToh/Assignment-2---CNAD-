import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>© 2025 My Senior App. All rights reserved.</p>
        <p>
          <a href="/privacy">Privacy Policy</a> |{" "}
          <a href="/terms">Terms of Use</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
