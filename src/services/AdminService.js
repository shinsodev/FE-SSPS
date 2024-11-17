import axios from "./customize-axios";

const apiAdminRegister = (email, password, fullName) => {
  return axios.post("/ssps/admin/register", { email, password, fullName });
};

const fetchAdminInfo = (token) => {
  return axios.get("/ssps/admin/my-info", {
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    },
  });
};

const fetchAllUsers = (token) => {
  return axios.get("/ssps/admin/get-all-students", {
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    },
  });
};

async function addPrinter(token, dataInput) {
  try {
    const result = await axios.post("/ssps/admin/add-printer", dataInput, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (result.status === 200) {
      return { success: true };
    } else {
      throw result.data.error;
    }
  } catch (err) {
    console.error(err.message);
    return { success: false, error: err.message };
  }
}

export { apiAdminRegister, fetchAdminInfo, fetchAllUsers, addPrinter };
