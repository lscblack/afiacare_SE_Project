import React from 'react'
import { FiAlertCircle } from "react-icons/fi";
function UpcomingConsultations() {
  return (
    <div className='px-4 mb-4'>
     
      <div className='bg-white rounded p-4'>
        <p className='text-gray-400 text-[14px] flex items-center gap-2'><FiAlertCircle className='text-red-400' size={20} /> You currently have no upcoming consultations, please check again later!</p>
      </div>
    </div>
  )
}

export default UpcomingConsultations
