import React from 'react';
import { IoIosArrowForward } from "react-icons/io";

function WellnessCard({ CardImg, ExamText, description, buttonText }) {
  return (
    <div className="flex flex-col md:flex-row items-center p-4 md:p-6 bg-white rounded-lg  hover:translate-y-[-5px] transition-all duration-300">
      <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-4">
        <img src={CardImg} alt="" className="w-full h-auto rounded-md object-cover" />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <div>
          <h2 className="text-[18px] text-gray-500 font-medium mb-2">{ExamText}</h2>
          <p className="text-gray-400 mb-2">{description}</p>
        </div>
        <button className="self-start flex items-center gap-1 text-[#39827a] font-medium">
          {buttonText}
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}

export default WellnessCard;
