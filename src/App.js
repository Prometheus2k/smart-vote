import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/Authcontext";

import WelcomePage from "./pages/Welcomepage";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/Adminlogin.js";
import AdminDashboard from "./pages/Admin-Dashboard";

import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route exact path="/admin-login" element={<AdminLogin />} />
          <Route exact path="/admin-dashboard/*" element={<AdminDashboard />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
