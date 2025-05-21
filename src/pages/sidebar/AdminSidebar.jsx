import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils/logout";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);

  const toggleCommunityMenu = () => {
    setIsCommunityOpen(prev => !prev);
  };

  const onLogout = () => {
    handleLogout();
    navigate("/admin/login");
  };

  return (
    <aside className="sidebar">
      <div className="menu-area">
        <Link to="/admin/dashboard" className="dashboard-title">관리자 페이지</Link>
        <ul>
          <li><Link to="/admin/dashboard/policymanagement">자립지원정보</Link></li>
          <li><Link to="/admin/dashboard/missionmanage">미션</Link></li>

          <li onClick={toggleCommunityMenu} className="dropdown-title">
            커뮤니티
          </li>
          {isCommunityOpen && (
            <ul className="dropdown-list">
              <li><Link to="/admin/dashboard/postmanagement?communityId=1">자유</Link></li>
              <li><Link to="/admin/dashboard/postmanagement?communityId=2">고민</Link></li>
              <li><Link to="/admin/dashboard/postmanagement?communityId=3">정보</Link></li>
            </ul>
          )}

          <li><Link to="/admin/dashboard/userdetail">회원 관리</Link></li>
        </ul>
      </div>

      <div className="logout-area">
        <button className="logout-button" onClick={onLogout}>로그아웃</button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
