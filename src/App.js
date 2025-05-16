// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/login/AdminLogin";
import AdminSignup from "./pages/login/AdminSignup";
import AdminUserDetail from "./pages/user/AdminUserDetail";
import AdminMissionManage from "./pages/mission/AdminMissionManage";
import AdminPostManagement from "./pages/post/AdminPostManagement";
import AdminPolicyManagement from "./pages/community/AdminPolicyManagement";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/userdetail" element={<AdminUserDetail />} />
        <Route path="/admin/missionmanage" element={<AdminMissionManage />} />
        <Route path="/admin/postmanagement" element={<AdminPostManagement />} />
        <Route path="/admin/policymanagement" element={<AdminPolicyManagement />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
