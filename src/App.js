// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/login/AdminLogin";
import AdminSignup from "./pages/login/AdminSignup";
import AdminLayout from "./pages/layout/AdminLayout";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminUserDetail from "./pages/user/AdminUserDetail";
import AdminMissionManage from "./pages/mission/AdminMissionManage";
import AdminPostManagement from "./pages/post/AdminPostManagement";
import AdminPolicyManagement from "./pages/community/AdminPolicyManagement";
import AdminPolicyCreate from "./pages/community/AdminPolicyCreate";
import AdminPolicyEdit from "./pages/community/AdminPolicyEdit";
import AdminMissionRegister from "./pages/mission/AdminMissionRegister";
import AdminMissionEdit from "./pages/mission/AdminMissionEdit";

function App() {
  return (
    <Router>
      <Routes>
        {/* 로그인/회원가입은 레이아웃 없이 단독 화면 */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />

        {/* 관리자 레이아웃: 사이드바 + Outlet */}
        <Route path="/admin/dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} /> {/* /admin/dashboard */}
          <Route path="userdetail" element={<AdminUserDetail />} />
          <Route path="missionmanage" element={<AdminMissionManage />} />
          <Route path="postmanagement" element={<AdminPostManagement />} />
          <Route path="policymanagement" element={<AdminPolicyManagement />} />
          <Route path="policymanagement/create" element={<AdminPolicyCreate />} />
          <Route path="policymanagement/edit/:id" element={<AdminPolicyEdit />} />
          <Route path="mission/register" element={<AdminMissionRegister />} />
          <Route path="mission/edit/:missionId" element={<AdminMissionEdit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;