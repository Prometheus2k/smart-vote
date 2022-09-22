import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AddCandidate from "../components/AddCandidate";
import Phases from "../components/Phases";
import CandidatesList from "../components/CandidatesList";
import VoterList from "../components/VoterList";

const AdminDashboard = ({ smartVote, account }) => {
  // console.log(smartVote);
  // console.log(account);
  return (
    <div className="dashboard" style={{ display: "flex" }}>
      <AdminSidebar />
      <Routes>
        <Route
          exact
          path="/"
          element={<AddCandidate smartVote={smartVote} account={account} />}
        />
        <Route
          path="/phases"
          element={<Phases smartVote={smartVote} account={account} />}
        />
        <Route
          path="/candidates-list"
          element={<CandidatesList smartVote={smartVote} account={account} />}
        />
        <Route
          path="/register-voter"
          element={<VoterList smartVote={smartVote} account={account} />}
        />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
