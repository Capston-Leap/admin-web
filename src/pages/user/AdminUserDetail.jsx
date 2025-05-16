import React, { useEffect, useState, useCallback } from "react";
import axios from "../../api/axiosInstance";

const AdminUserDetail = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const size = 10;

  const fetchUsers = useCallback(() => {
    axios
      .get("/admin/user", { params: { page, size } })
      .then((res) => {
        setUsers(res.data.userList);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error("회원 조회 실패", err);
        alert("회원 조회 중 오류 발생");
      });
  }, [page, size]);

  const handleDelete = (userId) => {
    if (!window.confirm("정말 이 회원을 탈퇴 처리하시겠습니까?")) return;

    axios
      .patch(`/admin/user/${userId}`)
      .then(() => {
        alert("탈퇴 처리 완료");
        fetchUsers();
      })
      .catch((err) => {
        console.error("탈퇴 처리 실패", err);
        alert("탈퇴 처리 중 오류 발생");
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="admin-user-container">
      <h2>회원 목록</h2>

      <table className="admin-user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>닉네임</th>
            <th>이메일</th>
            <th>생년월일</th>
            <th>가입일</th>
            <th>챗봇 타입</th>
            <th>레벨</th>
            <th>미션 유형</th>
            <th>회원 유형</th>
            <th>탈퇴 여부</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.nickname}</td>
              <td>{user.loginId}</td>
              <td>{user.birth}</td>
              <td>{new Date(user.registerTime).toLocaleString()}</td>
              <td>{user.chatbotType}</td>
              <td>{user.level}</td>
              <td>{user.missionType}</td>
              <td>{user.userType}</td>
              <td>{user.isDeleted}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>탈퇴</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}>이전</button>
        <span>{page + 1} / {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>다음</button>
      </div>
    </div>
  );
};

export default AdminUserDetail;
