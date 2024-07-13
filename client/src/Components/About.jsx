import React, { useState } from "react"; // Added useState import
import { useSelector, useDispatch } from "react-redux";
import AboutImg from "./../assets/images/AboutImg.gif";
import { HiChevronRight } from "react-icons/hi2";
import { changeLangSate } from "../features/SharedDataSlice/SharedData";

function About() {
  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState(""); // State to track selected language

  return (
    <div className="flex flex-col md:flex-row px-10 items-center justify-center bg-[#ffffff]">
      <div className="w-[100%] md:w-[70%] mt-10 md:mt-0">
        <h2 className="text-4xl text-[#39827a] mb-5">{lang.about_us}</h2>
        <p className="text-gray-500">
          {lang.heroparagraph}
        </p>
        <button className="text-[#39827a] flex items-center mt-5 justify-start gap-x-2 border rounded-md p-2 hover:bg-[#39827a] hover:text-white duration-300">
          {lang.discoverButton} <HiChevronRight />
        </button>
      </div>
      <div className="w-[100%] md:w-[50%]">
        <img src={AboutImg} alt="About Image" />
      </div>
    </div>
  );
}

export default About;
