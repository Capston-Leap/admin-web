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
    steps: [
      { stepNum: 1, description: "" },
      { stepNum: 2, description: "" },
      { stepNum: 3, description: "" }
    ],
  });

  const [selectedStep, setSelectedStep] = useState(1);

  const handleSubmit = () => {
    axios.post("/admin/mission", form)
      .then(() => {
        alert("미션 등록 완료");
        navigate("/admin/dashboard/missionmanage");
      })
      .catch(() => alert("등록 실패"));
  };

  const handleStepChange = (e) => {
    setSelectedStep(Number(e.target.value));
  };

  const handleStepDescriptionChange = (e) => {
    const newSteps = [...form.steps];
    newSteps[selectedStep - 1].description = e.target.value;
    setForm({ ...form, steps: newSteps });
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
            <label>단계 선택</label>
            <select value={selectedStep} onChange={handleStepChange}>
              <option value={1}>단계 1</option>
              <option value={2}>단계 2</option>
              <option value={3}>단계 3</option>
            </select>
          </div>

          <div className="form-group">
            <label>{`단계 ${selectedStep} 설명`}</label>
            <input
              placeholder={`단계 ${selectedStep} 설명을 입력하세요`}
              value={form.steps[selectedStep - 1].description}
              onChange={handleStepDescriptionChange}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminMissionRegister;
