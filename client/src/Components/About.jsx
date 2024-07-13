import React, { useEffect, useState } from "react"; // Added useEffect import
import { useSelector } from "react-redux";
import AboutImg from "./../assets/images/AboutImg.gif";
import { HiChevronRight } from "react-icons/hi2";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations
    });
  }, []);

  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState(""); // State to track selected language

  return (
    <div className="flex flex-col md:flex-row px-10 items-center justify-center bg-[#ffffff] overflow-hidden">
      <div className="w-[100%] md:w-[70%] mt-10 md:mt-0">
        <h2 className="text-4xl text-[#39827a] mb-5" data-aos="fade-up">
          {lang.about_us}
        </h2>
        <p className="text-gray-500" data-aos="fade-up">
          {lang.heroparagraph}
        </p>
        <button className="text-[#39827a] flex items-center mt-5 justify-start gap-x-2 border rounded-md p-2 hover:bg-[#39827a] hover:text-white duration-300" data-aos="fade-up">
          {lang.discoverButton} <HiChevronRight />
        </button>
      </div>
      <div className="w-[100%] md:w-[50%]" data-aos="fade-left">
        <img src={AboutImg} alt="About Image" />
      </div>
    </div>
  );
}

export default About;
