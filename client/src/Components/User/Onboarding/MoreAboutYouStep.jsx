import React, { useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
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
    setFormData({ ...formData, Id_type: e.target.value, N_id: "" });
    setErrors({ ...errors, Id_type: "" });
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
    if (!formData.fname) newErrors.fname = "First name is required";
    if (!formData.lname) newErrors.lname = "Last name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.country) newErrors.country = "Date of Birth is required";
    if (!formData.phone) newErrors.phone = "Phone Number is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.N_id && formData.Id_type) newErrors.N_id = "Id Number is required";

    if (!formData.fname) {
      toast.dismiss();
      toast.warning("First Name is required")
    }
    else if (!formData.lname) {
      toast.dismiss();
      toast.warning("Last Name is required")
    }
    else if (!formData.dob) {
      toast.dismiss();
      toast.warning("Date of Birth is required")
    }
    else if (!formData.country) {
      toast.dismiss();
      toast.warning("Country is required")
    }
    else if (!formData.phone) {
      toast.dismiss();
      toast.warning("Phone Number is required")
    }
    else if (!formData.gender) {
      toast.dismiss();
      toast.warning("Gender is required")
    }
    else if (!formData.address) {
      toast.dismiss();
      toast.warning("Address is required")
    } else if (calculateAge(formData.dob) >= 16 && !formData.Id_type) {
      newErrors.Id_type = "ID Type is required";
      toast.warning("ID Type is required")
    } else if (!formData.N_id && formData.Id_type) {
      toast.dismiss();
      toast.warning(`${formData.Id_type} Number is required`)
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
  //-------------------for conutry
  const [selectedCountry, setSelectedCountry] = useState(null);
  const options = countryList().getData();

  const handleCountryChange = (selected) => {
    setSelectedCountry(selected);
    // Handle country change as needed
    setFormData({ ...formData, ["country"]: selected.label});
    console.log(selected.label)
  };

  return (
    <div className="bg-white max-md:w-full m-auto rounded-lg overflow-y-auto p-4">
      <div className="border-b-gray border-b border-solid pb-4">
        <h2 className="text-gray-500 font-medium text-[22px] text-center">More About You</h2>
        <p className="text-gray-400 text-center">Tell us a bit about yourself, this would not be made public</p>
      </div>
      <div className="flex gap-4 mt-4 mb-4 flex-col md:flex-row ">
        <div className="w-full">
          <label htmlFor="fname" className="text-gray-500 mb-2 text-md block">
            First Name
          </label>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
          />
          {errors.fname && <span className="text-red-500 text-sm">{errors.fname}</span>}
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="lname" className="text-gray-500 mb-2 text-md block">
            Last Name
          </label>
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
          />
          {errors.lname && <span className="text-red-500 text-sm">{errors.lname}</span>}
        </div>
      </div>
      <div className=" ">
        <div className="flex gap-4 max-md:flex-wrap">
          <div className="w-full mb-4">
            <label htmlFor="dob" className="text-gray-500 mb-2 text-md block">
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
          <div className="w-full mb-4">
            <label htmlFor="country" className="text-gray-500 mb-2 text-md block">
              Select Your Country
            </label>
            <Select
              name="country"
              options={options}
              value={selectedCountry}
              onChange={handleCountryChange}
              placeholder="Search or select a country"
              styles={{
                control: (base) => ({
                  ...base,
                  height: 42,
                  borderRadius: '0.375rem',
                  borderColor: '#ccc',
                  outline: 'none',
                  ':hover': {
                    borderColor: '#5ae9d8',
                  },
                  ':focus': {
                    borderColor: '#5ae9d8',
                  },
                }),
                option: (base) => ({
                  ...base,
                  fontSize: '14px',
                  color:'grey',
                }),
              }}
              maxMenuHeight={300}
              isSearchable
            />
            {/* Display validation error if applicable */}
            {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
          </div>
        </div>
        <div className="flex gap-4 mb-4 flex-col md:flex-row">
          <div className="md:w-1/3">
            <label htmlFor="phone" className="text-gray-500 mb-2 text-md block">
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
            <label htmlFor="gender" className="text-gray-500 mb-2 text-md block">
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
            <label htmlFor="address" className="text-gray-500 mb-2 text-md block">
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
              <label htmlFor="Id_type" className="text-gray-500 mb-2 text-md block">
                ID Type
              </label>
              <select
                name="Id_type"
                value={formData.Id_type}
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
              {errors.Id_type && <span className="text-red-500 text-sm">{errors.Id_type}</span>}
            </div>
            <div className="w-1/2">
              {formData.Id_type && (
                <div>
                  <label htmlFor="N_id" className="text-gray-500 mb-2 text-md block">
                    {formData.Id_type === "passport" ? "Passport Number" : formData.Id_type === "id" ? "ID Number" : "Driver's License Number"}
                  </label>
                  <input
                    type="text"
                    name="N_id"
                    value={formData.N_id}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded bg-transparent text-gray-400 outline-none focus:border-[#5ae9d8] focus:border-solid"
                    placeholder={`Enter your ${formData.Id_type} number`}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label htmlFor="father_name" className="text-gray-500 mb-2 text-md block">
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
            <label htmlFor="mother_name" className="text-gray-500 mb-2 text-md block">
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
            <label htmlFor="father_id" className="text-gray-500 mb-2 text-md block">
              Father's Id ({formData.Id_type})
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
            <label htmlFor="mother_id" className="text-gray-500 mb-2 text-md block">
              Mother's Id ({formData.Id_type})
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
            <label htmlFor="height" className="text-gray-500 mb-2 text-md block">
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
            <label htmlFor="weight" className="text-gray-500 mb-2 text-md block">
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
          <label htmlFor="maritalStatus" className="text-gray-500 mb-2 text-md block">
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
            <label htmlFor="spouse" className="text-gray-500 mb-2 text-md block">
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
