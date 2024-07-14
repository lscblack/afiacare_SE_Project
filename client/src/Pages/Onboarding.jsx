import React, { useState } from "react";
import Modal from "./../Components/Modal";
import WelcomeStep from "./../Components/WelcomeStep";
import MoreAboutYouStep from "./../Components/MoreAboutYouStep";
import MedicalInfoStep from "./../Components/MedicalInfoStep";
import CheckboxOptionsStep from "./../Components/CheckboxOptionsStep";
import SidebarProgress from "./../Components/SidebarProgress";
import astImg from "./../assets/images/ast1.svg";

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
  
  const steps = ["Welcome", "More about you", "Medical Information", "Checkbox Options"];

  const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const handlePrevStep = () => setCurrentStep((prevStep) => prevStep - 1);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <div className="flex p-10 justify-center items-center bg-gradient-to-r from-[#39827a] to-[#025e53] h-screen gap-20">
      <div className="absolute -top-40 md:-left-20 -right-40 z-10">
        <img src={astImg} alt="astImg" className="w-80" />
      </div>
      <div className="p-1 max-w-xl ml-4 z-50">
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
      <SidebarProgress currentStep={currentStep} steps={steps} />
      <div className="absolute bottom-0 -left-[180px] md:right-0 z-10">
        <img src={astImg} alt="astImg" className="w-80" />
      </div>
      <div className="absolute hidden md:block right-0">
        <img src={astImg} alt="astImg" className="w-80" />
      </div>
    </div>
  );
};

export default Onboarding;
