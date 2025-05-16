// AdminSignup.jsx
import React, { useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./AdminSignup.css";

const AdminSignup = () => {
  const [form, setForm] = useState({
    loginId: "",
    password: "",
    name: "",
    birth: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/admin/register", form)
      .then(() => {
        alert("회원가입 성공!");
        navigate("/admin/login");
      })
      .catch((err) => {
        console.error("회원가입 실패", err);
        if (err.response?.status === 400) {
          alert("입력값을 다시 확인해주세요.");
        } else {
          alert("회원가입 중 오류 발생");
        }
      });
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <h2>관리자 회원가입</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <label>이메일</label>
          <input
            type="email"
            name="loginId"
            placeholder="이메일"
            value={form.loginId}
            onChange={handleChange}
            required
          />

          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
          />

          <label>이름</label>
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>생년월일</label>
          <input
            type="date"
            name="birth"
            value={form.birth}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
