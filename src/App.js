import React, { useState, useEffect } from "react";
import WelcomePage from "./WelcomePage";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import AccountSettingsPage from "./AccountSettingsPage";

function PopXApp() {

  const [page, setPage] = useState("welcome");
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    try {
      const data = localStorage.getItem("popxUser");

      if (data) {
        const parsed = JSON.parse(data);
        setCurrentUser(parsed);
        setPage("settings");
      }
    } catch (err) {
      console.log("Error reading user from storage", err);
      localStorage.removeItem("popxUser"); 
    }
  }, []);

  const onSignupDone = (userData) => {
    setCurrentUser(userData);
    setPage("settings");
  };

  const onLoginDone = (userData) => {
    setCurrentUser(userData);
    setPage("settings");
  };

  const logoutUser = () => {
    localStorage.removeItem("popxUser");
    setCurrentUser(null);
    setPage("welcome");
  };

  const goBack = () => {
    setPage("welcome");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f5f5",
      fontFamily: "sans-serif"
    }}>

      {page === "welcome" && (
        <WelcomePage
          onSignupClick={() => setPage("signup")}
          onLoginClick={() => setPage("login")}
        />
      )}

      {page === "signup" && (
        <SignUpPage
          onBackClick={goBack}
          onSignupSuccess={onSignupDone}
        />
      )}

      {page === "login" && (
        <LoginPage
          onBackClick={goBack}
          onLoginSuccess={onLoginDone}
        />
      )}

      {page === "settings" && currentUser && (
        <AccountSettingsPage
          user={currentUser}
          onLogout={logoutUser}
        />
      )}

    </div>
  );
}

export default PopXApp;