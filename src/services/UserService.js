import axios from "./customize-axios";

const apiUserRegister = (email, password, fullName, studentId) => {
  return axios.post("/ssps/students/register", {
    email,
    password,
    fullName,
    studentId,
  });
};

const apiLogin = (email, password) => {
  return axios.post("/ssps/auth/login", {
    email,
    password,
  });
};

// Tùy chỉnh lại hàm fetchUserInfo
const fetchUserInfo = (token) => {
  return axios.get("/ssps/students/my-info", {
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    },
  });
};

export { apiUserRegister, apiLogin, fetchUserInfo };
