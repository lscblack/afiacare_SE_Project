import React from "react";
import MyApi from "../../../AxiosInstance/MyApi";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const MedicalInfoStep = ({ formData, setFormData, handleNextStep, handlePrevStep }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [disease,setDiseases] = useState([]) 
  //--------------------get all disease
  const diseases = async() =>{
    try {
      const response = await MyApi.get("diseases/all") // for sending request on backend
      const disease = response.data
      if (disease) {
        const formattedDiseases = disease.map(disease => ({
          name: disease.Disease_name,
          id: disease.Disease_id
        }));
        setDiseases(formattedDiseases);
      } else {
        toast.dismiss();
        toast.error("Error While Getting diseases");
      }
    }
    catch (err) {
      if (err.response && err.response.status == 401) {
        toast.dismiss();
        toast.error(err.response.data.detail);
      } else {
        toast.dismiss();
        toast.error("Error While Getting diseases");
      }
    }
  }
  useEffect(()=>{
    diseases()
  },[])
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
          <label htmlFor="medicalConditions" className="text-gray-500 mb-2 text-[18px] block">
            Existing Medical Conditions
          </label>
          <select
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            required
          >
            <option value="" disabled>Select Medical Condition</option>
            {disease.map((condition) => (
              <option key={condition.id} value={condition.id} className="text-[#39827a]">
                {condition.name}
              </option>
            ))}
            {!disease && <>
            <option value=""  className="text-[#39827a]" >Loading...</option>
            </>}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="allergies" className="text-gray-500 mb-2 text-[18px] block">
            Allergies
          </label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            required
          />
        </div>
        
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

        <div className="mb-4">
          <label htmlFor="preferredWorkoutTypes" className="text-gray-500 mb-2 text-[18px] block">
            Preferred Workout Types
          </label>
          <input
            type="text"
            name="preferredWorkoutTypes"
            value={formData.preferredWorkoutTypes}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            required
            placeholder="e.g., Cardio, Strength Training, Yoga"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={handlePrevStep} className="bg-transparent text-gray-400 px-4 py-2 rounded hover:bg-gray-400 hover:text-white border duration-300">
            Previous
          </button>
          <button onClick={handleNextStep} className="bg-[#39827a] text-white px-4 py-2 rounded hover:bg-[#368a80] duration-300">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalInfoStep;
