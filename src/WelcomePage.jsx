import React from "react";

const btnBase = {
  width: "100%",
  padding: 14,
  border: "none",
  cursor: "pointer",
  borderRadius: 8,
};

function WelcomePage({ onSignupClick, onLoginClick }) {
  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: "40px 20px", textAlign: "center" }}>
      <div style={{ marginTop: 80 }}>

        <h1 style={{ fontSize: 40, marginBottom: 10 }}>Welcome to PopX</h1>

        <p style={{ color: "#777", marginBottom: 30 }}>
          Start your journey with us. Create an account or login if you already have one.
        </p>

        <button onClick={onSignupClick} style={{ ...btnBase, background: "#6c5ce7", color: "#fff", marginBottom: 10 }}>
          Create Account
        </button>

        <button onClick={onLoginClick} style={{ ...btnBase, background: "#eee" }}>
          Login
        </button>

      </div>
    </div>
  );
}

export default WelcomePage;