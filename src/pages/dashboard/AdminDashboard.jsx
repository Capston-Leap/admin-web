// src/pages/dashboard/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils/logout";
import axios from "../../api/axiosInstance";
import "./AdminDashboard.css";

import AdminUserDetail from "../user/AdminUserDetail";
import AdminMissionManage from "../mission/AdminMissionManage";
import AdminPolicyManagement from "../community/AdminPolicyManagement";
import AdminPostManagement from "../post/AdminPostManagement";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    missionCount: 0,
    informationCount: 0,
    postCount: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/admin/dashboard")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("대시보드 API 실패:", err);
        if (err.response?.status === 401) {
          alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
          navigate("/admin/login");
        }
      });
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <main className="main-content">

        <Routes>
          <Route index element={
            <div className="card-grid">
              <div className="card"><h3>총 이용자 수</h3><p>{stats.userCount}</p></div>
              <div className="card"><h3>미션 수</h3><p>{stats.missionCount}</p></div>
              <div className="card"><h3>자립지원정보 수</h3><p>{stats.informationCount}</p></div>
              <div className="card"><h3>게시글 수</h3><p>{stats.postCount}</p></div>
            </div>
          } />

          <Route path="userdetail" element={<AdminUserDetail />} />
          <Route path="missionmanage" element={<AdminMissionManage />} />
          <Route path="policymanagement" element={<AdminPolicyManagement />} />
          <Route path="postmanagement" element={<AdminPostManagement />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
