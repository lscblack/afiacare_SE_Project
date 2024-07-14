import React from "react";

const MoreAboutYouStep = ({ formData, setFormData, handleNextStep, handlePrevStep }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, idType: e.target.value, idNumber: "" });
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

  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-2">More about you</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="dob" className="text-white mb-2 text-[18px]">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent outline-none"
          />
        </div>
        <div>
          <label htmlFor="gender" className="text-white mb-2 text-[18px]">
            Gender
          </label>
          <div className="flex space-x-4">
            {["Male", "Female", "Other"].map((gender) => (
              <label key={gender} className="flex items-center bg-white p-2 px-4 rounded text-[#39827a]">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={handleRadioChange}
                  className="mr-2 w-4 items-center bg-white shadow-sm rounded text-[#39827a] "
                />
                {gender}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="phoneNumber" className="text-white mb-2 text-[18px]">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent outline-none"
          />
        </div>
        <div>
          <label htmlFor="address" className="text-white mb-2 text-[18px]">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-transparent outline-none text-white"
          />
        </div>

        {calculateAge(formData.dob) >= 16 && (
          <div>
            <label htmlFor="idType" className="text-white mb-2 text-[18px]">
              ID Type
            </label>
            <select
              name="idType"
              value={formData.idType}
              onChange={handleSelectChange}
              className="w-full p-2 border rounded bg-transparent outline-none"
            >
              <option value="" disabled>Select ID Type</option>
              <option value="passport">Passport</option>
              <option value="id">ID</option>
              <option value="driversLicense">Driver's License</option>
            </select>
          </div>
        )}
        
        {formData.idType && (
          <div>
            <label htmlFor="idNumber" className="text-white mb-2 text-[18px]">
              {formData.idType === "passport"
                ? "Passport Number"
                : formData.idType === "id"
                ? "ID Number"
                : "Driver's License Number"}
            </label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded bg-transparent outline-none"
              placeholder={`Enter your ${formData.idType} number`}
            />
          </div>
        )}
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

export default MoreAboutYouStep;
