import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/Authcontext";

import WelcomePage from "./pages/Welcomepage";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import AdminLogin from "./pages/Adminlogin.js";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route exact path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
