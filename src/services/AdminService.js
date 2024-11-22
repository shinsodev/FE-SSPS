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

async function deletePrinter(token, printerId) {
  try {
    const result = await axios.delete(
      `/ssps/admin/delete-printer/${printerId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (result.status === 200) {
      return { success: true };
    } else {
      throw "Error from delete";
    }
  } catch (err) {
    console.error(err.message);
    return { success: false, error: err.message };
  }
}

async function deleteRating(idRating) {
  const token = localStorage.getItem("token");
  try {
    const result = await axios.delete(`/ssps/admin/delete-rating/${idRating}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result.status === 200) {
      notifySuccess("Delete rating success");
    }
  } catch (err) {
    notifyError("Delete failed!!!");
  }
}

export {
  apiAdminRegister,
  fetchAdminInfo,
  fetchAllUsers,
  fetchPrintRequests,
  fetchApprovePrint,
  addPrinter,
  deletePrinter,
  deleteRating,
};
