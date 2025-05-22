import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/login/AdminLogin";
import AdminSignup from "./pages/login/AdminSignup";
import AdminLayout from "./pages/layout/AdminLayout";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import AdminUserDetail from "./pages/user/AdminUserDetail";
import AdminMissionManage from "./pages/mission/AdminMissionManage";
import AdminPolicyManagement from "./pages/community/AdminPolicyManagement";
import AdminPolicyCreate from "./pages/community/AdminPolicyCreate";
import AdminPolicyEdit from "./pages/community/AdminPolicyEdit";
import AdminPolicyDetail from "./pages/community/AdminPolicyDetail";
import AdminMissionRegister from "./pages/mission/AdminMissionRegister";
import AdminMissionEdit from "./pages/mission/AdminMissionEdit";
import AdminPostManagement from "./pages/post/AdminPostManagement";

function App() {
  return (
    <Router>
      <Routes>
        {/* 로그인/회원가입 (단독 페이지) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />

        {/* 관리자 페이지 공통 레이아웃 포함 */}
        <Route path="/admin/dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="userdetail" element={<AdminUserDetail />} />
          <Route path="missionmanage" element={<AdminMissionManage />} />
          <Route path="policymanagement" element={<AdminPolicyManagement />} />
          <Route path="policymanagement/create" element={<AdminPolicyCreate />} />
          <Route path="policymanagement/edit/:id" element={<AdminPolicyEdit />} />
          <Route path="policymanagement/detail/:informationId" element={<AdminPolicyDetail />} /> {/* ✅ 이동 */}
          <Route path="mission/register" element={<AdminMissionRegister />} />
          <Route path="mission/edit/:missionId" element={<AdminMissionEdit />} />
          <Route path="postmanagement" element={<AdminPostManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
