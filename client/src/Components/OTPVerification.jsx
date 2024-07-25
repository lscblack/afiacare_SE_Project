import { toast } from 'react-toastify';
import MyApi from "../AxiosInstance/MyApi"; // Adjust the import path if needed
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { MdEmail } from 'react-icons/md';
import { addUserLogin } from "../features/SharedDataSlice/SharedData";

function OTPVerification({ toggleForm, resendOtp, UserData }) {
  const [otp, setOtp] = useState(""); // State to store OTP input
  const [loading, setLoading] = useState(false); // State to handle loading state
  const dispatch = useDispatch();

  // Handle OTP input change
  const handleInputChange = (e) => {
    setOtp(e.target.value);
  };

  // Handle OTP verification
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!otp) {
      toast.error("Please enter an OTP.");
      setLoading(false);
      return;
    }

    try {
      const verification_code = localStorage.getItem("verification_code"); 
      const email = localStorage.getItem("email"); 
      const response = await MyApi.post("email/verify-otp", {
        "otp_code": otp,
        "verification_code": verification_code,
        "email": email
      });
      
      if (response.data.detail == "Successfully Verified") {
        toast.success("OTP verified successfully.");
        // dispatch the data here 
        if(dispatch(addUserLogin(UserData))){
          // Redirect to dashboard or login success page
          window.location.href = "/dashboard"
        }
        else {
          toast.error("Unable To Establish Session For You Retry");
        }
      } else if(response.status == 404) {
        toast.error("Invalid OTP. Please try again.");
      } else if(response.status == 422) {
        toast.error("Invalid input. Please input the correct OTP.");
      }
      else {
        toast.error("Error verifying OTP. Please try again later.");
      }
    } catch (err) {
      toast.error("Error verifying OTP. Please try again later.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
      <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md text-center">
        <div className="mb-4">
          <MdEmail size={60} className="text-[#39827a] mx-auto mb-6" />
          <h2 className="text-gray-900 text-xl font-bold my-2">Please check your email</h2>
          <p className="text-gray-700 text-sm">We've sent a code to your account.</p>
        </div>
        <form onSubmit={handleVerifyOTP}>
          <div className="mb-1">
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-slate-200 outline-none text-slate-700"
              placeholder="Enter OTP"
              required
            />
          </div>
          <div className="mb-4">
            <button type="button" className="text-gray-500 text-sm">
              Didn't get the code? <span onClick={resendOtp} className='text-[#39827a] hover:underline'>Resend</span>
            </button>
          </div>
          <button type="submit" className="w-full bg-[#36857b] text-slate-200 py-3 rounded hover:bg-[#276b63] mb-4">
            Verify OTP
          </button>
        </form>
      </div>
  );
}

export default OTPVerification;
