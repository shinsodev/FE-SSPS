import { createContext, useState, useEffect } from "react";
import { fetchUserInfo } from "../services/UserService";
import {
  deleteDocumentsExpired,
  fetchAdminInfo,
  fetchAllUsers,
} from "../services/AdminService";
import { jwtDecode } from "jwt-decode";

// Tạo context để quản lý thông tin người dùng
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang từ API
  // const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const role = getRoleFromToken(token);

      if (role === "ROLE_STUDENT") {
        fetchStudentData(token);
      } else if (role === "ROLE_ADMIN") {
        fetchAdminData(token, page);
        deleteDocumentsExpired();
      }
    } else {
      setLoading(false);
    }

    // return () => {
    //   if (intervalId) clearInterval(intervalId);
    // };
  }, [page]);

  const getRoleFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token); // Gọi hàm jwt_decode
      // console.log(decodedToken.scope);
      return decodedToken.scope; // Lấy vai trò từ scope
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const fetchStudentData = async (token) => {
    try {
      const response = await fetchUserInfo(token);
      if (response && response.status === 200) {
        const userData = response.data.result;
        setUser(userData);
      } else {
        console.error("Failed to fetch student data");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminData = async (token, page) => {
    try {
      const response = await fetchAdminInfo(token);
      // console.log(response);
      if (response && response.status === 200) {
        const userData = response.data.result;
        setUser(userData);

        await fetchAllUsersData(token, page);
        // const id = setInterval(() => fetchAllUsersData(token), 3000);
        // setIntervalId(id);
      } else {
        console.error("Failed to fetch admin data");
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsersData = async (token, page) => {
    try {
      const response = await fetchAllUsers(token, page);
      if (response.status === 200) {
        const data = response.data;
        setUserList(data.result);

        setTotalPages(data.totalPages);
      } else {
        console.error("Failed to fetch userList");
      }
    } catch (error) {
      console.error("Error fetching userList:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
    setUserList(null);
    // if (intervalId) clearInterval(intervalId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userList,
        setUser,
        logout,
        loading,
        fetchStudentData,
        fetchAdminData,
        page,
        setPage,
        totalPages,
        getRoleFromToken, // Cung cấp hàm này cho các component khác nếu cần
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
