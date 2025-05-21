import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import "./AdminMissionRegister.css";

const AdminMissionRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    steps: [{ stepNum: 1, description: "" }],
  });

  const handleSubmit = () => {
    axios.post("/admin/mission", form)
      .then(() => {
        alert("미션 등록 완료");
        navigate("/admin/dashboard/missionmanage");
      })
      .catch(() => alert("등록 실패"));
  };

return (
  <div className="mission-manage-container">
    <div className="mission-register-container">
      
      <div className="mission-register-header">
        <h2>미션 등록</h2>
        <button className="submit-button" onClick={handleSubmit}>등록</button>
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

export default AdminMissionRegister;
