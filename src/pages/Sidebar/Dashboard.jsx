import React from "react";
// import { h1 } from "../../router";
import { CiMedal } from "react-icons/ci";
import { GiBarbedStar } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";
import { MdDashboard, MdOutlineCategory } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { HiOutlineUsers } from "react-icons/hi2";
import printer1 from "../../assets/img/printer1.webp"

export const Dashboard = () => {
  const role = "admin";
  return (
    <>
      <section className="py-10">
        <div className="grid grid-cols-4 gap-8 mx-10">
          <div className="bg-blue-500 rounded-2xl shadow-2xl px-4 py-8 font-medium text-white text-[17px] text-center">Số tiền còn lại</div>
          <div className="bg-blue-500 rounded-2xl shadow-2xl px-4 py-8 font-medium text-white text-[17px] text-center">Số tiền còn lại</div>
          <div className="bg-blue-500 rounded-2xl shadow-2xl px-4 py-8 font-medium text-white text-[17px] text-center">Số tiền còn lại</div>
          <div className="bg-blue-500 rounded-2xl shadow-2xl px-4 py-8 font-medium text-white text-[17px] text-center">Số tiền còn lại</div>
        </div>

      </section>
    </>
  );
};
