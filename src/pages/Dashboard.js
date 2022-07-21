import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar.js";
import Registration from "../components/Registration.js";
import Voting from "../components/Voting";
import Results from "../components/Results";

export default function Dashboard() {
  return (
    <div className="dashboard" style={{ display: "flex" }}>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}
