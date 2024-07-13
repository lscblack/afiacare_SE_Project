import React, { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaHeartbeat,
  FaVideo,
  FaMobileAlt,
  FaChalkboardTeacher,
  FaChartLine,
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

function OurServices() {
  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState(""); // State to track selected language

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      
    });
  }, []);

  const services = [
    {
      title: lang.services_title_1,
      description: lang.services_description_1,
      icon: <FaClipboardList className="text-3xl mb-2" />,
    },
    {
      title: lang.services_title_2,
      description: lang.services_description_2,
      icon: <FaHeartbeat className="text-3xl mb-2" />,
    },
    {
      title: lang.services_title_3,
      description: lang.services_description_3,
      icon: <FaVideo className="text-3xl mb-2" />,
    },
    {
      title: lang.services_title_4,
      description: lang.services_description_4,
      icon: <FaMobileAlt className="text-3xl mb-2" />,
    },
    {
      title: lang.services_title_5,
      description: lang.services_description_5,
      icon: <FaChalkboardTeacher className="text-3xl mb-2" />,
    },
    {
      title: lang.services_title_6,
      description: lang.services_description_6,
      icon: <FaChartLine className="text-3xl mb-2" />,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-[#39827a] to-[#025e53] p-8">
      <h2 className="text-[#ffffff] text-3xl mb-2 text-center">{lang.our_services_title}</h2>
      <p className="text-white text-lg mb-8 text-center">{lang.our_services_description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index} className="relative border rounded-lg p-6 shadow-sm bg-white"
            data-aos="fade-up" // Add AOS animation for each service
          >
            <div className="text-center mb-4">
              <div className="absolute -mt-12 bg-[#39827a] border border-spacing-2 text-white p-2 rounded-full w-12 h-12 flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#39827a]">{service.title}</h3>
            </div>
            <p className="text-gray-600 text-sm text-justify">{service.description}</p>
          </div>
        ))}
      </div>
      <button className="bg-[#39827a] text-white mt-8 px-4 py-2 rounded flex m-auto items-center hover:bg-[#39827a]/90 duration-300">
        {lang.get_started_button} <IoIosArrowForward />
      </button>
    </div>
  );
}

export default OurServices;
