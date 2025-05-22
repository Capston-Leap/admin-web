import axios from "../api/axiosInstance";

export const handleLogout = async () => {
  try {
    await axios.post("/admin/logout");
  } catch (err) {
    console.warn("로그아웃 실패 (무시 가능):", err);
  }

  localStorage.removeItem("adminToken");
  window.location.href = "http://ceprj.gachon.ac.kr:60013/leap/admin/login";
};
