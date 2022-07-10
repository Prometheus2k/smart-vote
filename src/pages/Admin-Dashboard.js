import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AddCandidate from "../components/AddCandidate";
import Phases from "../components/Phases";
// import Phases from './Phases';
// import CandidatesList from './CandidatesList';
// import VoterList from './VoterList';

const AdminDashboard = () => {
  return (
    <div className="dashboard" style={{ display: "flex" }}>
      <AdminSidebar />
      <Routes>
        <Route exact path="/" element={<AddCandidate />} />
        <Route path="/phases" element={<Phases />} />
        {/* <Route path="/candidates-list" element={<CandidatesList />} /> */}
        {/* <Route path="/register-voter" element={<VoterList />} />  */}
      </Routes>
    </div>
  );
};

export default AdminDashboard;
