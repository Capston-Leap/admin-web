// src/pages/layout/AdminLayout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../sidebar/AdminSidebar";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="dashboard-container">
      <AdminSidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;