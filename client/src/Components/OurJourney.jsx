import React from 'react'
import AboutImg from "./../assets/images/AboutImg2.png";
import { HiChevronRight } from "react-icons/hi2";
function OurJourney() {
  return (
    <div className="flex flex-col md:flex-row px-10 py-5 items-center justify-center bg-[#ffffff]">
    <div className="w-[100%] md:w-[50%]">
      <img src={AboutImg} alt="" />
    </div>
    <div className="w-[100%] md:w-[70%] mt-10 md:mt-0">
      <h2 className="text-4xl text-[#39827a] mb-5">Our Journey</h2>
      <p className="text-gray-500">
      Afiacare was founded in 2024 with the goal of addressing the critical gaps in the healthcare system in Cameroon. Since then, we have worked tirelessly to develop a robust and user-friendly platform that meets the needs of patients, healthcare providers, and donors. Our journey has been one of continuous learning and improvement, and we are proud of the impact we have made so far.
      </p>
      <button className="text-[#39827a] flex items-center mt-5 m-auto md:ml-0 gap-x-2 border rounded-md p-2 hover:bg-[#39827a] hover:text-white duration-300">
        Be part of our journey <HiChevronRight />
      </button>
    </div>
  </div>
  )
}

export default OurJourney
