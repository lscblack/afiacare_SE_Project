import React from 'react'
import { MdBloodtype } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';


function BloodGroupCard() {
  const UserInfo = useSelector(state => state.afiaCare.usersLogin);
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  return (
    <div>
      <h1 className=' text-[#39827a] mt-2 font-medium text-[16px] mb-2'>Blood Research</h1>
      <div className='bg-white rounded  p-4 cursor-pointer hover:translate-y-[-5px] duration-300'>
        <div className='flex justify-between'>
          <div className='flex gap-4 items-center'>
            <MdBloodtype className="text-red-400 bg-red-100 p-1 rounded-full w-8 h-8" size={30} />
            <div>
              <p className='text-gray-400 text-[14px]'>Blood type</p>
              <p className='text-[#39827a]'>{UserInfo.UserInfo.blood_type}  </p>
            </div>

          </div>
          <div>
            <p className='text-gray-400 text-[14px]'>DOB</p>
            <p className='text-[#39827a] font-medium text-[14px] text-right'>{UserInfo.UserInfo.dob}</p>
          </div>

        </div>

        <div className='h-[5px] bg-gray-200 my-4'>
          <div className='w-[55%] h-full bg-[#39827a]'></div>
          <p className='text-gray-400 text-[12px] text-center mt-2 flex m-auto items-center justify-center gap-2'>within normal range <span><FaRegQuestionCircle size={14} className='text-gray-500 cursor-pointer' /></span></p>
        </div>
        <button className='border border-[#39827a] text-[#39827a] p-2 rounded w-full mt-5 hover:bg-[#39827a] hover:text-white duration-300'>{calculateAge(UserInfo.UserInfo.dob)} <span className="text-xs"> Years Old</span></button>
      </div>
    </div>
  )
}

export default BloodGroupCard