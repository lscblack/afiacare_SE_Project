import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { changeLangSate } from "../features/SharedDataSlice/SharedData";
import { useSelector, useDispatch } from "react-redux";

function Registration({ toggleForm }) {
  const lang = useSelector(state => state.afiaCare.langs);
   const [selectedLang, setSelectedLang] = useState(""); // State to track selected language
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="p-6 rounded w-full max-w-lg">
    <div className="mb-4 flex items-center gap-2">
      <div>
        <label htmlFor="registerName" className="block text-white font-semibold mb-2">
          {lang.first_name}
        </label>
        <input
          type="text"
          id="registerName" className="w-full p-2 border rounded bg-transparent text-slate-100 outline-none"
          required
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block  text-white font-semibold mb-2">
          {lang.last_name}
        </label>
        <input
          type="text"
          id="lastName" className="w-full p-2 border rounded bg-transparent text-slate-100 outline-none"
          required
        />
      </div>
    </div>
    <div className="mb-4">
      <label htmlFor="registerEmail" className="block text-white font-semibold mb-2">
        {lang.email}
      </label>
      <input
        type="email"
        id="registerEmail" className="w-full p-2 border rounded bg-transparent text-slate-100 outline-none"
        required
      />
    </div>
    <div className="mb-4 relative">
      <label htmlFor="registerPassword" className="block text-white font-semibold mb-2">
        {lang.password}
      </label>
      <input className="w-full p-2 border rounded bg-transparent text-slate-100 outline-none"
        type={showPassword ? "text" : "password"}
        id="registerPassword"
        required
      />
      <button
        type="button"
        onClick={togglePasswordVisibility} className="absolute right-4 top-11 text-[#39827a]"
      >
        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
      </button>
    </div>
    <div className="mb-4 relative">
      <label htmlFor="confirmPassword" className="block text-white font-semibold mb-2">
        {lang.confirm_password}
      </label>
      <input className="w-full p-2 border rounded bg-transparent text-slate-100 outline-none"
        type={showPassword ? "text" : "password"}
        id="confirmPassword"
        required
      />
      <button
        type="button"
        onClick={togglePasswordVisibility} className="absolute right-4 top-11 text-[#39827a]"
      >
        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
      </button>
    </div>
    <div className="mb-4 flex items-center">
      <input type="checkbox" id="terms" required className="mr-2 bg-white border" />
      <label htmlFor="terms" className="text-white">
        {lang.agree_to}{" "}
        <a href="#" className="text-[#59f1e0]">
          {lang.terms_and_conditions}
        </a>{" "}
        {lang.and}{" "}
        <a href="#" className="text-[#59f1e0]">
          {lang.privacy_policy}
        </a>
        .
      </label>
    </div>
    <button type="submit" className="w-full bg-[#36857b] text-white py-2 rounded hover:bg-[#368a80] mb-4">
      {lang.register}
    </button>
    <button
      type="button" className="w-full flex items-center justify-center bg-white text-gray-500 font-medium py-2 rounded hover:bg-gray-100"
    >
      <FcGoogle className="mr-2" /> {lang.get_started_with_google}
    </button>
  </form>
  );
}

export default Registration;
