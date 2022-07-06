import { Route, Routes } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
      </Routes>
    </div>
  );
};

export default App;
