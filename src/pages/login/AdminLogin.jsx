import React, { useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/admin/login", { loginId, password });
      localStorage.setItem("adminToken", res.data.token);
      alert("로그인 성공");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("로그인 실패", err);
      if (err.response?.status === 401) {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
      } else {
        alert("로그인 중 오류 발생");
      }
    }
  };

  const handleRegister = () => {
    navigate("/admin/signup");
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>관리자 로그인</h2>
        <form onSubmit={handleLogin} className="login-form">
          <label>아이디</label>
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            required
          />

          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="button-group">
            <button type="submit" className="login-btn">로그인</button>
            <button type="button" className="signup-btn" onClick={handleRegister}>
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
