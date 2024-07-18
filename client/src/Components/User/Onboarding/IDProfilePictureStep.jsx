import React from "react";

const IDProfilePictureStep = ({ formData, setFormData, handleSubmit, handlePrevStep }) => {
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">ID and Profile Picture</h2>
      <label>
        ID Picture
        <input 
          type="file" 
          name="idPicture" 
          onChange={handleFileChange} 
          className="mt-1 p-2 border rounded w-full"
        />
      </label>
      <label>
        Profile Picture
        <input 
          type="file" 
          name="profilePicture" 
          onChange={handleFileChange} 
          className="mt-1 p-2 border rounded w-full"
        />
      </label>
      <div className="flex justify-between mt-4">
        <button 
          onClick={handlePrevStep} 
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Back
        </button>
        <button 
          onClick={handleSubmit} 
          className="px-4 py-2 bg-[#39827a] text-white rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default IDProfilePictureStep;
