import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPostManagement.css";
import FreePostManagement from "./FreePostManagement";
import WorryPostManagement from "./WorryPostManagement";
import InfoPostManagement from "./InfoPostManagement";

const AdminPostManagement = () => {
  const navigate = useNavigate();
  const [communityId, setCommunityId] = useState(0);

  const handleNavigate = (id) => {
    navigate(`/admin/dashboard/postmanagement?communityId=${id}`);
  };

  return (
    <div className="post-manage-container">
      <h2 style={{ textAlign: "center" }}>게시글 관리</h2>

      <div className="community-nav-buttons">
        <button onClick={() => setCommunityId(1)}>자유</button>
        <button onClick={() => setCommunityId(2)}>고민</button>
        <button onClick={() => setCommunityId(3)}>정보</button>
      </div>

      <p className="post-description">
        왼쪽의 버튼을 눌러 원하는 게시판으로 이동하세요.
      </p>
      {communityId === 1 && <FreePostManagement />}
      {communityId === 2 && <WorryPostManagement />}
      {communityId === 3 && <InfoPostManagement />}
    </div>
  );
};

export default AdminPostManagement;
