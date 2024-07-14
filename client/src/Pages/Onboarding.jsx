import React, { useState } from "react";
import Modal from "./../Components/Modal"; // Adjust the import path as needed

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    question1: "",
    dob: "",
    gender: "",
    idType: "",
    idNumber: "",
    countryCode: "",
    phoneNumber: "",
    address: "",
    height: "",
    weight: "",
    bloodType: "",
    medicalConditions: "",
    allergies: "",
    checkboxOptions: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countrySuggestions, setCountrySuggestions] = useState([]);
  
  const steps = [
    "Welcome",
    "More about you",
    "Medical Information",
    "Checkbox Options",
  ];

  const toggleCheckbox = (option) => {
    setFormData((prevData) => {
      const isSelected = prevData.checkboxOptions.includes(option);
      if (isSelected) {
        return {
          ...prevData,
          checkboxOptions: prevData.checkboxOptions.filter(
            (item) => item !== option
          ),
        };
      } else {
        return {
          ...prevData,
          checkboxOptions: [...prevData.checkboxOptions, option],
        };
      }
    });
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
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

  const handleCountryCodeChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, countryCode: value });
    if (value.length > 0) {
      const suggestions = countryCodes.filter((code) =>
        code.toLowerCase().startsWith(value.toLowerCase())
      );
      setCountrySuggestions(suggestions);
    } else {
      setCountrySuggestions([]);
    }
  };

  const countryCodes = ["+1", "+44", "+91", "+61", "+81", "+49"]; // Example country codes, add more as needed

  return (
    <div className="flex p-10 justify-center items-center bg-gradient-to-r from-[#39827a] to-[#025e53] h-screen gap-20">
      {/* Onboarding Form */}
      <div className="p-1 max-w-xl ml-4 ">
        {currentStep === 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-white">
              Welcome to Afiacre!
            </h3>
            <p className="text-white-50 mb-4 text-justify text-[18px]">
              We're thrilled to have you here at Afiacre, your ultimate
              healthcare companion! Afiacre is designed to seamlessly connect
              you with top healthcare professionals, provide comprehensive
              health management tools, and ensure you have access to the best
              medical resources at your fingertips.
            </p>
            <p className="text-white-50 text-[18px] mb-4 text-justify">
              Let's get started on this exciting journey together! Click the
              button below to begin your onboarding process and discover all
              that Afiacre has to offer.
            </p>
            <button
              onClick={handleNextStep} className="mt-4 bg-[#36857b] hover:bg-[#368a80] text-white px-4 py-2 rounded"
            >
              Get Started
            </button>
          </div>
        )}

        {currentStep === 1 && (
          <div className="">
            <h3 className="text-xl font-semibold text-white mb-5">
              More about you
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="dob" className="text-white mb-2 text-[18px]">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange} className="w-full p-2 border rounded bg-transparent outline-none"
                />
              </div>
              <div>
                <label htmlFor="gender" className="text-white mb-2 text-[18px]">
                  Gender
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center bg-white p-1 rounded text-[#39827a]">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleRadioChange} className="mr-2"
                    />
                    Male
                  </label>
                  <label className="flex items-center bg-white p-1 rounded text-[#39827a]">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleRadioChange} className="mr-2"
                    />
                    Female
                  </label>
                  <label className="flex items-center bg-white p-1 rounded text-[#39827a]">
                    <input
                      type="radio"
                      name="gender"
                      value="Other"
                      checked={formData.gender === "Other"}
                      onChange={handleRadioChange} className="mr-2"
                    />
                    Other
                  </label>
                </div>
              </div>
              <div>
                <label
                  htmlFor="phoneNumber" className="text-white mb-2 text-[18px]"
                >
                  Phone Number
                </label>
                <div className="flex">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleCountryCodeChange} className="w-1/4 p-2 border rounded-l bg-transparent outline-none"
                  >
                    <option value="" disabled className="text-[#39827a]">
                      Select Code
                    </option>
                    {countryCodes.map((code) => (
                      <option key={code} value={code} className="text-[#39827a]">
                        {code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange} className="w-3/4 p-2 border rounded-r bg-transparent outline-none"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="address" className="text-white mb-2 text-[18px]"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange} className="w-full p-2 border rounded bg-transparent outline-none text-white"
                />
              </div>

              {calculateAge(formData.dob) >= 16 && (
                <div>
                  <label
                    htmlFor="idType" className="text-white mb-2 text-[18px]"
                  >
                    ID Type
                  </label>
                  <select
                    name="idType"
                    value={formData.idType}
                    onChange={handleSelectChange} className="w-full p-2 border rounded bg-transparent outline-none"
                  >
                    <option value="" disabled className="text-[#39827a]">
                      Select ID Type
                    </option>
                    <option value="passport" className="text-[#39827a]">
                      Passport
                    </option>
                    <option value="id" className="text-[#39827a]">
                      ID
                    </option>
                    <option
                      value="driversLicense" className="text-[#39827a]"
                    >
                      Driver's License
                    </option>
                  </select>
                </div>
              )}
              {formData.idType && (
                <div>
                  <label
                    htmlFor="idNumber" className="text-white mb-2 text-[18px]"
                  >
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
                    onChange={handleInputChange} className="w-full p-2 border rounded bg-transparent outline-none"
                    placeholder={`Enter your ${formData.idType} number`}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevStep} className="bg-transparent text-white px-4 py-2 rounded hover:bg-white hover:text-[#39827a] border duration-300"
              >
                Previous
              </button>
              <button
                onClick={handleNextStep} className="bg-[#39827a] text-white px-4 py-2 rounded hover:bg-[#368a80] duration-300"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              Medical Information
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="height" className="text-white mb-2 text-[18px]">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange} className="w-full p-2 border rounded bg-transparent outline-none"
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
                  onChange={handleInputChange} className="w-full p-2 border rounded bg-transparent outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="bloodType" className="text-white mb-2 text-[18px]"
                >
                  Blood Type
                </label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange} className="w-full p-2 border rounded bg-transparent outline-none"
                >
                  <option value="" disabled className="text-[#39827a]">
                    Select Blood Type
                  </option>
                  <option value="A+" className="text-[#39827a]">
                    A+
                  </option>
                  <option value="A-" className="text-[#39827a]">
                    A-
                  </option>
                  <option value="B+" className="text-[#39827a]">
                    B+
                  </option>
                  <option value="B-" className="text-[#39827a]">
                    B-
                  </option>
                  <option value="AB+" className="text-[#39827a]">
                    AB+
                  </option>
                  <option value="AB-" className="text-[#39827a]">
                    AB-
                  </option>
                  <option value="O+" className="text-[#39827a]">
                    O+
                  </option>
                  <option value="O-" className="text-[#39827a]">
                    O-
                  </option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="medicalConditions" className="text-white mb-2 text-[18px]"
                >
                  Existing Medical Conditions
                </label>
                <select
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleInputChange} className="w-full p-2 border rounded bg-transparent outline-none"
                >
                  <option value="" disabled className="text-[#39827a]">
                    Select Medical Condition
                  </option>
                  <option value="Diabetes" className="text-[#39827a]">
                    Diabetes
                  </option>
                  <option value="Hypertension" className="text-[#39827a]">
                    Hypertension
                  </option>
                  <option value="Asthma" className="text-[#39827a]">
                    Asthma
                  </option>
                  <option value="Heart Disease" className="text-[#39827a]">
                    Heart Disease
                  </option>
                  <option value="None" className="text-[#39827a]">
                    None
                  </option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="allergies" className="text-white mb-2 text-[18px]"
                >
                  Allergies
                </label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange} className="w-full p-2 border rounded bg-transparent outline-none"
                  placeholder="Enter your allergies..."
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevStep} className="bg-transparent text-white px-4 py-2 rounded hover:bg-white hover:text-[#39827a] border duration-300"
              >
                Previous
              </button>
              <button
                onClick={handleNextStep} className="bg-[#39827a] text-white px-4 py-2 rounded hover:bg-[#368a80] duration-300"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              Checkbox Options
            </h3>
            <div className="space-y-2">
              {["Option 1", "Option 2", "Option 3"].map((option) => (
                <div
                  key={option}
                  className={`p-2 border rounded cursor-pointer ${
                    formData.checkboxOptions.includes(option)
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  onClick={() => toggleCheckbox(option)}
                >
                  {option}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevStep} className="bg-transparent text-white px-4 py-2 rounded hover:bg-white hover:text-[#39827a] border duration-300"
              >
                Previous
              </button>
              <button
                onClick={handleSubmit} className="bg-[#39827a] text-white px-4 py-2 rounded hover:bg-[#368a80] duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-2xl font-bold mb-4">Form Submitted</h2>
          <p className="text-gray-700">
            Thank you for completing the onboarding!
          </p>
        </Modal>
      </div>
      {/* Sidebar Progress Indicator */}
      <div className="hidden md:block md:w-1/4 p-4 border-l border-gray-300">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center mb-4 ${
              index <= currentStep
                ? "text-white font-semibold"
                : "text-white-300"
            }`}
          >
            <div
              className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center border ${
                index <= currentStep
                  ? "border-white border border-solid bg-[#39827a] text-white"
                  : "border-gray-400 border-solid"
              }`}
            >
              {index + 1}
            </div>
            <span className="text-sm">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Onboarding;
