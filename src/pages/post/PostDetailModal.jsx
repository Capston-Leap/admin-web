import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import "./AdminPostManagement.css";

const PostDetailModal = ({ communityId, postId, onClose }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`/admin/community/${communityId}/${postId}`)
      .then((res) => {
        setPost(res.data);
        setComments(res.data.comments?.content || []);
      })
      .catch((err) => {
        console.error("상세 조회 실패", err);
        alert("게시글 상세 조회 실패");
      });
  }, [communityId, postId]);

  const handlePostDelete = () => {
    if (!window.confirm("정말 이 게시글을 삭제하시겠습니까?")) return;
    axios
      .delete(`/admin/community/${communityId}/${postId}`)
      .then(() => {
        alert("게시글 삭제 완료");
        onClose(); // 모달 닫기
      })
      .catch((err) => {
        console.error("게시글 삭제 실패", err);
        alert("게시글 삭제 중 오류 발생");
      });
  };

  const handleCommentDelete = (commentId) => {
    if (!window.confirm("이 댓글을 삭제하시겠습니까?")) return;
    axios
      .delete(`/admin/community/${communityId}/${postId}/comment/${commentId}`)
      .then(() => {
        alert("댓글 삭제 완료");
        setComments((prev) => prev.filter((c) => c.commentId !== commentId));
      })
      .catch((err) => {
        console.error("댓글 삭제 실패", err);
        alert("댓글 삭제 중 오류 발생");
      });
  };

  if (!post) return null;

  return (
    <div className="post-detail-modal">
      <div className="modal-header">
        <h3>{post.title}</h3>
        <button onClick={onClose}>닫기</button>
      </div>

      <div className="modal-body">
        <p><strong>작성자:</strong> {post.nickname}</p>
        <p><strong>작성일:</strong> {new Date(post.createdAt).toLocaleString()}</p>
        <p><strong>내용:</strong></p>
        <p>{post.content}</p>
        <button onClick={handlePostDelete} className="delete-btn">게시글 삭제</button>

        <h4>댓글 목록</h4>
        {comments.length === 0 ? (
          <p>댓글이 없습니다.</p>
        ) : (
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment.commentId}>
                <p><strong>{comment.nickname}</strong>: {comment.content}</p>
                <p>{new Date(comment.createdAt).toLocaleString()}</p>
                <button onClick={() => handleCommentDelete(comment.commentId)}>댓글 삭제</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PostDetailModal;
