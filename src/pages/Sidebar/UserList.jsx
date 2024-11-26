import { NavLink } from "react-router-dom";
// import { h2, ProfileCard } from "../router";
import { TiEyeOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import User1 from "../../assets/img/user1.png";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const UserList = () => {
  const { user } = useContext(AuthContext);
  const { userList } = useContext(AuthContext);

  return (
    <section className="p-8">
      <div>
        <h2 className="font-medium text-3xl">User Lists</h2>
      </div>
      <hr className="my-5" />

      {/* list */}
      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-5">
                S.N
              </th>
              <th scope="col" className="px-6 py-5">
                Username
              </th>
              <th scope="col" className="px-6 py-5">
                Email
              </th>
              <th scope="col" className="px-6 py-5">
                Role
              </th>
              <th scope="col" className="px-6 py-5">
                Photo
              </th>
              <th scope="col" className="px-6 py-3">
                StudentID
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userList && userList.length > 0 ? (
              userList.map((user, index) => (
                <tr
                  key={user.studentId}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 capitalize">{user.fullName}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">STUDENT</td>
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full">
                      <img src={user.photo || User1} alt="" />
                    </div>
                  </td>
                  <td className="px-6 py-4">{user.studentId}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center gap-3">
                      <NavLink to="#" className="font-medium text-indigo-500">
                        <FaEye size={20} />
                      </NavLink>
                      <NavLink
                        to={`/category/update/${user.id}`}
                        className="font-medium text-green-500"
                      >
                        <FaEdit size={20} />
                      </NavLink>
                      <button className="font-medium text-red-500">
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UserList;
// import React, { useState, useEffect } from "react";

// const UserReviews = () => {
//     const [activeTab, setActiveTab] = useState("all"); // "all", "printingRequest", "student"
//     const [ratings, setRatings] = useState([]);
//     const [page, setPage] = useState(0);
//     const [size, setSize] = useState(3);
//     const [totalPages, setTotalPages] = useState(0);

//     // States for filtering
//     const [printingRequestId, setPrintingRequestId] = useState("");
//     const [studentId, setStudentId] = useState("");

//     // Fetch ratings based on active tab
//     useEffect(() => {
//         let url = "/api/ratings";

//         if (activeTab === "printingRequest" && printingRequestId) {
//             url += `?printingRequestId=${printingRequestId}&page=${page}&size=${size}`;
//         } else if (activeTab === "student" && studentId) {
//             url += `?studentId=${studentId}&page=${page}&size=${size}`;
//         } else {
//             url += `?page=${page}&size=${size}`;
//         }

//         fetch(url)
//             .then((response) => response.json())
//             .then((data) => {
//                 setRatings(data.content);
//                 setTotalPages(data.totalPages);
//             })
//             .catch((error) => console.error("Error fetching ratings:", error));
//     }, [activeTab, page, size, printingRequestId, studentId]);

//     // Handle pagination
//     const handleNextPage = () => {
//         if (page < totalPages - 1) setPage(page + 1);
//     };

//     const handlePreviousPage = () => {
//         if (page > 0) setPage(page - 1);
//     };

//     // Render ratings list
//     const renderRatings = () => {
//         return ratings.map((rating) => (
//             <div key={rating.id} className="bg-white p-4 shadow-md rounded-md mb-4">
//                 <p className="text-lg font-bold">⭐ {rating.rating}</p>
//                 <p>
//                     <span className="font-semibold">Sinh viên:</span> {rating.studentId}
//                 </p>
//                 <p>
//                     <span className="font-semibold">Yêu cầu in:</span>{" "}
//                     {rating.printingRequestId}
//                 </p>
//                 <p>
//                     <span className="font-semibold">Bình luận:</span>{" "}
//                     {rating.comment || "Không có bình luận"}
//                 </p>
//             </div>
//         ));
//     };
//     {/* <h2 class="font-medium text-3xl text-center">Printing</h2> */ }
//     {/* <h1 className="text-2xl font-bold text-center mb-8">User reviews</h1> */ }
//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
//             <h1 className="text-2xl font-bold text-center mt-4 mb-4 pb-2 border-b border-gray-300">User reviews</h1>
//             <div className="flex justify-center space-x-4 mt-9 mb-12">


//                 <button
//                     className={`px-4 py-2 rounded ${activeTab === "all"
//                             ? "bg-blue-600 text-white"
//                             : "bg-gray-200 text-gray-800"
//                         }`}
//                     onClick={() => {
//                         setActiveTab("all");
//                         setPage(0);
//                     }}
//                 >
//                     Tất cả Đánh giá
//                 </button>
//                 <button
//                     className={`px-4 py-2 rounded ${activeTab === "printingRequest"
//                             ? "bg-blue-600 text-white"
//                             : "bg-gray-200 text-gray-800"
//                         }`}
//                     onClick={() => {
//                         setActiveTab("printingRequest");
//                         setPage(0);
//                     }}
//                 >
//                     Theo Yêu cầu in
//                 </button>
//                 <button
//                     className={`px-4 py-2 rounded ${activeTab === "student"
//                             ? "bg-blue-600 text-white"
//                             : "bg-gray-200 text-gray-800"
//                         }`}
//                     onClick={() => {
//                         setActiveTab("student");
//                         setPage(0);
//                     }}
//                 >
//                     Theo Sinh viên
//                 </button>
//             </div>

//             {/* Filters */}
//             {activeTab === "printingRequest" && (
//                 <div className="flex space-x-4 mb-6">
//                     <input
//                         type="text"
//                         placeholder="Nhập mã yêu cầu in"
//                         className="p-2 border border-gray-300 rounded flex-grow"
//                         value={printingRequestId}
//                         onChange={(e) => setPrintingRequestId(e.target.value)}
//                     />
//                     <button
//                         className="bg-blue-600 text-white px-4 py-2 rounded"
//                         onClick={() => setPage(0)}
//                     >
//                         Tìm kiếm
//                     </button>
//                 </div>
//             )}
//             {activeTab === "student" && (
//                 <div className="flex space-x-4 mb-6">
//                     <input
//                         type="text"
//                         placeholder="Nhập mã sinh viên"
//                         className="p-2 border border-gray-300 rounded flex-grow"
//                         value={studentId}
//                         onChange={(e) => setStudentId(e.target.value)}
//                     />
//                     <button
//                         className="bg-blue-600 text-white px-4 py-2 rounded"
//                         onClick={() => setPage(0)}
//                     >
//                         Tìm kiếm
//                     </button>
//                 </div>
//             )}

//             {/* Rating List */}
//             <div className="space-y-4">
//                 {ratings.length > 0 ? (
//                     renderRatings()
//                 ) : (
//                     <p className="text-center text-gray-500">Không có đánh giá nào.</p>
//                 )}
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-between items-center mt-6">
//                 <button
//                     className="bg-gray-200 text-gray-800 px-4 py-2 rounded disabled:opacity-50"
//                     onClick={handlePreviousPage}
//                     disabled={page === 0}
//                 >
//                     Trang trước
//                 </button>
//                 <span className="text-gray-600">
//                     Trang {page + 1} / {totalPages}
//                 </span>
//                 <button
//                     className="bg-gray-200 text-gray-800 px-4 py-2 rounded disabled:opacity-50"
//                     onClick={handleNextPage}
//                     disabled={page === totalPages - 1}
//                 >
//                     Trang sau
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default UserReviews;
