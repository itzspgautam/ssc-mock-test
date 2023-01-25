import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { SystemAction } from "../State/Actions";
import AdminProtected from "./AdminProtectedRoute";
import AdminRoutes from "./AdminRoutes";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const appStart = async () => {
    await dispatch(SystemAction.appStart());
  };

  useEffect(() => {
    appStart();
  }, []);

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
