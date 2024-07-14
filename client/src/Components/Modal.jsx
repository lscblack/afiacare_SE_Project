import React from "react";

const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-[#39827a] mb-4">Completed!</h2>
        <p className="text-gray-700 mb-4">Thank you, You will now be redireced to your custom dashboard</p>
        <button
          onClick={onClose}
          className="bg-[#39827a] text-white px-4 py-2 rounded hover:bg-[#368a80]"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
