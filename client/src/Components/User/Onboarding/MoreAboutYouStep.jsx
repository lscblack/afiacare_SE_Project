import React, { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { toast } from 'react-toastify';
const MoreAboutYouStep = ({ formData, setFormData, handleNextStep, handlePrevStep }) => {
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, id_prove: e.target.value, idNumber: "" });
    setErrors({ ...errors, id_prove: "" });
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.phone) newErrors.phone = "Phone Number is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.address) newErrors.address = "Address is required";

    if (!formData.dob){
       toast.dismiss();
      toast.warning("Date of Birth is required")
    }
    else if (!formData.phone){
       toast.dismiss();
      toast.warning("Phone Number is required")
    }
    else if (!formData.gender){
       toast.dismiss();
      toast.warning("Gender is required")
    }
    else if (!formData.address){
       toast.dismiss();
      toast.warning("Address is required")
    }
    if (calculateAge(formData.dob) >= 16 && !formData.id_prove){
      newErrors.id_prove = "ID Type is required";
      toast.warning("ID Type is required")
    } 
      

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      if (!formData.father_id && !formData.mother_id) {
        toast.dismiss();
        toast.warning(`Warning: Without providing at least one parent ID, you won't be able to see relatives.`);
      }
      handleNextStep();

    }
  };

  return (
    <div className="bg-white w-full max-w-screen-lg m-auto rounded-lg overflow-y-auto p-4">
      <div className="border-b-gray border-b border-solid pb-4">
        <h2 className="text-gray-500 font-medium text-[22px] text-center">More About You</h2>
        <p className="text-gray-400 text-center">Tell us a bit about yourself, this would not be made public</p>
      </div>

      <div className="md:p-8">
        <div className="mb-4">
          <label htmlFor="dob" className="text-gray-500 mb-2 text-[18px] block">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
          />
          {errors.dob && <span className="text-red-500 text-sm">{errors.dob}</span>}
          <div className="text-gray-400 float-right -mt-10 mr-1 cursor-pointer font-semibold">
            <CiCalendarDate size={30} className="cursor-pointer" />
          </div>
        </div>

        <div className="flex gap-4 mb-4 flex-col md:flex-row">
          <div className="md:w-1/3">
            <label htmlFor="phone" className="text-gray-500 mb-2 text-[18px] block">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
          </div>
          <div className="md:w-1/3">
            <label htmlFor="gender" className="text-gray-500 mb-2 text-[18px] block">
              Sex
            </label>
            <div className="flex space-x-3">
              {["Male", "Female"].map((gender) => (
                <label key={gender} className="flex items-center bg-white border p-2 md:w-40 rounded text-gray-400 hover:translate-y-[-5px] duration-300">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleRadioChange}
                    className="mr-2 focus:border-[#5ae9d8] focus:border-solid"
                  />
                  {gender}
                </label>
              ))}
            </div>
            {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
          </div>
          <div className="mb-4 md:w-1/3">
            <label htmlFor="address" className="text-gray-500 mb-2 text-[18px] block">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            />
            {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
          </div>
        </div>

        {calculateAge(formData.dob) >= 16 && (
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label htmlFor="id_prove" className="text-gray-500 mb-2 text-[18px] block">
                ID Type
              </label>
              <select
                name="id_prove"
                value={formData.id_prove}
                onChange={handleSelectChange}
                className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none"
              >
                <option value="" selected>
                  Select ID Type
                </option>
                <option value="passport">Passport</option>
                <option value="id">ID</option>
                {/* <option value="driversLicense">Driver's License</option> */}
              </select>
              {errors.id_prove && <span className="text-red-500 text-sm">{errors.id_prove}</span>}
            </div>
            <div className="w-1/2">
              {formData.id_prove && (
                <div>
                  <label htmlFor="idNumber" className="text-gray-500 mb-2 text-[18px] block">
                    {formData.id_prove === "passport" ? "Passport Number" : formData.id_prove === "id" ? "ID Number" : "Driver's License Number"}
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
                    placeholder={`Enter your ${formData.id_prove} number`}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label htmlFor="father_name" className="text-gray-500 mb-2 text-[18px] block">
              Father's Name
            </label>
            <input
              type="text"
              name="father_name"
              value={formData.father_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="mother_name" className="text-gray-500 mb-2 text-[18px] block">
              Mother's Name
            </label>
            <input
              type="text"
              name="mother_name"
              value={formData.mother_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            />
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label htmlFor="father_id" className="text-gray-500 mb-2 text-[18px] block">
              Father's Id (Passport)
            </label>
            <input
              type="text"
              name="father_id"
              value={formData.father_id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="mother_id" className="text-gray-500 mb-2 text-[18px] block">
              Mother's Id (Passport)
            </label>
            <input
              type="text"
              name="mother_id"
              value={formData.mother_id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label htmlFor="height" className="text-gray-500 mb-2 text-[18px] block">
              Height (cm)
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="weight" className="text-gray-500 mb-2 text-[18px] block">
              Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="maritalStatus" className="text-gray-500 mb-2 text-[18px] block">
            Marital Status
          </label>
          <div className="flex space-x-2">
            {[
              { value: true, label: "Married" },
              { value: false, label: "Single" },
            ].map((status) => (
              <label key={status.label} className="flex items-center bg-white border p-2 md:w-40 rounded text-gray-400 hover:translate-y-[-5px] duration-300">
                <input
                  type="radio"
                  name="married"
                  value={status.value}
                  checked={formData.married === String(status.value)}
                  onChange={handleRadioChange}
                  className="mr-2"
                />
                {status.label}
              </label>
            ))}
          </div>
        </div>

        {formData.married === "true" && (
          <div className="mb-4">
            <label htmlFor="spouse" className="text-gray-500 mb-2 text-[18px] block">
              Spouse Name
            </label>
            <input
              type="text"
              name="spouse"
              value={formData.spouse}
              onChange={handleInputChange}
              className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
            />
          </div>
        )}


        <div className="flex justify-between mt-4">
          <button onClick={handlePrevStep} className="bg-transparent text-gray-400 px-4 py-2 rounded hover:bg-gray-400 hover:text-white border duration-300">
            Previous
          </button>
          <button onClick={handleNext} className="bg-[#39827a] text-white px-4 py-2 rounded hover:bg-[#368a80] duration-300">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreAboutYouStep;