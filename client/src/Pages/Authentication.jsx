import React, { useEffect, useState } from "react"; 
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import Login from './../Components/Login';
import Registration from './../Components/Register';
import ForgotPassword from './../Components/ForgotPassword';
import ResetLinkSent from './../Components/ResetLinkSent';
import OTPVerification from './../Components/OTPVerification'; 
import { toast } from "react-toastify";
import MyApi from "../AxiosInstance/MyApi";

function Authentication() {
  const [formState, setFormState] = useState("");
  const [email, setEmail] = useState("");
  const [showLoad, setShowLoad] = useState(false);
  const [ UserData, setUserData ] = useState(null);


  const toggleForm = (formType) => {
    setFormState(formType);
  };

  const lang = useSelector(state => state.afiaCare.langs);
  const location = useLocation();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fromReg = params.get('show');
    if (fromReg === "register") {
      toggleForm('register');
    } else {
      toggleForm('login');
    }
  }, [location.search]);

//send otp 
  const sendOtp = async (email, purpose) => {
    try {
      const response = await MyApi.post("email/send-otp", { "purpose": purpose, "toEmail": email });
      if (response.data) {
        // Store the OTP request response in local storage
        localStorage.setItem('email', email);
        localStorage.setItem('verification_code', response.data.verification_Code);
        setShowLoad(false);
      } else {
        toast.dismiss();
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Error While Sending OTP. Try again later.");
      console.log(err);
    }
  };

  // handle login success
  const handleLoginSuccess = (UserData) => {
    setUserData(UserData);
    toggleForm('otp-verification');
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#39827a] to-[#025e53] p-6">
      <h2 className="text-2xl font-semibold text-[#ffffff] mb-1 ">
        {formState === "login" ? lang.Login_Title 
          : formState === "register" ? lang.Caccount_Title 
          : formState === "forgot" ? 'Forgot Password' 
          : formState === "reset" ? 'Reset Link Sent' 
          : formState === "otp-verification" ? 'OTP Verification' 
          : ''
        }
      </h2>
      <p className="text-slate-50 text-sm">
        {formState === "login" ? lang.Login_question 
          : formState === "register" ? lang.Register_question 
          : null
        }
        {(formState !== "forgot" && formState !== "reset" && formState !== "otp-verification") && (
          <button 
            onClick={() => toggleForm(formState === "login" ? "register" : "login")} 
            className="text-white font-semibold ml-1"
          >
            {formState === "login" ? lang.register : lang.login_button }
          </button>
        )}
      </p>
      {formState === "login" && <Login toggleForm={toggleForm} showForgotPassword={() => toggleForm("forgot")} showOTPVerification={(UserData) => handleLoginSuccess(UserData)} sendOtp={sendOtp} setEmail={setEmail} />}
      {formState === "register" && <Registration toggleForm={toggleForm} />}
      {formState === "forgot" && <ForgotPassword toggleForm={() => toggleForm("login")} />}
      {formState === "reset" && <ResetLinkSent toggleForm={() => toggleForm("login")} />}
      {formState === "otp-verification" && <OTPVerification toggleForm={() => toggleForm("login")} resendOtp={() => sendOtp(email, "login")} UserData={UserData} />}
      <div>
        <p className="text-slate-100 text-sm mt-1">&copy; 2024 Afiacare. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Authentication;
