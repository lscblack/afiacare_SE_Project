import React from 'react';
import { FaRegQuestionCircle } from "react-icons/fa";

function BMICard() {
  return (
    <div>
      <h1 className='text-xl text-[#39827a] mt-2 font-medium text-[17px] mb-2'>BMI Research</h1> 
      <div className='bg-white rounded p-4 cursor-pointer hover:translate-y-[-5px] duration-300'>
        <div className='flex justify-between mb-4'>
          <div className='flex flex-col items-center'>
            <p className='text-gray-400 text-[14px]'>Weight (kg)</p>
            <div className='relative'>
              <p className='text-[#39827a] font-medium text-[20px]'>70</p>
              <div className='absolute top-0 left-0 opacity-20'>65</div>
              <div className='absolute top-0 right-0 opacity-20'>90</div>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <p className='text-gray-400 text-[14px]'>Height (cm)</p>
            <div className='relative'>
              <p className='text-[#39827a] font-medium text-[20px]'>175</p>
              <div className='absolute top-0 left-0 opacity-20'>160</div>
              <div className='absolute top-0 right-0 opacity-20'>200</div>
            </div>
          </div>
        </div>

        <div className='h-[5px] bg-gray-200 my-4'>
          <div className='w-[60%] h-full bg-[#39827a]'></div> {/* Adjust percentage based on BMI */}
          <p className='text-gray-400 text-[12px] text-center mt-2 flex m-auto items-center justify-center gap-2'>
            within normal range 
            <span>
              <FaRegQuestionCircle size={14} className='text-gray-500 cursor-pointer' />
            </span>
          </p>
        </div>
        
        <button className='border border-[#39827a] text-[#39827a] p-2 rounded w-full mt-5 hover:bg-[#39827a] hover:text-white duration-300'>
          Details
        </button>
      </div>
    </div>
  )
}

export default BMICard;
