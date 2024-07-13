import React, { useEffect, useState } from "react";
import AboutImg from "./../assets/images/AboutImg2.png";
import { HiChevronRight } from "react-icons/hi2";
import { useSelector } from "react-redux";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

function Mission() {
  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState(""); // State to track selected language

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations
     
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row px-10 py-5 items-center justify-center bg-[#ffffff]" data-aos="fade-down"> {/* Main container animation */}
      <div className="w-[100%] md:w-[50%]" data-aos="fade-down" data-aos-delay="200"> {/* Image animation */}
        <img src={AboutImg} alt="" />
      </div>
      <div className="w-[100%] md:w-[70%] mt-10 md:mt-0" data-aos="fade-down" data-aos-delay="400"> {/* Text animation */}
        <h2 className="text-4xl text-[#39827a] mb-5">{lang.about_mission_title}</h2>
        <p className="text-gray-500 mb-5">
          {lang.about_mission_description}
        </p>
        <button className="text-[#39827a] flex items-center mt-5 m-auto md:m-0 gap-x-2 border rounded-md p-2 hover:bg-[#39827a] hover:text-white duration-300">
          {lang.about_button_text} <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Mission;
