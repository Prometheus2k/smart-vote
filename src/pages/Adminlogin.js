import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Authcontext";
import "../styles/Adminlogin.css";

const AdminLogin = ({ smartVote, account }) => {
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const [admin, setAdmin] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (smartVote) {
      console.log(account);
      console.log(typeof account);
      if (
        admin === "admin@gmail.com" &&
        account === "0x7ffC260ef58905e9a8F462a4C9b838c21352FF90"
      ) {
        await signIn(admin, password);
        navigate("/admin-dashboard/");
        console.log("Admin Login successful");
      } else {
        alert("Not an Admin!");
        navigate("/admin-login");
      }
    }
  };

  return (
    <div className="AdminLogin" id="AdminLogin">
      {/* {console.log(smartVote, account)} */}
      <div className="adminLoginAside" />
      <div className="adminLoginForm">
        <div className="adminLoginFormCenter">
          <p className="adminLoginFormTitle">Login</p>
          <form className="adminLoginFormFields">
            <div className="adminLoginFormField">
              <label className="adminLoginFormFieldLabel" htmlFor="email">
                E-Mail Address
              </label>
              <input
                type="email"
                id="email"
                className="adminLoginFormFieldInput"
                placeholder="Enter your Email"
                value={admin}
                onChange={(e) => setAdmin(e.target.value)}
              />
            </div>

            <div className="adminLoginFormField">
              <label className="adminLoginFormFieldLabel" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="adminLoginFormFieldInput"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="adminLoginFormField">
              <button
                className="adminLoginFormFieldButton"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
