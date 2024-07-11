import React from 'react'
import { CiVideoOn } from "react-icons/ci";

function ContactHero() {
  return (
    <div>
      <div className='text-center p-10'>
        <h2 className='text-[#39827a] text-3xl font-semibold'>We've got an entire team dedicated to supporting you<br></br> every step of your health journey.</h2>
        <p className='text-gray-500 mt-4'>Get help 24/7 with our award-winning support network</p>
        <div className='flex justify-center gap-4'>
          <button className='border border-[#39827a] text-[#39827a] mt-8 gap-2 px-4 py-2 rounded-3xl flex items-center  hover:bg-[#39827a]/90 hover:text-white duration-300'><CiVideoOn className='text-xl font-semibold' /> Book a call </button>
          <button className='bg-[#39827a] text-white mt-8 px-4 py-2 rounded-3xl flex  hover:bg-[#39827a]/90 duration-300'>Get in touch</button>
        </div>
      </div>
    </div>
  )
}

export default ContactHero
