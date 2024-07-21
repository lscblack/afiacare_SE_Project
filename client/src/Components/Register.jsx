import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";
import MyApi from "../AxiosInstance/MyApi";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import MainLoad from "../loads/MainLoad";
import { jwtDecode } from 'jwt-decode';
import { useEffect } from "react";
import LoginWithGoogle from "./LoginWithGoogle";
function Registration({ toggleForm }) {
  const nav = useNavigate()
  const lang = useSelector((state) => state.afiaCare.langs);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [Cpass, setCpass] = useState("");
  const [ShowGoogle, setGoogle] = useState(false)
  const [avatar, setAvatar] = useState("")
  const [data, setData] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const register_New_User = async (e) => {
    setShowLoad(true)
    e.preventDefault(); // Prevent the form from submitting the traditional way
    // Check if  fields are filled
    const { fname, lname, username, email, password } = data;
    if (!fname || !lname || !username || !email || !password) {
      toast.dismiss();
      toast.warning('All fields .');
      setShowLoad(false)
      return;
    }
    if (data.password !== Cpass) {
      toast.dismiss();
      toast.error(`Error: Passwords Don't Match`);
      setShowLoad(false)
    } else {
      setShowLoad(true)
      try {
        const response = await MyApi.post("auth/register", data);

        if (response.data && response.data.status_code == 400) {
          toast.dismiss();
          toast.error(`Error: ${response.data.detail || 'An error occurred'}`);
          console.log('Error detail:', JSON.stringify(response.data, null, 2)); // Pretty print the object
        } else if (response.status >= 200 && response.status <= 299) {
          toast.dismiss();
          toast.success('Registration successful!');
          window.location.href = "/authentication?show=login"
        } else {
          toast.dismiss();
          toast.error('An unexpected error occurred.');
          console.log('Unexpected response:', JSON.stringify(response, null, 2)); // Pretty print the object
        }
        setShowLoad(false)
      } catch (err) {
        toast.dismiss();
        toast.error('An unexpected error occurred.');
        console.log('Error:', err);
        setShowLoad(false)
      }
    }


  };
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
          <MainLoad title="Creating Your Account" />
        </div>
      </>}
      {ShowGoogle &&
        <>
          <LoginWithGoogle data={data} avatar={avatar} setData={setData} />
        </>
      }
      {!ShowGoogle &&
        <form className="p-6 rounded w-full max-w-lg mt-3 bg-gray-100" onSubmit={register_New_User}>
          <div className="mb-4 flex items-center gap-2">
            <div>
              <label htmlFor="fname" className="block text-slate-700 font-semibold mb-2">
                {lang.first_name}
              </label>
              <input
                type="text"
                id="fname"
                placeholder="Type Here.."
                className="w-full p-3 border rounded bg-slate-200 text-slate-900 outline-none"

                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="lname" className="block text-slate-700 font-semibold mb-2">
                {lang.last_name}
              </label>
              <input
                type="text"
                id="lname"
                placeholder="Type Here.."
                className="w-full p-3 border rounded bg-slate-200 text-slate-900 outline-none"

                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-4 flex items-center gap-2">
            <div>
              <label htmlFor="email" className="block text-slate-700 font-semibold mb-2">
                {lang.email}
              </label>
              <input
                type="email"
                id="email"
                placeholder="Type Here.."
                className="w-full p-3 border rounded bg-slate-200 text-slate-900 outline-none"

                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-slate-700 font-semibold mb-2">
                {lang.login_email}
              </label>
              <input
                type="text"
                id="username"
                placeholder="Type Here.."
                className="w-full p-3 border rounded bg-slate-200 text-slate-900 outline-none"

                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-slate-700 font-semibold mb-2">
              {lang.password}
            </label>
            <input
              placeholder="Enter Your Password Here"
              className="w-full p-3 border rounded bg-slate-200 text-slate-900 outline-none"
              type={showPassword ? "text" : "password"}
              id="password"

              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-11 text-[#39827a]"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
          <div className="mb-4 relative">
            <label htmlFor="confirmPassword" className="block text-slate-700 font-semibold mb-2">
              {lang.confirm_password}
            </label>
            <input
              value={Cpass}
              placeholder="Confirm Your Password Here"
              onChange={(e) => setCpass(e.target.value)}
              className="w-full p-3 border rounded bg-slate-200 text-slate-900 outline-none"
              type={showPassword ? "text" : "password"}
              id="confirmPassword"

            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-11 text-[#39827a]"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="terms"
              required
              className="mr-2 bg-white border"
            />
            <label htmlFor="terms" className="text-slate-700">
              {lang.agree_to}{" "}
              <a href="#" className="text-[#25756c]">
                {lang.terms_and_conditions}
              </a>{" "}
              {lang.and}{" "}
              <a href="#" className="text-[#25756c]">
                {lang.privacy_policy}
              </a>
              .
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-[#36857b] text-slate-200 py-3 rounded hover:bg-[#256b63] mb-4"
          >
            {lang.register}
          </button>
          {/* <button
            type="button"
            className="w-full flex items-center justify-center  font-medium  bg-gray-200 text-gray-700 py-3 rounded hover:bg-gray-300"
          >
            <FcGoogle className="mr-2" /> {lang.get_started_with_google}
          </button> */}
          <div className="w-full bg-none flex justify-center items-center text-center">
            <button id="signInDiv" ></button>
          </div>
        </form>
      }


    </>
  );
}

export default Registration;
