import React from 'react'
import { IoIosArrowForward } from "react-icons/io";

function GreetingsCard({ greeting, title, message, backgroundImage, BookText }) {
    
  return (
    <div
    className="relative p-6 rounded-lg shadow-md text-white hover:translate-y-[-5px] transition-all duration-300"
    style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
  >
    <div className="relative z-10">
      <h2 className="text-2xl  mb-2">{greeting}</h2>
      <h3 className="text-xl font-medium mb-1">{title}</h3>
      <p className='text-white-50 text-[14px] mb-2 '>{message}</p>
      <button className='flex items-center gap-1'>{BookText}<IoIosArrowForward /></button>
    </div>
  </div>
  )
}

export default GreetingsCard
