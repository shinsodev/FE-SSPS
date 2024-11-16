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
const buyPaper = (token, amount) => {
  return axios.post(
   "/ssps/students/recharge", // Gửi amount qua query params
    {}, 
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      params: {
        amount: amount,
      }
    }
  );
};
const confirmReceive = (token, printingId) => {
  return axios.post('/ssps/students/confirm-receive', null, {
    params: { printingId: printingId },
    headers: {
        'Authorization': `Bearer ${token}`,
    }
  })
};

export { apiUserRegister, apiLogin, fetchUserInfo, buyPaper, confirmReceive };
