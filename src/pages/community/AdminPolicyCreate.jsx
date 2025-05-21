import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import "./AdminPolicyManagement.css";
import "./AdminPolicyCreate.css";

const AdminPolicyCreate = () => {
  const [form, setForm] = useState({
    category: "",
    title: "",
    content: "",
    url: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const { category, title, content, url } = form;

    if (!category || !title || !content || !url) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      await axios.post("/admin/information", form);
      alert("정책이 성공적으로 등록되었습니다.");
      navigate("/admin/dashboard/policymanagement");
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

return (
  <div className="policy-container">
    <div className="form-header">
      <h2 className="form-title">자립지원정보 등록</h2>
      <button className="form-submit-button" onClick={handleSubmit}>
        등록
      </button>
    </div>

    <div className="policy-form">
      {/* 카테고리 (select) */}
      <div className="input-group">
        <label>카테고리</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="CAREER">CAREER</option>
          <option value="ECONOMY">ECONOMY</option>
          <option value="HEALTH">HEALTH</option>
          <option value="HOUSING">HOUSING</option>
          <option value="MENTAL">MENTAL</option>
        </select>
      </div>

      {/* 제목 */}
      <div className="input-group">
        <label>제목</label>
        <input
          placeholder="제목을 입력해주세요."
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>

      {/* 내용 (textarea) */}
      <div className="input-group">
        <label>내용</label>
        <input
          placeholder="내용을 입력해주세요."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
      </div>

      {/* URL */}
      <div className="input-group">
        <label>URL</label>
        <input
          placeholder="URL"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
        />
      </div>
    </div>
  </div>
);

};

export default AdminPolicyCreate;
