import React, { useState } from "react";
import Modal from "../Components/User/Onboarding/Modal";
import WelcomeStep from "../Components/User/Onboarding/WelcomeStep";
import MoreAboutYouStep from "../Components/User/Onboarding/MoreAboutYouStep";
import MedicalInfoStep from "../Components/User/Onboarding/MedicalInfoStep";
import CheckboxOptionsStep from "../Components/User/Onboarding/CheckboxOptionsStep";
import SidebarProgress from "../Components/User/Onboarding/SidebarProgress";
import Logo from "../assets/images/afiacare.svg";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import MyApi from "../AxiosInstance/MyApi";
import MainLoad from "../loads/MainLoad";
import { addUserLogin } from "../features/SharedDataSlice/SharedData";
import { useDispatch } from "react-redux";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch()
  const UserInfo = useSelector(state => state.afiaCare.usersLogin);
  const [showLoad, setShowLoad] = useState(false);
  const [formData, setFormData] = useState(
    {
      "fname": UserInfo.UserInfo.fname,
      "lname": UserInfo.UserInfo.lname,
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
      "avatar": UserInfo.UserInfo.avatar,
      "id_prove": "",
      "Id_type": "",
      "N_id": "",
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
  const handleSubmit = async () => {
    try {
        setShowLoad(true);
        const response = await MyApi.patch("apis/me", formData);

        toast.dismiss();

        if (response.data && response.data.status_code === 400) {
            toast.error(`Error: ${response.data.detail || 'An error occurred'}`);
            console.log('Error detail:', JSON.stringify(response.data, null, 2));
        } else if (response.status >= 200 && response.status <= 299) {
            toast.success('Onboarding Registration successful!');

            const oldData = { ...UserInfo, UserInfo: response.data };

            console.log(oldData);

            if (dispatch(addUserLogin(oldData))) {
                // window.location.href = "/dashboard";
            }
        } else {
            toast.error('An unexpected error occurred.');
            console.log('Unexpected response:', JSON.stringify(response, null, 2));
        }
    } catch (err) {
        toast.dismiss();

        if (err.response && err.response.status === 404) {
            toast.error('User Not Found');
        } else {
            toast.error('An unexpected error occurred. Server seems to be down.');
            console.log('Error:', err);
        }
    } finally {
        setShowLoad(false);
    }
};


  return (
    <>
      {showLoad && <>
        <div className="fixed w-screen h-screen bg-white z-50 top-0 left-0">
          <MainLoad title="Saving Your Data wait Asec" />
        </div>
      </>}
      <div className="  py-2 h-full overflow-auto max-md:text-xs">
        <div className="flex justify-between  items-center  sticky top-0 bg-[rgb(241,245,249)]">
          <div className="w-full p-2">
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
    </>
  );
};

export default Onboarding;
