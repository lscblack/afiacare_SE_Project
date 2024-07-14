import React from "react";

const CheckboxOptionsStep = ({ formData, setFormData, handleSubmit, handlePrevStep }) => {
  const toggleCheckbox = (option) => {
    setFormData((prevData) => {
      const isSelected = prevData.checkboxOptions.includes(option);
      if (isSelected) {
        return {
          ...prevData,
          checkboxOptions: prevData.checkboxOptions.filter((item) => item !== option),
        };
      } else {
        return {
          ...prevData,
          checkboxOptions: [...prevData.checkboxOptions, option],
        };
      }
    });
  };

  return (
    <div className="max-w-xl">
      <h3 className="text-xl font-semibold mb-2 text-white">How are you joining us?</h3>
      <div className="space-y-2 flex items-center gap-4 justify-center">
        {["Doctor", "User", "Hospital"].map((option) => (
          <div
            key={option}
            className={`p-2 border rounded cursor-pointer ${
              formData.checkboxOptions.includes(option) ? "bg-[#39827a] text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => toggleCheckbox(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevStep}
          className="bg-transparent text-white px-4 py-2 rounded hover:bg-white hover:text-[#39827a] border duration-300"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="bg-[#39827a] text-white px-4 py-2 rounded hover:bg-[#368a80] duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CheckboxOptionsStep;
