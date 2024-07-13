import React, { useState } from 'react';
import { FaUserMd, FaUser, FaHandHoldingHeart } from 'react-icons/fa';
import { IoIosArrowForward } from "react-icons/io";
import { changeLangSate } from "../features/SharedDataSlice/SharedData";
import { useSelector, useDispatch } from "react-redux";

function GetInvolved() {
  // Assuming you're using English as default language
  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState(""); // State to track selected language

  const involvementOptions = [
    { icon: FaUserMd, title: lang.get_involved_healthcare_providers, description: lang.get_involved_healthcare_description },
    { icon: FaUser, title: lang.get_involved_patients, description: lang.get_involved_patients_description },
    { icon: FaHandHoldingHeart, title: lang.get_involved_donors, description: lang.get_involved_donors_description }
  ];

  return (
    <div className=' p-8'>
      <div className='text-center mb-8'>
        <h2 className='text-[#39827a] text-3xl mb-4'>{lang.get_involved_title}</h2>
        <p className='text-gray-400'>{lang.get_involved_intro}</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {involvementOptions.map((option, index) => (
          <div key={index} className='p-6 border rounded bg-white shadow-sm text-center'>
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

