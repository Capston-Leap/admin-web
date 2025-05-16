import React, { useState, useEffect, useCallback } from "react";
import axios from "../../api/axiosInstance";
import "./AdminMissionManage.css";
import MissionDetailModal from "./MissionDetailModal";

const AdminMissionManage = () => {
  const [missions, setMissions] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMissionId, setSelectedMissionId] = useState(null);
  const [editingMission, setEditingMission] = useState(null);

  const [newMission, setNewMission] = useState({
    title: "",
    description: "",
    category: "",
    steps: [{ stepNum: 1, description: "" }],
  });

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

  const handleMissionAdd = () => {
    const { title, description, category, steps } = newMission;
    if (!title || !description || !category || steps.some((s) => !s.description)) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    axios.post("/admin/mission", newMission)
      .then(() => {
        alert("미션 등록 완료");
        setNewMission({
          title: "",
          description: "",
          category: "",
          steps: [{ stepNum: 1, description: "" }],
        });
        setPage(0);
        fetchMissions();
      })
      .catch((err) => {
        console.error("미션 등록 실패", err);
        alert("미션 등록 중 오류 발생");
      });
  };

  const handleEditMissionStart = (mission) => {
    setEditingMission({
      id: mission.id,
      title: mission.title,
      description: mission.description,
      category: mission.category,
      steps: mission.steps || [{ stepNum: 1, description: "" }],
    });
  };

  const handleEditMissionSave = () => {
    const { id, title, description, category, steps } = editingMission;

    axios.patch(`/admin/mission/${id}`, {
      title, description, category, steps
    })
      .then(() => {
        alert("미션이 수정되었습니다.");
        setEditingMission(null);
        fetchMissions();
      })
      .catch((err) => {
        console.error("미션 수정 실패", err);
        alert("수정 중 오류가 발생했습니다.");
      });
  };

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

  const handleStepChange = (index, value) => {
    const updatedSteps = [...newMission.steps];
    updatedSteps[index].description = value;
    setNewMission({ ...newMission, steps: updatedSteps });
  };

  return (
    <div className="mission-manage-container">
      <h2>미션 관리</h2>

      <div className="mission-form">
        <input
          placeholder="제목"
          value={newMission.title}
          onChange={(e) => setNewMission({ ...newMission, title: e.target.value })}
        />
        <input
          placeholder="설명"
          value={newMission.description}
          onChange={(e) => setNewMission({ ...newMission, description: e.target.value })}
        />
        <input
          placeholder="카테고리"
          value={newMission.category}
          onChange={(e) => setNewMission({ ...newMission, category: e.target.value })}
        />

        {newMission.steps.map((step, idx) => (
          <input
            key={idx}
            placeholder={`단계 ${step.stepNum} 설명`}
            value={step.description}
            onChange={(e) => handleStepChange(idx, e.target.value)}
          />
        ))}

        <button onClick={handleMissionAdd}>미션 등록</button>
      </div>
      {editingMission && (
        <div className="mission-form">
          <h3>미션 수정</h3>
          <input
            placeholder="제목"
            value={editingMission.title}
            onChange={(e) =>
              setEditingMission({ ...editingMission, title: e.target.value })
            }
          />
          <input
            placeholder="설명"
            value={editingMission.description}
            onChange={(e) =>
              setEditingMission({ ...editingMission, description: e.target.value })
            }
          />
          <input
            placeholder="카테고리"
            value={editingMission.category}
            onChange={(e) =>
              setEditingMission({ ...editingMission, category: e.target.value })
            }
          />
          {editingMission.steps.map((step, index) => (
            <input
              key={index}
              placeholder={`단계 ${step.stepNum} 설명`}
              value={step.description}
              onChange={(e) => {
                const updatedSteps = [...editingMission.steps];
                updatedSteps[index].description = e.target.value;
                setEditingMission({ ...editingMission, steps: updatedSteps });
              }}
            />
          ))}

          <button onClick={handleEditMissionSave}>수정 저장</button>
          <button onClick={() => setEditingMission(null)}>취소</button>
        </div>
      )}


      <table className="mission-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>카테고리</th>
            <th>생성일</th>
            <th>수정일</th>
            <th>삭제 여부</th>
            <th>관리</th>  {/* ← 여기에 삭제 버튼 넣기 위함 */}
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
                <button onClick={() => handleEditMissionStart(mission)}>수정</button>
                <button onClick={() => handleMissionDelete(mission.id)}>삭제</button>
              </td>

              <td>
                <button onClick={() => handleMissionDelete(mission.id)}>삭제</button>
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
        <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
          이전
        </button>
        <span>{page + 1} / {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>
          다음
        </button>
      </div>
    </div>
  );
};

export default AdminMissionManage;
