import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import "./AdminPolicyManagement.css";

const AdminPolicyManagement = () => {
  const [policies, setPolicies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchPolicies = useCallback(() => {
    axios
      .get("/admin/information", {
        params: { page, size: 10 },
      })
      .then((res) => {
        setPolicies(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error("목록 조회 실패", err);
        if (err.response?.status === 401) {
          alert("인증이 필요합니다. 다시 로그인하세요.");
        }
      });
  }, [page]);

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  const handleDelete = (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    axios
      .delete(`/admin/information/${id}`)
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

  return (
    <div className="policy-container">
      <h2>자립지원정보 관리</h2>

      <div className="toolbar" style={{ textAlign: "right", marginBottom: "16px" }}>
        <button onClick={() => navigate("create")}>등록</button>
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
              <td>{policy.category}</td>
              <td>
                <a href={policy.url} target="_blank" rel="noreferrer">
                  {policy.title}
                </a>
              </td>
              <td>{policy.content}</td>
              <td>
                <a href={policy.url} target="_blank" rel="noreferrer">
                  바로가기
                </a>
              </td>
              <td>
                <button onClick={() => navigate(`edit/${policy.id}`)}>수정</button>
                <button onClick={() => handleDelete(policy.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          이전
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
};

export default AdminPolicyManagement;
