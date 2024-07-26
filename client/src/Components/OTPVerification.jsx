import { toast } from 'react-toastify';
import MyApi from "../AxiosInstance/MyApi"; // Adjust the import path if needed
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { MdEmail } from 'react-icons/md';
import { addUserLogin } from "../features/SharedDataSlice/SharedData";
import { ImSpinner2 } from 'react-icons/im'; // Import a spinner icon

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
    
      if (response.data.detail === "Successfully Verified") {
        toast.success("OTP verified successfully.");
        // dispatch the data here 
        if (dispatch(addUserLogin(UserData))) {
          // Redirect to dashboard or login success page
          window.location.href = "/dashboard";
        } else {
          toast.error("Unable to establish session. Please retry.");
        }
      } else {
        toast.error("Error verifying OTP. Please try again later.");
      }
    } catch (err) {
      // Extract status code or message from the error response if available
      let errorMessage = "Error verifying OTP. Please try again later.";
      
      if (err.response) {
        // Server responded with a status code other than 2xx
        const status = err.response.status;
        const data = err.response.data;
    
        if (status === 404) {
          errorMessage = "Invalid OTP. Please try again.";
        } else if (status === 422) {
          errorMessage = "Invalid input. Please input the correct OTP.";
        } else if (data && data.detail) {
          errorMessage = data.detail;
        }
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = "Network error. Please check your connection and try again.";
      } else {
        // Something happened in setting up the request
        errorMessage = "Error setting up request. Please try again later.";
      }
    
      toast.error(errorMessage);
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
          <button 
            type="submit" 
            className={`w-full py-3 rounded mb-4 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#36857b] hover:bg-[#276b63]"} text-slate-200 flex items-center justify-center`}
            disabled={loading}
          >
            {loading && <ImSpinner2 className="animate-spin mr-2" size={20} />} {/* Loader */}
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
  );
}

export default OTPVerification;
