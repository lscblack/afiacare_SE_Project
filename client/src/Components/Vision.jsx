import React, { useEffect, useState } from "react"; 
import { useSelector } from "react-redux";
import AboutImg from "./../assets/images/AboutImg.gif";
import { HiChevronRight } from "react-icons/hi2";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

function Vision() {
  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
    
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row px-20 items-center justify-center">
      <div className="w-[100%] md:w-[70%] mt-10 md:mt-0 overflow-hidden" data-aos="fade-down"> {/* Add AOS animation */}
        <h2 className="text-4xl text-[#39827a] mb-5">{lang.our_vision}</h2>
        <p className="text-gray-500">
          {lang.vision_text}
        </p>
        <button className="text-[#39827a] bg-white border flex items-center mt-5 justify-start gap-x-2 rounded-md p-2 hover:bg-[#39827a] hover:text-white duration-300">
          {lang.join_us} <HiChevronRight />
        </button>
      </div>
      <div className="w-[100%] md:w-[50%]" data-aos="zoom-in"> {/* Add AOS animation */}
        <img src={AboutImg} alt="" />
      </div>
    </div>
  )
}

export default Vision;
