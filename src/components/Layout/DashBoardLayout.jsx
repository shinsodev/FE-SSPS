import React, { useContext, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer"; // Import Footer component

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State to track sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle the sidebar visibility
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <section className="bg-gray-200 pb-6 pt-6">
        <div className="flex flex-row relative">
          {/* Sidebar */}
          <div
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } lg:block fixed lg:static z-40 top-0 left-0 w-[65%] lg:w-[20%] bg-white rounded-2xl shadow-2xl px-2 py-4 transition-transform lg:transition-none`}
          >
            <Sidebar />
          </div>

          {/* Content area */}
          <div className="w-full lg:w-[80%] lg:mx-6 bg-white lg:rounded-2xl shadow-2xl">
            {children}
          </div>
        </div>

        {/* Overlay for small screens when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
            onClick={toggleSidebar} // Close sidebar when clicking on overlay
          ></div>
        )}
      </section>
      <Footer /> {/* Add Footer at the end */}
    </>
  );
};

export default DashboardLayout;
