import React from "react";

const MedicalInfoStep = ({ formData, setFormData, handleNextStep, handlePrevStep }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2 text-white">Medical Information</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="height" className="text-white mb-2 text-[18px]">
            Height (cm)
          </label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent outline-none"
          />
        </div>
        <div>
          <label htmlFor="weight" className="text-white mb-2 text-[18px]">
            Weight (kg)
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent outline-none"
          />
        </div>
        <div>
          <label htmlFor="bloodType" className="text-white mb-2 text-[18px]">
            Blood Type
          </label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent outline-none"
          >
            <option value="" disabled>Select Blood Type</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
              <option key={type} value={type} className="text-[#39827a]">
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="medicalConditions" className="text-white mb-2 text-[18px]">
            Existing Medical Conditions
          </label>
          <select
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent outline-none"
          >
            <option value="" disabled>Select Medical Condition</option>
            {["Diabetes", "Hypertension", "Asthma", "Heart Disease", "None"].map((condition) => (
              <option key={condition} value={condition} className="text-[#39827a]">
                {condition}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="allergies" className="text-white mb-2 text-[18px]">
            Allergies
          </label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent outline-none"
          />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={handlePrevStep} className="bg-transparent text-white px-4 py-2 rounded hover:bg-white hover:text-[#39827a] border duration-300">
          Previous
        </button>
        <button onClick={handleNextStep} className="bg-[#39827a] text-white px-4 py-2 rounded hover:bg-[#368a80] duration-300">
          Next
        </button>
      </div>
    </div>
  );
};

export default MedicalInfoStep;
