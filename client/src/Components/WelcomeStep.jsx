import React, { useEffect, useState } from "react"; // Added useEffect import
import { useSelector } from "react-redux";
import { changeLangSate } from "../features/SharedDataSlice/SharedData";

function WelcomeStep({ handleNextStep }) {
    const lang = useSelector(state => state.afiaCare.langs);
    const [selectedLang, setSelectedLang] = useState(""); // State to track selected language 

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-2 text-white">{lang.welcomeTitle}</h3>
      <p className="text-white-50 mb-4 text-justify text-[18px]">
           {lang.welcomeParagraph1}
            </p>
            <p className="text-white-50 text-[18px] mb-4 text-justify">
             {lang.welcomeParagraph2}
            </p>
      <button
        onClick={handleNextStep}
        className="mt-4 bg-[#36857b] hover:bg-[#368a80] text-white px-4 py-2 rounded"
      >
        {lang.getStarted}
      </button>
    </div>
  );
}

export default WelcomeStep;
