import React from "react";
import { IoLogInOutline } from "react-icons/io5";

function ForgotPassword({ toggleForm }) {
  return (
    <form className="p-6 rounded w-full max-w-lg">
      <div className="mb-4">
        <label
          htmlFor="forgotPasswordEmail" className="block text-gray-500 font-semibold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="forgotPasswordEmail" className="w-full p-2 border rounded bg-transparent text-gray-500 outline-none"
          placeholder="you@example.com"
          required
        />
      </div>
      <button
        type="submit" className="w-full bg-[#39827a] text-white py-2 rounded hover:bg-[#336e67] mb-4"
      >
        Reset Password
      </button>
      <button
        type="button"
        onClick={toggleForm} className="text-[#39827a] border border-[#39827a] border-solid py-2 rounded hover:bg-[#39827a] hover:text-white mt-4 m-auto flex p-4 duration-300"
      >
        Back to Login <IoLogInOutline size={25} />
      </button>
    </form>
  );
}

export default ForgotPassword;
