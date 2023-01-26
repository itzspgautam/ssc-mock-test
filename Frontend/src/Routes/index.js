import React from "react";
import { Routes, Route } from "react-router-dom";

import { BrowserRouter } from "react-router-dom";
import {
  AssignCandidateScreen,
  HomeScreen,
  InstructionScreen,
  LoginScreen,
  QuestionScreen,
  QuestionSubmittedScreen,
} from "../Pages";
import AdminProtected from "./AdminProtectedRoute";
import AdminRoutes from "./AdminRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <AdminProtected>
              <AdminRoutes />
            </AdminProtected>
          }
        />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/assign" element={<AssignCandidateScreen />} />
        <Route path="/exam" element={<LoginScreen />} />
        <Route path="/instruction" element={<InstructionScreen />} />
        <Route path="/test" element={<QuestionScreen />} />
        <Route path="/submit" element={<QuestionSubmittedScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
