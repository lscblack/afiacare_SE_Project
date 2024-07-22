import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { addUserLogin, changeLangSate } from "../features/SharedDataSlice/SharedData";
import { useSelector, useDispatch } from "react-redux";
import MyApi from "../AxiosInstance/MyApi";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainLoad from "../loads/MainLoad";
import { jwtDecode } from 'jwt-decode';
import { useEffect } from "react";
import LoginWithGoogle from "./LoginWithGoogle";

function Login({ toggleForm, showForgotPassword }) {
  const dispatch = useDispatch()
  const nav = useNavigate()
  // Assuming you're using English as default language
  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState(""); // State to track selected language
  const [showPassword, setShowPassword] = useState(false);
  const [Register, SetRegister] = useState({ "username": "", "password": "" })
  const [ShowGoogle, setGoogle] = useState(false)
  const [avatar,setAvatar] = useState("")
  const [data, setData] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
  });
  const [showLoad, setShowLoad] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //handle function chaning
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    SetRegister((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  //login a user
  const LoginUser = async () => {
    if (Register.username == "") {
      toast.dismiss();
      toast.warning('UseName Or Email Is Required');
      setShowLoad(false)
    } else if (Register.password == "") {
      toast.dismiss();
      toast.warning('Password Is Required');
    } else {
      setShowLoad(true)
      try {
        const response = await MyApi.post("auth/login", Register) // for sending request on backend
        const UserData = response.data
        if (UserData) {
          if (dispatch(addUserLogin(UserData))) {
            window.location.href = "/dashboard"
          } else {
            toast.dismiss();
            toast.error("Unable To Establish Session For You Retry");
          }
        } else {
          toast.dismiss();
          toast.error("Error While Logging Try again Later");
        }
        setShowLoad(false)
      }
      catch (err) {
        if (err.response.status == 401) {
          toast.dismiss();
          toast.error(err.response.data.detail);
        } else {
          toast.dismiss();
          toast.error("Error While Logging Try again Later");
        }
        setShowLoad(false)
        console.log(err)
      }
    }


  }
  const handelResponse = (response) => {
    const userObj = jwtDecode(response.credential)
    // console.log(userObj)
    if (userObj.email) {
      // Spread operator to create a new object, preserving existing state
      setData({
        ...data,
        email: userObj.email,
        fname: userObj.given_name,
        lname: userObj.family_name,
        username: userObj.email.replace(/^(.+)@.*/, '$1'),
      });
      setAvatar(userObj.picture)

      setGoogle(true)
    } else {
      setGoogle(false)
    }
  }
  //Google auth
  useEffect(() => {
    //Gloabl
    google.accounts.id.initialize({
      client_id: `${import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}`,
      callback: handelResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "text", size: "bigger" }
    )
  }, [])

  return (
    <>
      {showLoad && <>
        <div className="fixed w-screen h-screen bg-white z-50 top-0 left-0">
          <MainLoad title="Validating Your Data" />
        </div>
      </>}
      {ShowGoogle &&
        <>
          <LoginWithGoogle data={data} avatar={avatar} setData={setData} />
        </>
      }
      {!ShowGoogle &&
        <div className="p-6 rounded w-full max-w-lg mt-3 bg-gray-100">
          <div className="mb-4">
            <label htmlFor="username" className="block text-slate-700 font-semibold mb-2">
              {lang.login_email}
            </label>
            <input
              onChange={(e) => handleInputChange(e)}
              type="text"
              placeholder="Enter Your Username Here"
              id="username" className="w-full p-3 border rounded bg-slate-200 text-slate-700 outline-none"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-slate-700 text-light font-semibold mb-2">
              {lang.login_password}
            </label>
            <input
              onChange={(e) => handleInputChange(e)}
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full p-3 border rounded bg-slate-200 text-slate-700 outline-none"
              placeholder="Enter Your Password Here"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility} className="absolute right-4 top-11 text-[#36857b] text-xl"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
          <div className="mb-4 text-right">
            <button
              type="button"
              onClick={showForgotPassword} className="text-slate-200 font-normal"
            >
              {lang.login_forgot_password}
            </button>
          </div>
          <button onClick={() => LoginUser()} type="submit" className="w-full bg-[#36857b] text-slate-200 py-3 rounded hover:bg-[#276b63] mb-4">
            {lang.login_button}
          </button>
          {/* <button
          type="button" className="w-full flex items-center justify-center  font-medium  bg-gray-200 text-gray-700 py-3 rounded hover:bg-gray-300"
        >
          <FcGoogle className="mr-2" /> {lang.login_google_button}
        </button> */}
          <div className="w-full bg-none flex justify-center items-center text-center">
            <button id="signInDiv" ></button>
          </div>
        </div>
      }
    </>
  );
}

export default Login;
