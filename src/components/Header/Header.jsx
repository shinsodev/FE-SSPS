import React, { useContext } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";
import User1 from "../../assets/img/user1.png"; // Hình ảnh người dùng (có thể thay đổi)
import { NavLink } from "react-router-dom"; // Import NavLink từ react-router-dom
import logo from "../../assets/img/logo.png"
// import { AuthContext } from '../../context/AuthContext'; // Đảm bảo import đúng đường dẫn

const Header = ({ toggleSidebar }) => {
  const user = null;

  return (
    <>
      <div className="shadow-2xl bg-white flex items-center justify-between py-4 px-6">
        <div className='flex items-center justify-center'>
          {/* Hamburger menu */}
          <button onClick={toggleSidebar} className="lg:hidden">
            <GiHamburgerMenu size={22} />
          </button>

          <NavLink to="/">
            <img src={logo} alt="" className='w-20'/>
          </NavLink>
        </div>

        {/* Right side (notifications, profile) */}
        <nav className="text-primary flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8">
          <button>
            <IoMdNotifications size={25} />
          </button>
          <div className="flex">
            <div className="flex items-center justify-center">
              <img src={User1} alt="User Profile" className="w-10 object-cover rounded-full" />
            </div>
            <div className="flex flex-col mx-4">
              <div className="font-medium text-[17px]">{user ? user.name : 'Quỳnh Quỳnh'}</div>
              <div className="text-gray-500 text-[12px]">{user ? user.role : 'Admin'}</div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};


export default Header;
