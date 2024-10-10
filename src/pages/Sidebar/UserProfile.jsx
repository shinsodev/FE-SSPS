import React from "react";
import User1 from "../../assets/img/user1.png";

const commonClassNameOfInput = "w-full p-4 text-sm text-gray-900 border border-gray-200";

const UserProfile = () => {
  return (
    <>
      <section className="py-8 px-20">
        <div className="flex items-center gap-8">
          <img src={User1} alt="" className="w-24 h-24 rounded-full object-cover" />
          <div>
            <div className="text-[30px] font-medium">Sunil Bk</div>
            <div className="text-gray-500">example@gmail.com</div>
          </div>
        </div>

        {/* Form */}
        <form>
          <div className="flex items-center gap-5 mt-10">
            <div className="w-full">
              <div className="mb-2">Full Name </div>
              <input type="text" className={`capitalize ${commonClassNameOfInput}`} placeholder="Sunil" disabled />
            </div>
          </div>
          <div className="flex items-center gap-5 mt-10">
            <div className="w-1/2">
              <div className="mb-2">Contact Number</div>
              <input type="tel" className={commonClassNameOfInput} placeholder="Contact Number" />
            </div>
            <div className="w-1/2">
              <div className="mb-2">Email</div>
              <input type="email" className={commonClassNameOfInput} placeholder="example@gmail.com" disabled />
            </div>
          </div>
          <div className="my-8">
            <div className="mb-2">Role</div>
            <input type="text" className={commonClassNameOfInput} placeholder="student" disabled />
          </div>
          <div className="my-8">
            <div className="mb-2">Student ID</div>
            <input type="text" className={commonClassNameOfInput} placeholder="2212123" disabled />
          </div>
          <div className="my-8">
            <div className="mb-2">Profile Picture</div>
            <input type="file" className={commonClassNameOfInput} />
          </div>
          
          <div className="flex justify-center">
            <button type="submit" 
              className="text-[17px] text-white font-medium px-6 py-4 rounded-lg bg-blue-500 hover:scale-110 transition-all">
              Update Profile
            </button>
          </div>

        </form>
      </section>
    </>
  );
};

export default UserProfile;
