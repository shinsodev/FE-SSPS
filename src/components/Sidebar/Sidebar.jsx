import React, { useContext, useState } from "react";
import User1 from "../../assets/img/user1.png";
import { CiGrid41 } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineCategory, MdReport, MdBarChart } from "react-icons/md";
import { TbFileUpload, TbCurrencyDollar } from "react-icons/tb";
import { AiOutlineFileProtect } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { CgProductHunt } from "react-icons/cg";
import { FaSignalMessenger } from "react-icons/fa6";
import ModalConfirm from "../ModalConfirm/ModalConfirm";
import { AuthContext } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import logoutImage from "../../assets/img/logout.jpg";

// Sidebar component
const Sidebar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { user, logout, getRoleFromToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = getRoleFromToken(token);

  // Hàm xử lý logout
  const handleLogout = () => {
    logout(); // Gọi hàm logout từ context
    navigate("/"); // Điều hướng về trang home sau khi logout
  };

  // Dynamic class for active NavLink
  const getNavLinkClass = (isActive) =>
    `flex items-center gap-3 mb-2 p-4 rounded-lg hover:text-white hover:bg-blue-500 hover:scale-105 text-[17px] font-medium transition-all duration-300 ease-in-out ${
      isActive ? "text-white bg-blue-500" : ""
    }`;

  return (
    <section className="flex flex-col h-full">
      <div className="profile flex items-center text-center justify-center gap-8 flex-col mb-8">
        <img
          src={User1}
          alt="User"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <h1 className="capitalize">{user?.fullName}</h1>
          <div>{user?.email}</div>
        </div>
      </div>

      <div>
        <NavLink to="/" className={({ isActive }) => getNavLinkClass(isActive)}>
          <CiGrid41 size={22} />
          <span>Dashboard</span>
        </NavLink>

        {role === "ROLE_STUDENT" && (
          <>
            <NavLink
              to="/printers"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              <MdOutlineCategory size={22} />
              <span>Printers</span>
            </NavLink>
            {/* <NavLink
              to="/uploadFile"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              <TbFileUpload size={22} />
              <span>Upload File</span>
            </NavLink> */}
            <NavLink
              to="/payment"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              <TbCurrencyDollar size={22} />
              <span>Payment</span>
            </NavLink>
            <NavLink
              to="/confirm"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              <AiOutlineFileProtect size={22} />
              <span>Confirmation</span>
            </NavLink>
            <NavLink
              to="/studentreport"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              <MdReport size={22} />
              <span>Printing History</span>
            </NavLink>
          </>
        )}

        {role === "ROLE_ADMIN" && (
          <>
            <NavLink
              to="/admin/userlist"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              <FiUser size={22} />
              <span>All Users</span>
            </NavLink>
            <NavLink
              to="/admin/printrequests"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              <FaSignalMessenger size={22} />
              <span>Print Request</span>
            </NavLink>
            <NavLink
              to="/admin/Rating"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              <FaRegStar size={22} />
              <span>Rating</span>
            </NavLink>
            <NavLink
              to="/admin/printerlist"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              <CgProductHunt size={22} />
              <span>All Printer List</span>
            </NavLink>
            <NavLink
              to="/admin/report"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              <MdReport size={22} />
              <span>Printing Log</span>
            </NavLink>
            <NavLink
              to="/admin/generate"
              className={({ isActive }) => getNavLinkClass(isActive)}
            >
              <MdBarChart size={22} />
              <span>Generate reports</span>
            </NavLink>
          </>
        )}

        <NavLink
          to="/profile"
          className={({ isActive }) => getNavLinkClass(isActive)}
        >
          <IoSettingsOutline size={22} />
          <span>Personal Profile</span>
        </NavLink>

        {/* Nút Logout */}
        <div className="flex items-center justify-center m-5 hover:opacity-60 text-center">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-3 text-white bg-red-500 py-4 px-12 rounded-full"
          >
            <IoIosLogOut size={22} />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Modal xác nhận logout */}
      <ModalConfirm
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        onConfirm={handleLogout}
        image={logoutImage}
      />
    </section>
  );
};

export default Sidebar;
