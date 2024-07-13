import React, { useEffect, useState } from "react"; 
import { useSelector } from "react-redux";
import AboutImg from "../assets/images/AboutImg3.png";
import { MdError } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaMobile } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

function WhyChooseUs() {
  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState("");  
  const reasons = [
    { icon: IoIosCheckmarkCircle, text: lang.WhyReason1 },
    { icon: MdError, text: lang.WhyReason2 },
    { icon: BiSolidDonateHeart, text: lang.WhyReason3 },
    { icon: FaMobile, text: lang.WhyReason4 },
    { icon: BiSupport, text: lang.WhyReason5 },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <div className='bg-[#ffffff] p-8'>
      <div className='flex justify-center gap-40 flex-col lg:flex-row items-center'>
        <div className='md:w-[50%]' data-aos="fade-right"> {/* Add AOS animation */}
          <img src={AboutImg} className='w-[450px] h-[450px] object-cover' alt="About Us" />
        </div>
       
        <div className='md:w-[50%]' data-aos="fade-left"> {/* Add AOS animation */}
          <h2 className='text-[#39827a] text-3xl mb-4'>{lang.WhyTitle}</h2>
          <ul className='space-y-4'>
            {reasons.map((reason, index) => (
              <li key={index} className='flex items-center text-lg text-gray-400' data-aos="zoom-in"> {/* Add AOS animation */}
                <reason.icon className='text-[#39827a] text-2xl mr-3' />
                {reason.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
