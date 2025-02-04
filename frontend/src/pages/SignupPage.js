import React, { useState } from "react";

function SignUpPage({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    // Normally, call backend signup API.
    // If success, setAuth(true)
    setAuth(true);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Sign Up</h2>
      <form
        onSubmit={handleSignUp}
        style={{ display: "flex", flexDirection: "column", width: "200px" }}
      >
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" style={{ marginTop: "10px" }}>
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default SignUpPage;
