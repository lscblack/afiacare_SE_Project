import React from "react";

function ResetLinkSent({ toggleForm }) {
  return (
    <div className="p-6 rounded w-full max-w-lg text-center">
      <h2 className="text-lg font-semibold text-[#39827a] mb-4">Reset Link Sent</h2>
      <p className="text-gray-600 mb-4">
        If your email is registered with us, please check your inbox for the reset link.
      </p>
      <button 
        onClick={toggleForm} className="text-[#39827a] font-semibold"
      >
        Resend Link
      </button>
      <div className="mt-4">
        <button 
          onClick={() => toggleForm("login")} className="text-[#39827a] font-semibold"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ResetLinkSent;
