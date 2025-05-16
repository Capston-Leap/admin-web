import React, { useEffect, useState, useCallback } from "react";
import axios from "../../api/axiosInstance";
import "./AdminPolicyManagement.css";

const AdminPolicyManagement = () => {
  const [policies, setPolicies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [newPolicy, setNewPolicy] = useState({
    category: "",
    title: "",
    content: "",
    url: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    category: "",
    title: "",
    content: "",
    url: "",
  });

  // 목록 조회
const fetchPolicies = useCallback(() => {
  axios.get("/admin/information", {
    params: { page, size: 10 },
  })
  .then((res) => {
    setPolicies(res.data.content);
    setTotalPages(res.data.totalPages);
  })
  .catch((err) => {
    console.error("목록 조회 실패", err);
    if (err.response?.status === 401) alert("인증이 필요합니다. 다시 로그인하세요.");
  });
}, [page]);

useEffect(() => {
  fetchPolicies();
}, [fetchPolicies]);

  const handleAdd = () => {
    const { category, title, content, url } = newPolicy;
    if (!category || !title || !content || !url) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    axios.post("/admin/information", newPolicy)
      .then(() => {
        alert("등록 완료");
        setNewPolicy({ category: "", title: "", content: "", url: "" });
        fetchPolicies(); // 목록 갱신
      })
      .catch((err) => {
        console.error("등록 실패", err);
        alert("등록 중 오류가 발생했습니다.");
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    axios.delete(`/admin/information/${id}`)
      .then((res) => {
        alert(res.data?.message || "삭제 완료되었습니다.");
        fetchPolicies();
      })
      .catch((err) => {
        console.error("삭제 실패", err);
        if (err.response?.status === 404) {
          alert("해당 정보를 찾을 수 없습니다.");
        } else if (err.response?.status === 401) {
          alert("인증이 필요합니다.");
        } else {
          alert("삭제 중 오류가 발생했습니다.");
        }
      });
  };

  const startEdit = (policy) => {
    setEditingId(policy.id);

    axios.get(`/admin/information/${policy.id}`)
      .then((res) => {
        const data = res.data;
        setEditData({
          category: data.category,
          title: data.title,
          content: data.content,
          url: data.url,
        });
      })
      .catch((err) => {
        console.error("상세 조회 실패", err);
        alert("데이터를 불러오지 못했습니다.");
      });
  };

  const handleSave = (id) => {
    axios.patch(`/admin/information/${id}`, editData)
      .then((res) => {
        alert(res.data?.message || "수정 완료");
        setEditingId(null);
        fetchPolicies();
      })
      .catch((err) => {
        console.error("수정 실패", err);
        if (err.response?.status === 404) {
          alert("해당 정보를 찾을 수 없습니다.");
        } else if (err.response?.status === 401) {
          alert("인증이 필요합니다.");
        } else {
          alert("수정 중 오류가 발생했습니다.");
        }
      });
  };

  return (
    <div className="policy-container">
      <h2>자립지원정보 관리</h2>
      <div className="policy-form">
        <input
          placeholder="카테고리 (예: ECONOMY)"
          value={newPolicy.category}
          onChange={(e) => setNewPolicy({ ...newPolicy, category: e.target.value })}
        />
        <input
          placeholder="제목"
          value={newPolicy.title}
          onChange={(e) => setNewPolicy({ ...newPolicy, title: e.target.value })}
        />
        <input
          placeholder="내용"
          value={newPolicy.content}
          onChange={(e) => setNewPolicy({ ...newPolicy, content: e.target.value })}
        />
        <input
          placeholder="URL"
          value={newPolicy.url}
          onChange={(e) => setNewPolicy({ ...newPolicy, url: e.target.value })}
        />
        <button onClick={handleAdd}>등록</button>
      </div>

      <table className="policy-table">
        <thead>
          <tr>
            <th>카테고리</th>
            <th>제목</th>
            <th>내용</th>
            <th>URL</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy.id}>
              {editingId === policy.id ? (
                <>
                  <td><input value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} /></td>
                  <td><input value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} /></td>
                  <td><input value={editData.content} onChange={(e) => setEditData({ ...editData, content: e.target.value })} /></td>
                  <td><input value={editData.url} onChange={(e) => setEditData({ ...editData, url: e.target.value })} /></td>
                  <td><button onClick={() => handleSave(policy.id)}>저장</button></td>
                </>
              ) : (
                <>
                  <td>{policy.category}</td>
                  <td>{policy.title}</td>
                  <td>{policy.content}</td>
                  <td><a href={policy.url} target="_blank" rel="noreferrer">바로가기</a></td>
                  <td>
                    <button onClick={() => startEdit(policy)}>수정</button>
                    <button onClick={() => handleDelete(policy.id)}>삭제</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>이전</button>
        <span>{page} / {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>다음</button>
      </div>
    </div>
  );
};

export default AdminPolicyManagement;
