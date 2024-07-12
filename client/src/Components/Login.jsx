import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

function Login({ toggleForm, showForgotPassword }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="p-6 rounded w-full max-w-lg">
      <div className="mb-4">
        <label htmlFor="loginEmail" className="block text-white font-semibold mb-2">
          Email
        </label>
        <input
          type="email"
          id="loginEmail" className="w-full p-2 border rounded bg-transparent text-white outline-none"
         
          required
        />
      </div>
      <div className="mb-4 relative">
        <label htmlFor="loginPassword" className="block text-slate-100 text-light font-semibold mb-2">
          Password
        </label>
        <input className="w-full p-2 border rounded bg-transparent text-slate-100 outline-none"
          type={showPassword ? "text" : "password"}
          id="loginPassword"
         
          required
        />
        <button
          type="button"
          onClick={togglePasswordVisibility} className="absolute right-4 top-11 text-[#fff] text-xl"
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </button>
      </div>
      <div className="mb-4 text-right">
        <button
          type="button"
          onClick={showForgotPassword} className="text-[#fff] font-normal"
        >
          Forgot Password?
        </button>
      </div>
      <button type="submit" className="w-full bg-[#36857b] text-white py-2 rounded hover:bg-[#368a80] mb-4">
        Login
      </button>
      <button
        type="button" className="w-full flex items-center justify-center bg-white text-gray-700  py-2 rounded hover:bg-gray-100"
      >
        <FcGoogle className="mr-2" /> Login with Google
      </button>
    </form>
  );
}

export default Login;
