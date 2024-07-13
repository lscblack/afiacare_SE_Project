import React, { useEffect, useState } from "react"; 
import { useSelector } from "react-redux";
import AboutImg from "./../assets/images/WhoWeAre.png";
import { HiChevronRight } from "react-icons/hi2";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

function WhoWeAre() {
  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <div 
      className="relative flex flex-col md:flex-row items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: `url(${AboutImg})` }}
      data-aos="fade-up" // Add AOS animation
    >
      <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay */}
      <div className="relative w-[100%] md:w-[90%] mt-10 md:mt-0 p-10 text-white" data-aos="fade-up"> {/* Add AOS animation */}
        <h2 className="text-4xl font-semibold mb-5">{lang.who_we_are}</h2>
        <p className="text-lg font-normal">
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
