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

  const handleSubmit = () => {
    axios.post("/admin/mission", form)
      .then(() => {
        alert("미션 등록 완료");
        navigate("/admin/dashboard/missionmanage");
      })
      .catch(() => alert("등록 실패"));
  };

  const handleStepDescriptionChange = (index, value) => {
    const newSteps = [...form.steps];
    newSteps[index].description = value;
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
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">-- 카테고리를 선택하세요 --</option>
              <option value="SELF">SELF</option>
              <option value="MONEY">MONEY</option>
              <option value="SOCIETY">SOCIETY</option>
              <option value="LIFE">LIFE</option>
            </select>
          </div>

          {/* 단계별 설명 모두 표시 */}
          {form.steps.map((step, index) => (
            <div className="form-group" key={step.stepNum}>
              <label>{`단계 ${step.stepNum} 설명`}</label>
              <input
                placeholder={`단계 ${step.stepNum} 설명을 입력하세요`}
                value={step.description}
                onChange={(e) => handleStepDescriptionChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMissionRegister;
