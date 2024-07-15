import React from 'react';
import { FaRegQuestionCircle } from "react-icons/fa";

function BMICard() {
  return (
    <div>
      <h1 className=' text-[#39827a] mt-2 font-medium text-[16px] mb-2'>Body Mass Index</h1> 
      <div className='bg-white rounded p-8 cursor-pointer hover:translate-y-[-5px] duration-300'>
        <div className='flex flex-col md:flex-row justify-between gap-2 mb-4'>
          <div className='flex items-center justify-between border h-20 md:w-[50%] rounded-md relative'>
            <p className='text-gray-300 text-2xl'>70</p>
            <p className='text-gray-300 text-2xl'>71</p>
            <div className='flex flex-col items-center relative'>
              <p className='text-[#39827a] text-3xl font-semibold'>72</p>
              <span className='text-gray-500'>kg</span>
              <div className='absolute -top-3 w-full flex justify-center'>
                <div className='bg-[#39827a] h-2 w-2 rounded-full'></div>
              </div>
            </div>
            <p className='text-gray-300 text-2xl'>73</p>
            <p className='text-gray-300 text-2xl'>74</p>
          </div>
          <div className='flex items-center justify-between border h-20 md:w-[50%] rounded-md relative'>
            <p className='text-gray-300 text-2xl'>179</p>
            <div className='flex flex-col items-center relative'>
              <p className='text-[#39827a] text-3xl font-semibold'>180</p>
              <span className='text-gray-500'>cm</span>
              <div className='absolute -top-3 w-full flex justify-center'>
                <div className='bg-[#39827a] h-2 w-2 rounded-full'></div>
              </div>
            </div>
            <p className='text-gray-300 text-2xl'>181</p>
          </div>
        </div>

        <div className='relative h-[5px] bg-gray-200 my-4 '>
          <div className='absolute left-[30%] right-[30%] h-full bg-[#39827a]'></div> {/* Center indicating normal range */}
         <div className=''>
          <p className='text-gray-400 text-[12px] text-center mt-4 flex pt-4 items-center justify-between gap-2'>
          <span>Underweight</span> 
            <div className='flex gap-2'>
              <span>Normal(22.2)</span>
              <span>
                <FaRegQuestionCircle size={14} className='text-gray-500 cursor-pointer' />
              </span>
            </div>
            <span>Overweight</span>
          </p>
         </div>
           
        </div>
        
      </div>
    </div>
  );
}

export default BMICard;
