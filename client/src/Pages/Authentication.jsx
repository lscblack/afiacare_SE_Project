import React, { useState } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { changeLangSate } from "../features/SharedDataSlice/SharedData";
import Login from './../Components/Login';
import Registration from './../Components/Register';
import ForgotPassword from './../Components/ForgotPassword';
import ResetLinkSent from './../Components/ResetLinkSent';

function Authentication() {
  const [formState, setFormState] = useState("login");

  const toggleForm = (formType) => {
    setFormState(formType);
  };

  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#39827a] to-[#025e53] p-6">
      <h2 className="text-2xl font-semibold text-[#ffffff] mb-1 ">
        {formState === "login" ? lang.Login_Title : formState === "register" ? lang.Caccount_Title : formState === "forgot" ? 'Forgot Password' : 'Reset Link Sent'}
      </h2>
      <p className="text-slate-50 text-sm">
        {formState === "login" ? lang.Login_question : formState === "register" ? lang.Register_question : null}
        {formState !== "forgot" && formState !== "reset" && (
          <button onClick={() => toggleForm(formState === "login" ? "register" : "login")} className="text-white font-semibold ml-1">
            {formState === "login" ? lang.register : lang.login_button }
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
