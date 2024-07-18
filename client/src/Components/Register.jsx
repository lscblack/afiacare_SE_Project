import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";
import MyApi from "../AxiosInstance/MyApi";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Registration({ toggleForm }) {
  const nav = useNavigate()
  const lang = useSelector((state) => state.afiaCare.langs);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [Cpass, setCpass] = useState("");
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
      toast.error('All fields .');
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

  return (
    <form className="p-6 rounded w-full max-w-lg" onSubmit={register_New_User}>
      <div className="mb-4 flex items-center gap-2">
        <div>
          <label htmlFor="fname" className="block text-white font-semibold mb-2">
            {lang.first_name}
          </label>
          <input
            type="text"
            id="fname"
            className="w-full p-2 border rounded bg-transparent text-slate-100 outline-none"

            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="lname" className="block text-white font-semibold mb-2">
            {lang.last_name}
          </label>
          <input
            type="text"
            id="lname"
            className="w-full p-2 border rounded bg-transparent text-slate-100 outline-none"

            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mb-4 flex items-center gap-2">
        <div>
          <label htmlFor="email" className="block text-white font-semibold mb-2">
            {lang.email}
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded bg-transparent text-slate-100 outline-none"

            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="username" className="block text-white font-semibold mb-2">
            {lang.login_email}
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-2 border rounded bg-transparent text-slate-100 outline-none"

            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="mb-4 relative">
        <label htmlFor="password" className="block text-white font-semibold mb-2">
          {lang.password}
        </label>
        <input
          className="w-full p-2 border rounded bg-transparent text-slate-100 outline-none"
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
        <label htmlFor="confirmPassword" className="block text-white font-semibold mb-2">
          {lang.confirm_password}
        </label>
        <input
          value={Cpass}
          onChange={(e) => setCpass(e.target.value)}
          className="w-full p-2 border rounded bg-transparent text-slate-100 outline-none"
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
      <button
        type="submit"
        className="w-full bg-[#36857b] text-white py-2 rounded hover:bg-[#368a80] mb-4"
      >
        {!showLoad&&<>
        {lang.register}
        </>}
        {showLoad&&<>
        Creating Account ...
        </>}
      </button>
      <button
        type="button"
        className="w-full flex items-center justify-center bg-white text-gray-500 font-medium py-2 rounded hover:bg-gray-100"
      >
        <FcGoogle className="mr-2" /> {lang.get_started_with_google}
      </button>
    </form>
  );
}

export default Registration;
