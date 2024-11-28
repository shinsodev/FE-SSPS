import { NavLink } from "react-router-dom";
// import { h2, ProfileCard } from "../router";
import { TiEyeOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import User1 from "../../assets/img/user1.png";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const UserList = () => {
  const { user } = useContext(AuthContext);
  const { userList, page, setPage, totalPages } = useContext(AuthContext);
  // const [page, setPage] = useState(0); // Số trang hiện tại
  // const [totalPages, setTotalPages] = useState(0); // Tổng số trang từ API

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

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

      <ReactPaginate
        breakLabel="..."
        nextLabel="NEXT →"
        onPageChange={handlePageClick}
        forcePage={page}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="← PREVIOUS"
        className="flex space-x-2 items-center justify-center my-8"
        pageClassName="page-item"
        pageLinkClassName="page-link px-4 py-2 hover:bg-gray-900/10 rounded-md shadow-2xl"
        activeLinkClassName="active bg-black text-white" // Active page style
        previousClassName="page-item"
        previousLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
        nextClassName="page-item"
        nextLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        disabledLinkClassName="text-gray-400 cursor-not-allowed"
        containerClassName="pagination"
      />
    </section>
  );
};

export default UserList;
