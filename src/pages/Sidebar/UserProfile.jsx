import React from "react";
import User1 from "../../assets/img/user1.png";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const commonClassNameOfInput =
  "w-full p-4 text-sm text-gray-900 border border-gray-200";

const UserProfile = () => {
  const { user, getRoleFromToken } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const role = getRoleFromToken(token);
  const roleDisplay = role === "ROLE_ADMIN" ? "ADMIN" : "STUDENT";

  return (
    <>
      <section className="py-8 px-20">
        <div className="flex items-center gap-8">
          <img
            src={User1}
            alt=""
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <div className="text-[30px] font-medium">{user?.fullName}</div>
            <div className="text-gray-500">{user?.email}</div>
          </div>
        </div>

        {/* Form */}
        <form>
          <div className="flex items-center gap-5 mt-10">
            <div className="w-1/2">
              <div className="mb-2">Full Name </div>
              <input
                type="text"
                className={`capitalize ${commonClassNameOfInput}`}
                value={user?.fullName}
                disabled
              />
            </div>
            <div className="w-1/2">
              <div className="mb-2">Role</div>
              <input
                type="text"
                className={commonClassNameOfInput}
                value={roleDisplay}
                disabled
              />
            </div>
          </div>
          <div className="flex items-center gap-5 mt-10">
            {role === "ROLE_ADMIN" ? (
              <div className="w-1/2">
                <div className="mb-2">Admin ID</div>
                <input
                  type="tel"
                  className={commonClassNameOfInput}
                  value={user?.id}
                  disabled
                />
              </div>
            ) : (
              <div className="w-1/2">
                <div className="mb-2">Student ID</div>
                <input
                  type="tel"
                  className={commonClassNameOfInput}
                  value={user?.studentId}
                  disabled
                />
              </div>
            )}
            <div className="w-1/2">
              <div className="mb-2">Email</div>
              <input
                type="email"
                className={commonClassNameOfInput}
                value={user?.email}
                disabled
              />
            </div>
          </div>

          <div className="my-8">
            <div className="mb-2">Profile Picture</div>
            <input type="file" className={commonClassNameOfInput} />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="text-[17px] text-white font-medium px-6 py-4 rounded-lg bg-blue-500 hover:scale-110 transition-all"
            >
              Update Profile
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default UserProfile;
