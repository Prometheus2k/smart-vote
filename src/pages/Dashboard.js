import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar.js";
import Registration from "../components/Registration.js";
import Voting from "../components/Voting";
import Results from "../components/Results";

export default function Dashboard({ smartVote, account }) {
  console.log(smartVote, account);
  return (
    <div className="dashboard" style={{ display: "flex" }}>
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={<Registration smartVote={smartVote} account={account} />}
        />
        <Route path="/voting" element={<Voting />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}
