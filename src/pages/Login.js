import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Authcontext";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { signIn, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com") {
      await signIn(email, password);
      navigate("/admin-dashboard/");
      console.log("Admin Login successful");
    } else {
      try {
        setError("");
        setLoading(true);
        await signIn(email, password);
        navigate("/dashboard/");
        console.log("Login successful", currentUser);
      } catch {
        setError("Login Failed");
      }
    }
  };

  return (
    <div className="Login">
      <div className="loginAside" />
      <div className="loginForm">
        <div className="loginFormCenter">
          <p className="loginFormTitle">Log In </p>
          <form className="loginFormFields">
            <div className="loginFormField">
              <label className="loginFormFieldLabel" htmlFor="email">
                E-Mail Address
              </label>
              <input
                type="email"
                id="email"
                className="loginFormFieldInput"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="loginFormField">
              <label className="loginFormFieldLabel" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="loginFormFieldInput"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="loginFormField">
              <button className="loginFormFieldButton" onClick={handleLogin}>
                Log In
              </button>
              <Link to="/signup" className="loginFormFieldLink">
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
