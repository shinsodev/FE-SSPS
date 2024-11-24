import { toast } from "react-toastify";
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


// @GetMapping("/ratings/my-ratings")
// public ApiResponse<List<RatingResponse>> getRatingOfCurrentStudent() {
//     List<RatingResponse> ratings = ratingService.getRatingOfCurrentStudent();
//     return ApiResponse.<List<RatingResponse>>builder()
//             .result(ratings)
//             .build();
// }
//get my rating
const getMyRating = (token) => {
  return axios.get(`/ssps/students/ratings/my-ratings`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  ); 
}

export { apiUserRegister, apiLogin, fetchUserInfo, buyPaper, getMyRating  };
