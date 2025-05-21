import React, { useState, useEffect, useCallback } from "react";
import axios from "../../api/axiosInstance";
import "./AdminMissionManage.css";
import MissionDetailModal from "./MissionDetailModal";
import { useNavigate } from "react-router-dom";

const AdminMissionManage = () => {
  const [missions, setMissions] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMissionId, setSelectedMissionId] = useState(null);
  const navigate = useNavigate(); 

  const fetchMissions = useCallback(() => {
    axios
      .get("/admin/mission", { params: { page, size: 10 } })
      .then((res) => {
        setMissions(res.data.missionList);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error("미션 목록 조회 실패", err));
  }, [page]);

  useEffect(() => {
    fetchMissions();
  }, [fetchMissions]);

  const handleMissionDelete = (missionId) => {
    if (!window.confirm("정말로 이 미션을 삭제하시겠습니까?")) return;

    axios.delete(`/admin/mission/${missionId}`)
      .then(() => {
        alert("미션이 삭제되었습니다.");
        fetchMissions();
      })
      .catch((err) => {
        console.error("미션 삭제 실패", err);
        alert("삭제 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="mission-manage-container">
      <h2>미션 관리</h2>

      <div className="mission-form">
        <button onClick={() => navigate("/admin/dashboard/mission/register")}>미션 등록</button>
      </div>

      <table className="mission-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>카테고리</th>
            <th>생성일</th>
            <th>수정일</th>
            <th>삭제 여부</th>
            <th>내용</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {missions.map((mission) => (
            <tr key={mission.id}>
              <td>{mission.id}</td>
              <td>{mission.title}</td>
              <td>{mission.category}</td>
              <td>{new Date(mission.createdTime).toLocaleString()}</td>
              <td>{new Date(mission.updateTime).toLocaleString()}</td>
              <td>{mission.isDeleted}</td>
              <td onClick={() => setSelectedMissionId(mission.id)}>{mission.title}</td>
              <td>
                <div className="action-buttons">
                  <button onClick={() => navigate(`/admin/dashboard/mission/edit/${mission.id}`)}>수정</button>
                  <button onClick={() => handleMissionDelete(mission.id)}>삭제</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedMissionId && (
        <MissionDetailModal
          missionId={selectedMissionId}
          onClose={() => setSelectedMissionId(null)}
        />
      )}

      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>이전</button>
        <span>{page + 1} / {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>다음</button>
      </div>
    </div>
  );
};

export default AdminMissionManage;
