import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/Authcontext";

import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
