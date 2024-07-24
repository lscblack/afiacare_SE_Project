import React from 'react';
import { FaRegQuestionCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';

function BMICard() {
  const UserInfo = useSelector(state => state.afiaCare.usersLogin);

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getWeightStatus = (bmi) => {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'Normal weight';
    } else {
      return 'Overweight';
    }
  };

  // Ensure non-zero values
  const weight = UserInfo.UserInfo.weight > 0 ? 70 : 0;
  const height = UserInfo.UserInfo.height > 0 ? 90 : 1;
  const bmi = calculateBMI(weight, height);
  const weightStatus = getWeightStatus(bmi);

  const generateDecreasingValues = (value, count) => {
    return Array.from({ length: count }, (_, i) => value - i - 1).filter(val => val > 0);
  };

  const weightValues = generateDecreasingValues(weight, 4);
  const heightValues = generateDecreasingValues(height, 3);

  return (
    <div>
      <h1 className=' text-[#39827a] mt-2 font-medium text-[16px] mb-2'>Body Mass Index</h1>
      <div className='bg-white rounded p-4 cursor-pointer hover:translate-y-[-5px] duration-300'>
        <div className='flex flex-col md:flex-row justify-between gap-2 mb-4 '>
          <div className='flex items-center justify-between border h-20 md:w-[50%] p-3 rounded-md relative'>

            {weightValues.length > 0 && weightValues.map((val, index) => (
              <p key={index} className='text-gray-300 text-2xl'>{val}</p>
            ))}
            <div className='flex flex-col items-center relative'>
              <p className='text-[#39827a] text-3xl font-semibold'>{weight}</p>
              <span className='text-gray-500'>kg</span>
              <div className='absolute -top-3 w-full flex justify-center'>
                <div className='bg-[#39827a] h-2 w-2 rounded-full'></div>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between border h-20 md:w-[50%] p-3 rounded-md relative'>
            {heightValues.length > 0 && heightValues.map((val, index) => (
              <p key={index} className='text-gray-300 text-2xl'>{val}</p>
            ))}

            <div className='flex flex-col items-center relative'>
              <p className='text-[#39827a] text-3xl font-semibold'>{height}</p>
              <span className='text-gray-500'>cm</span>
              <div className='absolute -top-3 w-full flex justify-center'>
                <div className='bg-[#39827a] h-2 w-2 rounded-full'></div>
              </div>
            </div>
          </div>
        </div>

        <div className='relative h-[5px] bg-gray-200 my-4'>
          <div className='absolute left-[30%] right-[30%] h-full bg-[#39827a]'></div> {/* Center indicating normal range */}
        </div>
        <div className='flex gap-2 items-center'>
        <p className='text-gray-400 text-[12px] '>BMI: {bmi}</p>
          <FaRegQuestionCircle size={14} className='text-gray-500 cursor-pointer' />
        </div>
        <div className='text-center flex justify-between items-center'>
          <div className='text-gray-400 text-[12px] mt-4 flex items-center justify-between w-full gap-2'>
            <span className={`block ${weightStatus === "Underweight"
              ? "text-orange-500 bg-orange-200 px-2 rounded-full" : ""}`}>
              Underweight
            </span>
            <span className={`block ${weightStatus === "Normal weight"
              ? "text-green-600 bg-green-200 px-2 rounded-full" : ""}`}>
              Normal weight
            </span>
            <span className={`block ${weightStatus === "Overweight"
              ? "text-red-500 bg-red-200 px-2 rounded-full"
              : ""
              }`}>
              Overweight
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BMICard;
