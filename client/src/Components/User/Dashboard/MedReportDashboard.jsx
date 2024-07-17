import React, { useState, useEffect, useRef } from 'react';
import { MdVaccines } from "react-icons/md";
import MedReportCard from './MedReportCard';
import { FaVirusCovid } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";

function MedReportDashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='flex flex-col gap-4 mb-4'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <h2 className='text-[#39827a] font-medium text-[16px]'>Medical Records</h2>
          <p className='text-gray-500 border p-1 rounded-full h-7 w-7 text-[16px] flex items-center justify-center'>4</p>
        </div>
        <div className='relative' ref={dropdownRef}>
          <IoIosMore size={25} className='text-gray-400 cursor-pointer' onClick={toggleDropdown} />
          {dropdownOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10'>
              <div className='p-2 px-4 text-gray-600 cursor-pointer'>
                Action 1
              </div>
              <div className='p-2 px-4 text-gray-600 cursor-pointer'>
                Action 2
              </div>
              <div className='p-2 px-4 text-gray-600 cursor-pointer'>
                Action 3
              </div>
            </div>
          )}
        </div>
      </div>
      <MedReportCard 
        title="Hepatitis B test 04.12.2022" 
        button="Download" 
        Icon={MdVaccines}  
      />
      <MedReportCard 
        title="Covid-19 Vaccination certificate" 
        button="Download" 
        Icon={FaVirusCovid} 
      />
    </div>
  )
}

export default MedReportDashboard;
