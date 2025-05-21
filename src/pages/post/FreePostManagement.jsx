import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../api/axiosInstance";
import PostDetailModal from "./PostDetailModal";
import "./PostManagement.css";

const FreePostManagement = () => {
  const communityId = 1;
  const [searchParams] = useSearchParams();
  const rawPage = Number(searchParams.get("page"));
  const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchPosts = useCallback(() => {
    axios
      .get(`/admin/community/${communityId}`, { params: { page, size: 10 } })
      .then((res) => setPosts(res.data.content))
      .catch((err) => {
        console.error("자유 게시글 조회 실패", err);
        alert("게시글 조회 오류");
      });
  }, [communityId, page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="post-manage-container">
      <h2>자유 게시글 관리</h2>

      <div className="post-card-list">
        {posts.map((post) => (
          <div className="post-card" key={post.postId}>
            <div className="post-card-header">
              <span>{post.nickname}</span>
              <span>{new Date(post.createdAt).toLocaleString()}</span>
            </div>
            <div className="post-id">Post ID: {post.postId}</div>
            <h3
              className="post-title"
              onClick={() => setSelectedPost(post)}
              style={{ cursor: "pointer", color: "#2563eb" }}
            >
              {post.title}
            </h3>
            <p className="post-content">
              {post.content.length > 100
                ? post.content.slice(0, 100) + "..."
                : post.content}
            </p>
            <div className="post-footer">
              <span>댓글 {post.commentCount}개</span>
            </div>
          </div>
        ))}
      </div>

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

export default FreePostManagement;
