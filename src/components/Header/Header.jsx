// import React from 'react'
import { useState, useEffect } from "react"
import Logo from "../../assets/img/logo.png"
import { IoMdNotifications } from "react-icons/io";
import User1 from "../../assets/img/user1.png"
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    // ${
      // header ? 'bg-white py-1 shadow-lg' : 'bg-transparent py-5'
    // } 
    <header className="
      bg-white py-1 shadow-lg
      fixed z-50 w-full transition-all duration-300">

      <div className="container mx-auto flex flex-col items-center 
      lg:flex-row lg:justify-between lg:gap-y-0
      ">
        {/* logo  */}
        <NavLink to="/">
            <img className="w-20" src={Logo} alt="logo" />
        </NavLink>

        {/* nav  */}
        <nav className="text-primary
          flex gap-x-4 font-tertiary tracking-[3px] text-[15px]
          items-center uppercase lg:gap-x-8"
        >
          
          <button>
            <IoMdNotifications size={25}/>
          </button>

          <NavLink to="/dashboard" className="flex">
            <div className="flex items-center justify-center">
              <img src={User1} alt="" className="w-10 object-cover rounded-full"/>
            </div>
            <div className="flex flex-col mx-4">
              <div className="font-medium text-[17px]">Quỳnh Quỳnh</div>
              <div className="text-gray-500 text-[12px]">Student</div>
            </div>
          </NavLink>

          
        </nav>
      </div>
      
    </header>
  )
}

export default Header