import React, { useState, useEffect } from 'react';
import { FaUserMd, FaUser, FaHandHoldingHeart } from 'react-icons/fa';
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

function GetInvolved() {
  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState("");

  const involvementOptions = [
    { icon: FaUserMd, title: lang.get_involved_healthcare_providers, description: lang.get_involved_healthcare_description },
    { icon: FaUser, title: lang.get_involved_patients, description: lang.get_involved_patients_description },
    { icon: FaHandHoldingHeart, title: lang.get_involved_donors, description: lang.get_involved_donors_description }
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations
      once: false, // Animation should happen every time
    });
  }, []);

  return (
    <div className='p-8' data-aos="fade-up"> {/* Main container animation */}
      <div className='text-center mb-8'>
        <h2 className='text-[#39827a] text-3xl mb-4'>{lang.get_involved_title}</h2>
        <p className='text-gray-400'>{lang.get_involved_intro}</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {involvementOptions.map((option, index) => (
          <div key={index} className='p-6 border rounded bg-white shadow-sm text-center' data-aos="fade-up" data-aos-delay={`${index * 100}`}> {/* Individual element animation */}
            <option.icon className='p-1 text-4xl mb-4 m-auto bg-slate-400 rounded-full' />
            <h3 className='text-xl font-semibold mb-2 text-[#39827a]'>{option.title}</h3>
            <p className='text-gray-400'>{option.description}</p>
          </div>
        ))}
      </div>
      <button className='bg-[#39827a] text-white mt-8 px-4 py-2 rounded flex m-auto items-center hover:bg-[#39827a]/90 duration-300'>
        {lang.get_involved_button} <IoIosArrowForward />
      </button>
    </div>
  );
}

export default GetInvolved;
