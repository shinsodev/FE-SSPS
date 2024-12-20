import { toast } from "react-toastify";
import axios from "./customize-axios";
import { notifyError } from "../components/Notification/NotifyError";
import { notifySuccess } from "../components/Notification/NotifySuccess";

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
      },
    }
  );
};

// export async function uploadFile(file, uploadConfig) {
//   try {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       throw new Error("No authentication token found");
//     }

//     // Chuẩn bị dữ liệu upload
//     const formData = new FormData();
//     formData.append("file", file);

//     const result = await axios.post("/ssps/students/upload", formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return result;
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     return { success: false, error: error.message || error };
//   }
// }

export async function uploadFile(file, uploadConfig) {
  try {
    const token = localStorage.getItem("token");
    //console.log("Token:", token);

    if (!token) {
      throw new Error("No authentication token found");
    }

    // Chuẩn bị dữ liệu upload
    const formData = new FormData();
    formData.append("file", file); // Upload file
    formData.append("uploadConfig", JSON.stringify(uploadConfig)); // Upload cấu hình in dưới dạng JSON
    console.log("File:", file);
    console.log("Upload Config:", uploadConfig);

    const result = await axios.post("/ssps/students/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        //"Content-Type": "multipart/form-data",
      },
    });

    return result; // Trả về kết quả của API
  } catch (error) {
    console.error("Error uploading file:", error);
    if (error.message === "Request failed with status code 413") {
      toast.error("File quá lớn");
    }

    return { success: false, error: error.message || error };
  }
}

const confirmReceive = (token, printingId) => {
  return axios.post("/ssps/students/confirm-receive", null, {
    params: { printingId: printingId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getPrintLogs = (token) => {
  return axios.get("/ssps/students/print-logs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getPrintRequests = (token) => {
  return axios.get("/ssps/students/get-print-requests", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

async function deleteRatingStudents(idRating) {
  const token = localStorage.getItem("token");
  try {
    const result = await axios.delete(`/ssps/students/delete-rating/${idRating}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (result.status === 200) {
      notifySuccess("Delete rating success");
    }
  } catch (err) {
    notifyError("Delete failed!!!");
  }
}
const getStudentRatingsByPrintingLogId = (token, printingLogId, page, size) => {
  return axios.get(`/ssps/students/get-rating-by-printingLog-id/${printingLogId}?page=${page}&size=${size}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Gửi token xác thực
    }
  });
};

export { apiUserRegister, apiLogin, fetchUserInfo, buyPaper, confirmReceive, getPrintLogs, getPrintRequests, deleteRatingStudents,
  getStudentRatingsByPrintingLogId
 };
