import React from "react";
import { Routes, Route } from "react-router-dom";

import { BrowserRouter } from "react-router-dom";
import { AdminHome, CandidateScreen, ExamScreen } from "../Pages/Admin";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/exam" element={<ExamScreen />} />
      <Route path="/candidate" element={<CandidateScreen />} />
    </Routes>
  );
};

export default AdminRoutes;
