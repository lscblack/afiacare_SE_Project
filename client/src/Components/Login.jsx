import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { changeLangSate } from "../features/SharedDataSlice/SharedData";
import { useSelector, useDispatch } from "react-redux";
import MyApi from "../AxiosInstance/MyApi";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ toggleForm, showForgotPassword }) {
   // Assuming you're using English as default language
  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState(""); // State to track selected language
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({"username":"string","password":"string"})

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //login a user
  const LoginUser = async() =>{
    try{
      const response = await MyApi.post("auth/login",data) // for sending request on backend
      const token = response.data.access_token
      console.log(token)
      const instance = axios.create({
        baseURL: import.meta.env.VITE_MAIN,
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
        },
        withCredentials: false, // this will be changed in production
    });
    instance.get("apis/me")
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
    }
    catch(err){
      if(err.response.status == 401){
        toast.dismiss();
        toast.error(err.response.data.detail);
      }else{

      }
    }

    
  }

  return (
    <div className="p-6 rounded w-full max-w-lg">
    <div className="mb-4">
      <label htmlFor="loginEmail" className="block text-white font-semibold mb-2">
        {lang.login_email}
      </label>
      <input
        type="email"
        id="loginEmail" className="w-full p-2 border rounded bg-transparent text-white outline-none"
        required
      />
    </div>
    <div className="mb-4 relative">
      <label htmlFor="loginPassword" className="block text-slate-100 text-light font-semibold mb-2">
        {lang.login_password}
      </label>
      <input className="w-full p-2 border rounded bg-transparent text-slate-100 outline-none"
        type={showPassword ? 'text' : 'password'}
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
        {lang.login_forgot_password}
      </button>
    </div>
    <button onClick={()=>LoginUser()} type="submit" className="w-full bg-[#36857b] text-white py-2 rounded hover:bg-[#368a80] mb-4">
      {lang.login_button}
    </button>
    <button
      type="button" className="w-full flex items-center justify-center bg-white text-gray-700 py-2 rounded hover:bg-gray-100"
    >
      <FcGoogle className="mr-2" /> {lang.login_google_button}
    </button>
  </div>
  );
}

export default Login;
