import React, { useState } from "react";
import Modal from "../Components/User/Onboarding/Modal";
import WelcomeStep from "../Components/User/Onboarding/WelcomeStep";
import MoreAboutYouStep from "../Components/User/Onboarding/MoreAboutYouStep";
import MedicalInfoStep from "../Components/User/Onboarding/MedicalInfoStep";
import CheckboxOptionsStep from "../Components/User/Onboarding/CheckboxOptionsStep";
import SidebarProgress from "../Components/User/Onboarding/SidebarProgress";
import Logo from "../assets/images/afiacare.svg";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(
    {
      "fname": "",
      "lname": "",
      "phone": "",
      "gender": "",
      "country": "",
      "dob": "",
      "father_id": "",
      "father_name": "",
      "mother_id": "",
      "mother_name": "",
      "height": 0,
      "weight": 0,
      "married": true,
      "spouse": "",
      "avatar": "",
      "id_prove": "",
      "password": "",
      "blood_type": "",
      "existing_medical_conditions": "",
      "allergies": [
        ""
      ],
      "physical_activity_level": "",
      "dietary_preferences": [
        ""
      ],
      "smoking_status": "",
      "alcohol_consumption": "",
      "primary_health_goal": "",
      "preferred_workout_types": [
        ""
      ],
      "preferred_workout_times": "",
      "emergency_contact": "",
      "emergency_contact_name": ""
    }
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const steps = ["Welcome", "More about you", "Medical Information", "File Upload"];

  const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const handlePrevStep = () => setCurrentStep((prevStep) => prevStep - 1);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="  py-2 h-full overflow-auto ">
      <div className="flex justify-between  items-center px-10 sticky top-0 bg-[rgb(241,245,249)]">
        <div className="">
          <img src={Logo} alt="Logo" className="w-[100px] object-cover hidden md:block" />
        </div>
        <div>
          <SidebarProgress currentStep={currentStep} steps={steps} />
        </div>
        <div>
          {/* <button className="text-[#39827a] hidden md:block font-medium">Skip</button> */}
        </div>

      </div>

      <div className="p-14">
        {currentStep === 0 && <WelcomeStep handleNextStep={handleNextStep} />}
        {currentStep === 1 && (
          <MoreAboutYouStep
            formData={formData}
            setFormData={setFormData}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}
        {currentStep === 2 && (
          <MedicalInfoStep
            formData={formData}
            setFormData={setFormData}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}
        {currentStep === 3 && (
          <CheckboxOptionsStep
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            handlePrevStep={handlePrevStep}
          />
        )}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>


    </div>
  );
};

export default Onboarding;
