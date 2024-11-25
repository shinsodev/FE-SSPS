import { notifyError } from "../components/Notification/NotifyError";
import { notifySuccess } from "../components/Notification/NotifySuccess";
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

const fetchAllUsers = (token, page) => {
  return axios.get("/ssps/admin/get-all-students", {
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào headers
    },
    params: {
      page,
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

const viewPrintLogs = async (token, startDate, endDate, page = 0, size = 3) => {
  try {
    const response = await axios.get("/ssps/admin/view-print-logs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { startDate, endDate, page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching print logs:", error.response || error);
    throw error;
  }
};

const generateUsageReports = async (token, frequency) => {
  try {
    const response = await axios.get("/ssps/admin/generate-usage-reports", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        frequency: frequency,
      },
    });
    // console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
      console.error("Status Code:", error.response.status);
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};

async function deleteRatingAdmin(idRating) {
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
  viewPrintLogs,
  generateUsageReports,
  deleteRatingAdmin,
};
