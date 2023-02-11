import React from "react";
import { Routes, Route } from "react-router-dom";

import { AdminHome, CandidateScreen, ExamScreen } from "../Pages/Admin";
import ParticipationScreen from "../Pages/Admin/ParticipationScreen";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/exam" element={<ExamScreen />} />
      <Route path="/candidate" element={<CandidateScreen />} />
      <Route path="/participation" element={<ParticipationScreen />} />
    </Routes>
  );
};

export default AdminRoutes;
