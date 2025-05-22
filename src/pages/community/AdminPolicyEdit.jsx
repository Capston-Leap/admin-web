import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import "./AdminPolicyManagement.css";
import "./AdminPolicyCreate.css";

const AdminPolicyEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category: "",
    title: "",
    content: "",
    url: "",
  });

  useEffect(() => {
    axios.get(`/admin/information/${id}`)
      .then((res) => {
        setForm({
          category: res.data.category,
          title: res.data.title,
          content: res.data.content,
          url: res.data.url,
        });
      })
      .catch((err) => {
        console.error("자립지원정보 불러오기 실패", err);
        alert("해당 자립지원정보를 불러오는 데 실패했습니다.");
        navigate("/admin/dashboard/policymanagement");
      });
  }, [id, navigate]);

  const handleUpdate = async () => {
    const { category, title, content, url } = form;

    if (!category || !title || !content || !url) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    try {
      await axios.patch(`/admin/information/${id}`, form);
      alert("자립지원정보가 성공적으로 수정되었습니다.");
      navigate("/admin/dashboard/policymanagement");
    } catch (err) {
      console.error("수정 실패", err);
      alert("자립지원정보 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="policy-container">
      <div className="form-header">
        <h2 className="form-title">자립지원정보 수정</h2>
        <button className="form-submit-button" onClick={handleUpdate}>
          수정완료
        </button>
      </div>

      <div className="policy-form">
        {/* 카테고리 */}
        <div className="input-group">
          <label>카테고리</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="">-- 카테고리를 선택하세요 --</option>
            <option value="ECONOMY">경제</option>
            <option value="CAREER">진로</option>
            <option value="HOUSING">주거</option>
          </select>
        </div>

        {/* 제목 */}
        <div className="input-group">
          <label>제목</label>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* 내용 */}
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
            type="url"
            placeholder="URL을 입력해주세요. 예: http://example.com"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPolicyEdit;
