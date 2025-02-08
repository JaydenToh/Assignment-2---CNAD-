import React from "react";
import "./AdminLogin.css";

function AdminLogin() {
  return (
    <div className="admin-login-page">
      <div className="login-container">
        <h1 className="login-title">Log In</h1>
        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="options-group">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="login-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
