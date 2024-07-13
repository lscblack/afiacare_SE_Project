import React, { useState } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { changeLangSate } from "../features/SharedDataSlice/SharedData";
import AboutImg from "./../assets/images/WhoWeAre.png";
import { HiChevronRight } from "react-icons/hi2";

function WhoWeAre() {
  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState("");
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${AboutImg})` }}>
    <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay */}
    <div className="relative w-[100%] md:w-[90%] mt-10 md:mt-0 p-10 text-white">
      <h2 className="text-4xl font-semibold text-white mb-5">{lang.who_we_are}</h2>
      <p className="text-white text-lg font-normal">
        {lang.description}
      </p>
      <button className="bg-[#39827a] flex items-center mt-5 justify-start gap-x-2 border rounded-md p-2 hover:bg-[#fff] hover:text-[#39827a] duration-300">
        {lang.discover_us} <HiChevronRight />
      </button>
    </div>
  </div>
  );
}

export default WhoWeAre;
