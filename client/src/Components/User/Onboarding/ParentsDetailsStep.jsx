import React from "react";

const ParentsDetailsStep = ({ formData, setFormData, handleNextStep, handlePrevStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Parents Details</h2>
      <label>
        Parent's Name
        <input 
          type="text" 
          name="parentName" 
          value={formData.parentName} 
          onChange={handleChange} 
          className="mt-1 p-2 border rounded w-full"
        />
      </label>
      <label>
        Parent's ID Number
        <input 
          type="text" 
          name="parentIDNumber" 
          value={formData.parentIDNumber} 
          onChange={handleChange} 
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
          onClick={handleNextStep} 
          className="px-4 py-2 bg-[#39827a] text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ParentsDetailsStep;
