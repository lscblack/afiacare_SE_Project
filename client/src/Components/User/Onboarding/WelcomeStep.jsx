import React, { useEffect, useState } from "react"; // Added useEffect import
import { useSelector } from "react-redux";
import WelcomeImg from "../../../assets/images/WelcomeImg.png";
import { IoIosArrowForward } from "react-icons/io";
import { changeLangSate } from "../../../features/SharedDataSlice/SharedData";

function WelcomeStep({ handleNextStep }) {
    const lang = useSelector(state => state.afiaCare.langs);
    const [selectedLang, setSelectedLang] = useState(""); // State to track selected language 

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-md p-4">
      <div className="w-[100%] md:w-[30%]">
        <img src={WelcomeImg} alt="Welcome Image" className="w-[100%]" />
      </div>
      <div className="w-[100%] md:w-[60%]">
      <h3 className="text-xl font-medium mb-2 text-[#36857b]">{lang.welcomeTitle}</h3>
      <p className="text-white-50 mb-4 text-justify text-[18px] text-gray-500">
           {lang.welcomeParagraph1}
            </p>
            <p className="text-white-50 text-[18px] mb-4 text-justify text-gray-500">
             {lang.welcomeParagraph2}
            </p>
      <button
        onClick={handleNextStep}
        className="mt-4 bg-[#36857b] hover:bg-[#368a80] text-white px-4 py-2 rounded flex items-center gap-1"
      >
        {lang.getStarted}
        <IoIosArrowForward />
      </button>
      </div>
   
    </div>
  );
}

export default WelcomeStep;
