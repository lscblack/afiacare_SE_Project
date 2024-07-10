import React from 'react';
import AboutImg from "../assets/images/AboutImg3.png";
import { MdError } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaMobile } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";

function WhyChooseUs() {
  const reasons = [
    { icon: IoIosCheckmarkCircle, text: "Streamline healthcare management processes." },
    { icon: MdError, text: " Minimize errors in patient data handling." },
    { icon: BiSolidDonateHeart, text: "Ensure quick and effective donor matching and information sharing." },
    { icon: FaMobile, text: " Accessible via web and mobile applications." },
    { icon: BiSupport, text: " Ongoing training and technical support." }
  ];

  return (
    <div className='bg-[#ffffff] p-8'>
      <div className='flex justify-center gap-40 flex-col lg:flex-row items-center'>
        <div className='md:w-[50%]'>
          <img src={AboutImg} className='w-[450px] h-[450px] object-cover' alt="About Us" />
        </div>
       
        <div className='md:w-[50%]'>
          <h2 className='text-[#39827a] text-3xl mb-4'>Why Choose Us</h2>
          <ul className='space-y-4'>
            {reasons.map((reason, index) => (
              <li key={index} className='flex items-center text-lg text-gray-400'>
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
