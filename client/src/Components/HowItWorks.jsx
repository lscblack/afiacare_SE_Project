import React, { useState } from "react"; // Added useState import
import { useSelector, useDispatch } from "react-redux";
import { changeLangSate } from "../features/SharedDataSlice/SharedData";
import {
  FaLaptopCode,
  FaDatabase,
  FaChalkboardTeacher,
  FaVials,
  FaRocket,
} from "react-icons/fa";
function HowItWorks() {
  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState(""); // State to track selected language 

  const steps = [
    { icon: FaLaptopCode, title: lang.how_it_works_platform_development, description: lang.how_it_works_platform_development_description },
    { icon: FaDatabase, title: lang.how_it_works_data_integration, description: lang.how_it_works_data_integration_description },
    { icon: FaChalkboardTeacher, title: lang.how_it_works_user_training, description: lang.how_it_works_user_training_description },
    { icon: FaVials, title: lang.how_it_works_pilot_testing, description: lang.how_it_works_pilot_testing_description },
    { icon: FaRocket, title: lang.how_it_works_full_deployment, description: lang.how_it_works_full_deployment_description },
  ];
  return (
    <div className="p-5">
      <h2 className="text-center text-3xl text-[#39827a] mb-2">
        {lang.how_it_works_title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-5">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center justify-center flex">
            <step.icon size={80} className="bg-[#ffffff] text-[#39827a] p-2 rounded-full border border-l-teal-500" />
            <h2 className="text-[#39827a] font-medium text-xl mb-2">{step.title}</h2>
            <p className="text-gray-400 text-center">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;