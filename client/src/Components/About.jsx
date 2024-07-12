import React from "react";
import AboutImg from "./../assets/images/AboutImg.gif";
import { HiChevronRight } from "react-icons/hi2";
import {Link}  from 'react-router-dom';
function About() {
  return (
    <div className="flex flex-col md:flex-row px-10 items-center justify-center bg-[#ffffff]">
      <div className="w-[100%] md:w-[70%] mt-10 md:mt-0">
        <h2 className="text-4xl text-[#39827a] mb-5">About us</h2>
        <p className="text-gray-500">
          Afiacare is dedicated to transforming the healthcare system in
          Cameroon. Our comprehensive digital platform addresses key challenges
          such as data mismanagement, donor matching, and information sharing
          between hospitals. We leverage cutting-edge technology to enhance the
          accuracy, efficiency, and accessibility of healthcare services.
        </p>
        <button className="text-[#39827a] flex items-center mt-5 justify-start gap-x-2 border rounded-md p-2 hover:bg-[#39827a] hover:text-white duration-300">
          Discover How <HiChevronRight />
        </button>
        <Link to='/dashboard' className="text-[#39827a] items-center mt-10 justify-start gap-x-2 border rounded-md p-2 hover:bg-[#39827a] hover:text-white duration-300">
          Dashboard
        </Link>
      </div>
      <div className="w-[100%] md:w-[50%]">
        <img src={AboutImg} alt="" />
      </div>
    </div>
  );
}

export default About;
