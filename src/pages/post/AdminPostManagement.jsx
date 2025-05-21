import React, { useState, useEffect, useCallback } from "react";
import axios from "../../api/axiosInstance";
import "./AdminPostManagement.css";
import PostDetailModal from "./PostDetailModal";

const AdminPostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [communityId, setCommunityId] = useState(2);
  const [page] = useState(1);
  const [size] = useState(10);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchPosts = useCallback(() => {
    axios
      .get(`/admin/community/${communityId}`, { params: { page, size } })
      .then((res) => setPosts(res.data.content))
      .catch((err) => {
        console.error("게시글 목록 조회 실패", err);
        alert("게시글 조회 중 오류 발생");
      });
  }, [communityId, page, size]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = (postId) => {
    if (!window.confirm("정말 이 게시글을 삭제하시겠습니까?")) return;

    axios
      .delete(`/admin/community/${communityId}/${postId}`)
      .then(() => {
        alert("삭제 성공");
        fetchPosts(); // 새로고침
      })
      .catch((err) => {
        console.error("삭제 실패", err);
        alert("삭제 중 오류 발생");
      });
  };

  return (
    <div className="post-manage-container">
      <h2>게시글 관리</h2>

      <div className="post-controls">
        <label>Community ID: </label>
        <input
          type="number"
          value={communityId}
          onChange={(e) => setCommunityId(Number(e.target.value))}
        />
      </div>

      <table className="post-table">
        <thead>
          <tr>
            <th>Post ID</th>
            <th>닉네임</th>
            <th>작성일</th>
            <th>제목</th>
            <th>내용</th>
            <th>댓글 수</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.postId}>
              <td>{post.postId}</td>
              <td>{post.nickname}</td>
              <td>{post.createdAt}</td>
              <td onClick={() => setSelectedPost(post)}>{post.title}</td>
              <td>{post.content}</td>
              <td>{post.commentCount}</td>
              <td>
                <button onClick={() => handleDelete(post.postId)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 상세 모달 */}
      {selectedPost && (
        <PostDetailModal
          communityId={communityId}
          postId={selectedPost.postId}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

export default AdminPostManagement;
