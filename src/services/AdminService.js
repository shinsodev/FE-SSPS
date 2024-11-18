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

export async function deleteDocumentsExpired() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const result = await axios.delete("/ssps/admin/document-expired", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(result.data.result);

    return result; // Trả về kết quả của API
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, error: error.message || error };
  }
}

const fetchPrintRequests = (token, printerId, page = 0, size = 3) => {
  return axios.get(`/ssps/admin/get-print-requests/${printerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { page, size },
  });
};

const fetchApprovePrint = (token, printId) => {
  return axios.post(`/ssps/admin/print/${printId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  apiAdminRegister,
  fetchAdminInfo,
  fetchAllUsers,
  fetchPrintRequests,
  fetchApprovePrint,
};
