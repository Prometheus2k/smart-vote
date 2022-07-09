import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Authcontext";
import "../styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { signUp, updateProf, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signUp(email, password);
      updateProf(name);
      console.log("Sign up successful");
      navigate("/dashboard");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  return (
    <div className="SignUp" id="Signup">
      <div className="signUpAside" />
      <div className="signUpForm">
        <div className="signUpFormCenter">
          <p className="signUpFormTitle">Sign Up</p>
          <form className="signUpFormFields">
            <div className="signUpFormField">
              <label className="signUpFormFieldLabel" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="signUpFormFieldInput"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="signUpFormField">
              <label className="signUpFormFieldLabel" htmlFor="email">
                E-Mail Address
              </label>
              <input
                type="email"
                id="email"
                className="signUpFormFieldInput"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="signUpFormField">
              <label className="signUpFormFieldLabel" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="signUpFormFieldInput"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="signUpFormField">
              <button className="signUpFormFieldButton" onClick={handleSubmit}>
                Sign Up
              </button>

              <Link to="/login" className="signUpFormFieldLink">
                Already have an Account? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
