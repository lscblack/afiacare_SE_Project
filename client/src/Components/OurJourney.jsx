import React, { useState } from "react";
import AboutImg from "./../assets/images/AboutImg2.png";
import { HiChevronRight } from "react-icons/hi2";
import { changeLangSate } from "../features/SharedDataSlice/SharedData";
import { useSelector, useDispatch } from "react-redux";
function OurJourney() {

  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState(""); // State to track selected language

  return (
    <div className="flex flex-col md:flex-row px-10 py-5 items-center justify-center bg-[#ffffff]">
    <div className="w-[100%] md:w-[50%]">
      <img src={AboutImg} alt="" />
    </div>
    <div className="w-[100%] md:w-[70%] mt-10 md:mt-0">
      <h2 className="text-4xl text-[#39827a] mb-5">{lang.our_journey_title}</h2>
      <p className="text-gray-500">
        {lang.our_journey_description}
      </p>
      <button className="text-[#39827a] flex items-center mt-5 m-auto md:ml-0 gap-x-2 border rounded-md p-2 hover:bg-[#39827a] hover:text-white duration-300">
        {lang.our_journey_button_text} <HiChevronRight />
      </button>
    </div>
  </div>
  )
}

export default OurJourney
