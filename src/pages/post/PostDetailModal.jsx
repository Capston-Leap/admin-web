import React, { useState, useEffect, useCallback } from "react";
import axios from "../../api/axiosInstance";
import "./PostDetailModal.css";

const PostDetailModal = ({ communityId, postId, onClose, onDelete }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  // ✅ useCallback으로 fetchPostDetail 정의
  const fetchPostDetail = useCallback(() => {
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

  // ✅ useEffect에 fetchPostDetail을 의존성으로 명시
  useEffect(() => {
    fetchPostDetail();
  }, [fetchPostDetail]);

  const handlePostDelete = () => {
    if (!window.confirm("정말 이 게시글을 삭제하시겠습니까?")) return;
    axios
      .delete(`/admin/community/${communityId}/${postId}`)
      .then(() => {
        alert("게시글 삭제 완료");
        onDelete();
      })
      .catch((err) => {
        console.error("게시글 삭제 실패", err);
        alert("게시글 삭제 중 오류 발생");
      });
  };

  const handleCommentDelete = (commentId) => {
    if (!window.confirm("이 댓글을 삭제하시겠습니까?")) return;
    axios
      .delete(`/admin/community/${communityId}/${postId}/${commentId}`)
      .then(() => {
        alert("댓글 삭제 완료");
        fetchPostDetail(); // ✅ 삭제 후 최신 댓글 불러오기
      })
      .catch((err) => {
        console.error("댓글 삭제 실패", err);
        alert("댓글 삭제 중 오류 발생");
      });
  };

  if (!post) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="post-detail-modal">
        <div className="modal-header">
          <h3>{post.title}</h3>
        </div>

        <div className="modal-body">
          <p><strong>작성자:</strong> {post.nickname}</p>
          <p><strong>작성일:</strong> {new Date(post.createdAt).toLocaleDateString("ko-KR")}</p>
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
                  <div>
                    <p><strong>{comment.nickname}</strong>: {comment.content}</p>
                    <p className="comment-time">{new Date(comment.createdAt).toLocaleDateString("ko-KR")}</p>
                  </div>
                  <button
                    className="comment-delete-btn"
                    onClick={() => handleCommentDelete(comment.commentId)}
                  >
                    댓글 삭제
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button onClick={onClose} className="delete-btn">닫기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailModal;
