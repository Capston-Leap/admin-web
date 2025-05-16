import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import "./PostDetailModal.css";

const PostDetailModal = ({ communityId, postId, onClose }) => {
  const [postDetail, setPostDetail] = useState(null);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  useEffect(() => {
    if (!communityId || !postId) return;

    const fetchPostDetail = () => {
      axios
        .get(`/admin/community/${communityId}/${postId}`, {
          params: { page, size },
        })
        .then((res) => {
          setPostDetail(res.data);
          setComments(res.data.comments?.content || []);
        })
        .catch((err) => {
          console.error("게시글 상세 조회 실패", err);
          alert("게시글 상세 조회 중 오류가 발생했습니다.");
        });
    };

    fetchPostDetail();
  }, [communityId, postId, page, size]);

  const handleCommentDelete = (commentId) => {
    if (!window.confirm("이 댓글을 삭제하시겠습니까?")) return;

    axios
      .delete(`/admin/community/${communityId}/${postId}/${commentId}`)
      .then(() => {
        alert("댓글 삭제 성공");
        return axios.get(`/admin/community/${communityId}/${postId}`, {
          params: { page, size },
        });
      })
      .then((res) => {
        setPostDetail(res.data);
        setComments(res.data.comments?.content || []);
      })
      .catch((err) => {
        console.error("댓글 삭제 실패", err);
        alert("댓글 삭제 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>게시글 상세</h3>
        <button className="modal-close-btn" onClick={onClose}>
          ✕ 닫기
        </button>

        <div className="modal-section">
          <p><strong>제목:</strong> {postDetail.title}</p>
          <p><strong>작성자:</strong> {postDetail.nickname}</p>
          <p><strong>작성일:</strong> {new Date(postDetail.createdAt).toLocaleString()}</p>
          <p><strong>내용:</strong> {postDetail.content}</p>
        </div>

        <div className="modal-section">
          <h4>댓글 목록</h4>
          {comments.length === 0 ? (
            <p>댓글이 없습니다.</p>
          ) : (
            <ul className="comment-list">
              {comments.map((comment) => (
                <li key={comment.commentId}>
                  <p><strong>{comment.nickname}</strong>: {comment.content}</p>
                  <p className="comment-time">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                  <button
                    className="delete-comment-btn"
                    onClick={() => handleCommentDelete(comment.commentId)}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="modal-pagination">
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            이전
          </button>
          <span>{page}</span>
          <button onClick={() => setPage((p) => p + 1)}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
