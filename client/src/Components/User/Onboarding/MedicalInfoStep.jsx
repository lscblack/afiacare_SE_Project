import React, { useState, useEffect } from "react";
import MyApi from "../../../AxiosInstance/MyApi";
import { toast } from "react-toastify";

const MedicalInfoStep = ({ formData, setFormData, handleNextStep, handlePrevStep }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRemoveItem = (name, index) => {
    const updatedArray = [...formData[name]];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [name]: updatedArray });
  };

  const [disease, setDiseases] = useState([]);

  const diseases = async () => {
    try {
      const response = await MyApi.get("diseases/all");
      const diseaseData = response.data;
      if (diseaseData) {
        const formattedDiseases = diseaseData.map(d => ({
          name: d.Disease_name,
          id: d.Disease_id
        }));
        setDiseases(formattedDiseases);
      } else {
        toast.error("Error while getting diseases");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error(err.response.data.detail);
      } else {
        toast.error("Error while getting diseases");
      }
    }
  };

  useEffect(() => {
    diseases();
  }, []);

  const handleNext = () => {
    const {
      bloodType,
      existingMedicalConditions,
      allergies,
      physicalActivityLevel,
      dietaryPreferences,
      smokingStatus,
      alcoholConsumption,
      primaryHealthGoal,
      preferredWorkoutTypes,
      preferredWorkoutTimes,
      emergencyContact,
      emergencyContactName
    } = formData;

    if (!bloodType || !existingMedicalConditions || !allergies.length || !physicalActivityLevel || !dietaryPreferences.length ||
      !smokingStatus || !alcoholConsumption || !primaryHealthGoal || !preferredWorkoutTypes.length || !preferredWorkoutTimes ||
      !emergencyContact || !emergencyContactName) {
      toast.error("Please fill out all required fields");
      return;
    }

    handleNextStep();
  };

  return (
    <div className="bg-white w-full max-w-screen-lg m-auto rounded-lg overflow-y-auto p-4">
      <div className="border-b-gray border-b border-solid pb-4">
        <h2 className="text-gray-500 font-medium text-[22px] text-center">Medical Information</h2>
        <p className="text-gray-400 text-center">Please provide your medical details</p>
      </div>

      <div className="md:p-8">
        <div className="mb-4">
          <label htmlFor="bloodType" className="text-gray-500 mb-2 text-[18px] block">
            Blood Type
          </label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            required
          >
            <option value="" disabled>Select Blood Type</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
              <option key={type} value={type} className="text-[#39827a]">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="existingMedicalConditions" className="text-gray-500 mb-2 text-[18px] block">
            Existing Medical Conditions
          </label>
          <select
            name="existingMedicalConditions"
            value={formData.existingMedicalConditions}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            required
          >
            <option value="" disabled>Select Medical Condition</option>
            {disease.sort().map((condition) => (
              <option key={condition.id} value={condition.id} className="text-[#39827a]">
                {condition.name}
              </option>
            ))}
          </select>
        </div>

        <ArrayInputField
          label="Allergies"
          name="allergies"
          value={formData.allergies || []}
          onChange={(value) => handleArrayChange("allergies", value)}
          onRemove={(index) => handleRemoveItem("allergies", index)}
        />

        <div className="mb-4">
          <label htmlFor="physicalActivityLevel" className="text-gray-500 mb-2 text-[18px] block">
            Physical Activity Level
          </label>
          <select
            name="physicalActivityLevel"
            value={formData.physicalActivityLevel}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            required
          >
            <option value="" disabled>Select Activity Level</option>
            {["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extra Active"].map((level) => (
              <option key={level} value={level} className="text-[#39827a]">
                {level}
              </option>
            ))}
          </select>
        </div>

        <ArrayInputField
          label="Dietary Preferences"
          name="dietaryPreferences"
          value={formData.dietaryPreferences || []}
          onChange={(value) => handleArrayChange("dietaryPreferences", value)}
          onRemove={(index) => handleRemoveItem("dietaryPreferences", index)}
        />

        <div className="flex gap-2 w-full">
          <div className="mb-4 w-full">
            <label htmlFor="smokingStatus" className="text-gray-500 mb-2 text-[18px] block">
              Smoking Status
            </label>
            <select
              name="smokingStatus"
              value={formData.smokingStatus}
              onChange={handleInputChange}
              className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
              required
            >
              <option value="" disabled> Select Smoking Status</option>
              {["No", "Yes"].map((level) => (
                <option key={level} value={level} className="text-[#39827a]">
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="alcoholConsumption" className="text-gray-500 mb-2 text-[18px] block">
              Alcohol Consumption
            </label>
            <select
              name="alcoholConsumption"
              value={formData.alcoholConsumption}
              onChange={handleInputChange}
              className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
              required
            >
              <option value="" disabled> Select  Alcohol Consumption Status</option>
              {["No", "Yes"].map((level) => (
                <option key={level} value={level} className="text-[#39827a]">
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="primaryHealthGoal" className="text-gray-500 mb-2 text-[18px] block">
            Primary Health Goal
          </label>
          <input
            type="text"
            name="primaryHealthGoal"
            value={formData.primaryHealthGoal}
            onChange={handleInputChange}
            placeholder="Enter primary health goal"
            className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            required
          />
        </div>

        <ArrayInputField
          label="Preferred Workout Types"
          name="preferredWorkoutTypes"
          value={formData.preferredWorkoutTypes || []}
          onChange={(value) => handleArrayChange("preferredWorkoutTypes", value)}
          onRemove={(index) => handleRemoveItem("preferredWorkoutTypes", index)}
        />

        <div className="mb-4">
          <label htmlFor="preferredWorkoutTimes" className="text-gray-500 mb-2 text-[18px] block">
            Preferred Workout Times
          </label>

          <select
            name="preferredWorkoutTimes"
            value={formData.preferredWorkoutTimes}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            required
          >
            <option value="" disabled> Select  Preferred Workout Times</option>
            {["Day", "Night"].map((level) => (
              <option key={level} value={level} className="text-[#39827a]">
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-10">
          <div className="mb-4 w-full">
            <label htmlFor="emergencyContact" className="text-gray-500 mb-2 text-[18px] block">
              Emergency Contact
            </label>
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              placeholder="Enter emergency contact number"
              className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
              required
            />
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="emergencyContactName" className="text-gray-500 mb-2 text-[18px] block">
              Emergency Contact Name
            </label>
            <input
              type="text"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleInputChange}
              placeholder="Enter emergency contact name"
              className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
              required
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handlePrevStep}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="bg-teal-500 text-white px-4 py-2 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const ArrayInputField = ({ label, name, value, onChange, onRemove }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const lastChar = inputValue.slice(-1);
    if (lastChar === ",") {
      const items = inputValue.split(",").map(item => item.trim()).filter(item => item);
      if (items.length) {
        onChange([...value, ...items]);
        setInputValue("");
      }
    }
  }, [inputValue, onChange, value]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="text-gray-500 mb-2 text-[18px] block">
        {label}
      </label>
      <div className="flex items-center mb-2">
        <input
          type="text"
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={`Enter ${label.toLowerCase()} separated by comma`}
          className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((item, index) => (
          <div key={index} className="flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-md">
            <span>{item}</span>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="ml-2 text-red-500"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalInfoStep;
