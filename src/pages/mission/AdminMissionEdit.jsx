import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import "./AdminMissionRegister.css"; // ✅ 등록과 같은 스타일 사용

const AdminMissionEdit = () => {
  const { missionId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    steps: [{ stepNum: 1, description: "" }],
  });

  useEffect(() => {
    axios.get(`/admin/mission/${missionId}`)
      .then((res) => setForm(res.data))
      .catch(() => alert("불러오기 실패"));
  }, [missionId]);

  const handleUpdate = () => {
    axios.patch(`/admin/mission/${missionId}`, form)
      .then(() => {
        alert("수정 완료");
        navigate("/admin/dashboard/missionmanage");
      })
      .catch(() => alert("수정 실패"));
  };

  return (
    <div className="mission-manage-container">
      <div className="mission-register-container">
        <div className="mission-register-header">
          <h2 className="form-title">미션 수정</h2>
          <button className="submit-button" onClick={handleUpdate}>수정</button>
        </div>

        <div className="mission-register-form">
          <div className="form-group">
            <label>제목</label>
            <input
              placeholder="제목을 입력하세요"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>설명</label>
            <input
              placeholder="설명을 입력하세요"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>카테고리</label>
            <input
              placeholder="카테고리를 입력하세요"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>단계 설명</label>
            <input
              placeholder="단계 설명을 입력하세요"
              value={form.steps[0].description}
              onChange={(e) => {
                const steps = [...form.steps];
                steps[0].description = e.target.value;
                setForm({ ...form, steps });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMissionEdit;
