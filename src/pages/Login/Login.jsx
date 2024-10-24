/* eslint-disable react/no-unescaped-entities */
// import React from 'react';
import LoginImg from "../../assets/img/login.jpg";
import GoogleImg from "../../assets/img/google.svg";

const Login = () => {
  return (
    <section className="bg-blue-200 flex items-center justify-center pt-28 pb-24">
      {/* Login container */}
      <div className="bg-white flex rounded-2xl shadow-2xl max-w-[900px] max-h-[500px] lg:h-[400px] items-center">
        {/* Form */}
        <div className="md:w-1/2 px-10">

            <h2 className="font-bold text-4xl text-primary h2 text-center mb-10">Login</h2>

          {/* <p className="text-xs mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p> */}

          <form action="" className="flex flex-col gap-4">
            <input
              className="p-2 rounded-xl border bg-gray-200"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full bg-gray-200"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button className="bg-blue-500 rounded-xl text-white py-2 hover:scale-105 duration-300">
              Login
            </button>
          </form>

          {/* <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
            <img src={GoogleImg} alt="" className="h-6 pr-2" />
            Login with Google
          </button> */}

          <div className="text-xs py-4 text-[#002D74] hover:underline">
            <a href="#">Forgot your password?</a>
          </div>

          {/* <div className="mt-3 text-xs flex justify-between items-center text-[#002D74] mb-10">
            <p>Don't have an account?</p>
            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
              Register
            </button>
          </div> */}
        </div>

        {/* Image */}
        <div className="md:block hidden w-1/2 overflow-hidden pr-10 h-full lg:flex items-center justify-center">
          <img
            className="rounded-2xl object-cover w-full h-[70%]"
            src={LoginImg}
            alt="Login Background"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
