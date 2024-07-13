import React, { useEffect, useState } from "react"; // Added useEffect import
import { useSelector } from "react-redux";
import { CiVideoOn } from "react-icons/ci";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

function ContactHero() {
  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState(""); // State to track selected language

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations
    });
  }, []);

  return (
    <div>
      <div className='text-center p-10 overflow-hidden' data-aos="fade-down"> {/* AOS animation */}
        <h2 className='text-[#39827a] text-3xl font-semibold'>
          {lang.contact_hero1} <br /> {lang.contact_hero2}
        </h2>
        <p className='text-gray-500 mt-4'>{lang.contact_text}</p>
        <div className='flex justify-center gap-4'>
          <button className='border border-[#39827a] text-[#39827a] mt-8 gap-2 px-4 py-2 rounded-3xl flex items-center hover:bg-[#39827a]/90 hover:text-white duration-300'>
            <CiVideoOn className='text-xl font-semibold' />
            {lang.contact_action}
          </button>
          <button className='bg-[#39827a] text-white mt-8 px-4 py-2 rounded-3xl flex hover:bg-[#39827a]/90 duration-300'>
            {lang.contact_action2}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactHero;
