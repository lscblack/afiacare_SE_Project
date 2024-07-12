import React, { useState } from 'react';
import Login from './../Components/Login';
import Registration from './../Components/Register';
import ForgotPassword from './../Components/ForgotPassword';
import ResetLinkSent from './../Components/ResetLinkSent';

function Authentication() {
  const [formState, setFormState] = useState("login");

  const toggleForm = (formType) => {
    setFormState(formType);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#39827a] to-[#025e53] p-6">
      <h2 className="text-2xl font-semibold text-[#ffffff] mb-1 ">
        {formState === "login" ? 'Login' : formState === "register" ? 'Create an Account' : formState === "forgot" ? 'Forgot Password' : 'Reset Link Sent'}
      </h2>
      <p className="text-slate-50 text-sm">
        {formState === "login" ? "Don't have an account?" : formState === "register" ? "Already have an account?" : null}
        {formState !== "forgot" && formState !== "reset" && (
          <button onClick={() => toggleForm(formState === "login" ? "register" : "login")} className="text-white font-semibold ml-1">
            {formState === "login" ? 'Register' : 'Log in'}
          </button>
        )}
      </p>
      {formState === "login" && <Login toggleForm={toggleForm} showForgotPassword={() => toggleForm("forgot")} />}
      {formState === "register" && <Registration toggleForm={toggleForm} />}
      {formState === "forgot" && <ForgotPassword toggleForm={() => toggleForm("login")} />}
      {formState === "reset" && <ResetLinkSent toggleForm={() => toggleForm("login")} />}
      <div>
        <p className="text-slate-100 text-sm mt-1">&copy; 2024 Afiacare. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Authentication;
