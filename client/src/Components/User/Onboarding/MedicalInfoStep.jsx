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
       toast.dismiss();
        toast.error("Error while getting diseases");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
       toast.dismiss();
        toast.error(err.response.data.detail);
      } else {
       toast.dismiss();
        toast.error("Error while getting diseases");
      }
    }
  };

  useEffect(() => {
    diseases();
  }, []);

  const handleNext = () => {
    const {
      blood_type,
      existing_medical_conditions,
      allergies,
      physical_activity_level,
      dietary_preferences,
      smoking_status,
      alcohol_consumption,
      primary_health_goal,
      preferred_workout_types,
      preferred_workout_times,
      emergency_contact,
      emergency_contact_name
    } = formData;

    if (!blood_type || !existing_medical_conditions || !physical_activity_level || !dietary_preferences.length ||
      !smoking_status || !alcohol_consumption ||
      !emergency_contact || !emergency_contact_name) {
     toast.dismiss();
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
          <label htmlFor="blood_type" className="text-gray-500 mb-2 text-md block">
            Blood Type
          </label>
          <select
            name="blood_type"
            value={formData.blood_type}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            required
          >
            <option value="" >Select Blood Type</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
              <option key={type} value={type} className="text-[#39827a]">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="existing_medical_conditions" className="text-gray-500 mb-2 text-md block">
            Existing Medical Conditions
          </label>
          <select
            name="existing_medical_conditions"
            value={formData.existing_medical_conditions}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            required
          >
            <option value="" >Select Medical Condition</option>
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
          <label htmlFor="physical_activity_level" className="text-gray-500 mb-2 text-md block">
            Physical Activity Level
          </label>
          <select
            name="physical_activity_level"
            value={formData.physical_activity_level}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            required
          >
            <option value="" >Select Activity Level</option>
            {["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extra Active"].map((level) => (
              <option key={level} value={level} className="text-[#39827a]">
                {level}
              </option>
            ))}
          </select>
        </div>

        <ArrayInputField
          label="Dietary Preferences"
          name="dietary_preferences"
          value={formData.dietary_preferences || []}
          onChange={(value) => handleArrayChange("dietary_preferences", value)}
          onRemove={(index) => handleRemoveItem("dietary_preferences", index)}
        />

        <div className="flex gap-2 w-full">
          <div className="mb-4 w-full">
            <label htmlFor="smoking_status" className="text-gray-500 mb-2 text-md block">
              Smoking Status
            </label>
            <select
              name="smoking_status"
              value={formData.smoking_status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
              required
            >
              <option value="" > Select Smoking Status</option>
              {["No", "Yes"].map((level) => (
                <option key={level} value={level} className="text-[#39827a]">
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="alcohol_consumption" className="text-gray-500 mb-2 text-md block">
              Alcohol Consumption
            </label>
            <select
              name="alcohol_consumption"
              value={formData.alcohol_consumption}
              onChange={handleInputChange}
              className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
              required
            >
              <option value="" > Select  Alcohol Consumption Status</option>
              {["No", "Yes"].map((level) => (
                <option key={level} value={level} className="text-[#39827a]">
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="primary_health_goal" className="text-gray-500 mb-2 text-md block">
            Primary Health Goal
          </label>
          <input
            type="text"
            name="primary_health_goal"
            value={formData.primary_health_goal}
            onChange={handleInputChange}
            placeholder="Enter primary health goal"
            className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            required
          />
        </div>

        <ArrayInputField
          label="Preferred Workout Types"
          name="preferred_workout_types"
          value={formData.preferred_workout_types || []}
          onChange={(value) => handleArrayChange("preferred_workout_types", value)}
          onRemove={(index) => handleRemoveItem("preferred_workout_types", index)}
        />

        <div className="mb-4">
          <label htmlFor="preferred_workout_times" className="text-gray-500 mb-2 text-md block">
            Preferred Workout Times
          </label>

          <select
            name="preferred_workout_times"
            value={formData.preferred_workout_times}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            required
          >
            <option value="" > Select  Preferred Workout Times</option>
            {["Day", "Night"].map((level) => (
              <option key={level} value={level} className="text-[#39827a]">
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-10">
          <div className="mb-4 w-full">
            <label htmlFor="emergency_contact" className="text-gray-500 mb-2 text-md block">
              Emergency Contact
            </label>
            <input
              type="text"
              name="emergency_contact"
              value={formData.emergency_contact}
              onChange={handleInputChange}
              placeholder="Enter emergency contact number"
              className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
              required
            />
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="emergency_contact_name" className="text-gray-500 mb-2 text-md block">
              Emergency Contact Name
            </label>
            <input
              type="text"
              name="emergency_contact_name"
              value={formData.emergency_contact_name}
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
      <label htmlFor={name} className="text-gray-500 mb-2 text-md block">
        {label} <span className="text-red-500 text-xs font-bold">Use comma To add Your Data</span>
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
