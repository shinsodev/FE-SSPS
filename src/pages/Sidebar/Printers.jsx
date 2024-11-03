import React, { useState } from "react";
// import { h1 } from "../../router";
import { CiMedal } from "react-icons/ci";
import { GiBarbedStar } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";
import { MdDashboard, MdOutlineCategory } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { HiOutlineUsers } from "react-icons/hi2";
import printer1 from "../../assets/img/printer1.webp";
import SelectFile from "../Printer/SelectFile";

const Printers = () => {
  const [selectPrinter, setSelectPrinter] = useState(null);

  function handleSelectPrinter(e) {
    setSelectPrinter({ id: 1 });
  }

  const role = "admin";
  return (
    <>
      {selectPrinter === null && (
        <section className="py-10 rounded-2xl bg-gray-100 h-full">
          <h3 className="h3 text-[40px] text-primary text-center pb-12 pt-2">
            Printer list
          </h3>

          <div className="container mx-auto lg:px-0">
            <div className="grid lg:grid-cols-3 gap-5 px-8">
              <div className="bg-white min-h-[420px] min-w-[330px] rounded-2xl shadow-lg border border-gray-300">
                <div className="overflow-hidden flex items-center justify-center py-6">
                  <img
                    src={printer1}
                    alt=""
                    className="w-[80%] h-48 object-cover rounded-2xl shadow-lg transition-all duration-300"
                  />
                </div>

                <div className="flex justify-end mx-6 mb-3">
                  <div className="px-4 py-2 rounded-3xl bg-green-300">
                    status
                  </div>
                </div>

                <div>
                  <h3 className="h3 text-center">Printer 1</h3>

                  <div className="text-gray-500 flex flex-col mx-10">
                    <ul>
                      <li>Color: Mono/Color</li>
                      <li>Location: Di An</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-center my-6">
                    <button className="py-3 px-8 mr-3 rounded-lg bg-blue-500 text-[17px] font-medium text-white hover:opacity-60">
                      Detail
                    </button>
                    <button
                      className="py-3 px-8 ml-3 rounded-lg bg-green-500 text-[17px] font-medium text-white hover:opacity-60"
                      onClick={handleSelectPrinter}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>

              {/* test  */}
            </div>
          </div>
        </section>
      )}
      {selectPrinter !== null && (
        <>
          <SelectFile />
        </>
      )}
    </>
  );
};

export default Printers;
