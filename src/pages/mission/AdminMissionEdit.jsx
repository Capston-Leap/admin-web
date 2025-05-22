import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import "./AdminMissionRegister.css";

const AdminMissionEdit = () => {
  const { missionId } = useParams();
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

  useEffect(() => {
    axios.get(`/admin/mission/${missionId}`)
      .then((res) => {
        // 받아온 데이터에 steps가 부족하면 보정
        const fetchedSteps = res.data.steps || [];
        const paddedSteps = [1, 2, 3].map(num => {
          const step = fetchedSteps.find(s => s.stepNum === num);
          return step ? step : { stepNum: num, description: "" };
        });

        setForm({
          ...res.data,
          steps: paddedSteps
        });
      })
      .catch(() => alert("불러오기 실패"));
  }, [missionId]);

  const handleStepChange = (index, value) => {
    const newSteps = [...form.steps];
    newSteps[index].description = value;
    setForm({ ...form, steps: newSteps });
  };

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

          {/* 단계 1~3 설명 입력 필드 */}
          {form.steps.map((step, index) => (
            <div className="form-group" key={step.stepNum}>
              <label>{`단계 ${step.stepNum} 설명`}</label>
              <input
                placeholder={`단계 ${step.stepNum} 설명을 입력하세요`}
                value={step.description}
                onChange={(e) => handleStepChange(index, e.target.value)}
              />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default AdminMissionEdit;
