import React from 'react'
import AboutImg from "./../assets/images/AboutImg.gif";
import { HiChevronRight } from "react-icons/hi2";
function Vision() {
  return (
    <div className="flex flex-col md:flex-row px-20 items-center justify-center">
      <div className="w-[100%] md:w-[70%] mt-10 md:mt-0">
        <h2 className="text-4xl text-[#39827a] mb-5">Our Vision</h2>
        <p className="text-gray-500">
        We envision a healthcare system where every individual has easy access to accurate medical information, timely healthcare services, and seamless communication with healthcare providers. Afiacare aspires to be the leading digital healthcare platform in Cameroon, driving positive change and better health outcomes for all.
        </p>
        <button className="text-[#39827a] bg-white border flex items-center mt-5 justify-start gap-x-2 rounded-md p-2 hover:bg-[#39827a] hover:text-white duration-300">
          Join us <HiChevronRight />
        </button>
      </div>
      <div className="w-[100%] md:w-[50%]">
        <img src={AboutImg} alt="" />
      </div>
    </div>
  )
}

export default Vision
