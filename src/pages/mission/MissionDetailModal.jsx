import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import "./MissionDetailModal.css";

const MissionDetailModal = ({ missionId, onClose }) => {
  const [mission, setMission] = useState(null);

  useEffect(() => {
    if (!missionId) return;

    axios
      .get(`/admin/mission/${missionId}`)
      .then((res) => setMission(res.data))
      .catch((err) => {
        console.error("미션 상세 조회 실패", err);
        alert("상세 정보를 불러오는 데 실패했습니다.");
        onClose();
      });
  }, [missionId, onClose]);

  if (!mission) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{mission.title}</h3>
        <p><strong>카테고리:</strong> {mission.category}</p>
        <p><strong>설명:</strong> {mission.description}</p>
        <p><strong>등록일:</strong> {new Date(mission.createdTime).toLocaleString()}</p>
        <p><strong>수정일:</strong> {new Date(mission.updateTime).toLocaleString()}</p>
        <p><strong>삭제 여부:</strong> {mission.isDeleted}</p>

        <h4>미션 단계</h4>
        <ul>
          {mission.steps?.map((step) => (
            <li key={step.stepNum}>
              <strong>Step {step.stepNum}:</strong> {step.description}
            </li>
          ))}
        </ul>

        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default MissionDetailModal;
