import React from "react";
import { Link } from "react-router-dom";
import "../styles/WelcomePage.css";

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <h1>NxtVote</h1>
      <h3>Secure Voting Application</h3>
      <Link to="/login">
        <button>Voter Login</button>
      </Link>
      <Link to="/admin-login">
        <button>Admin Login</button>
      </Link>
    </div>
  );
};

export default WelcomePage;
