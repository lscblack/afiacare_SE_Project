import React from 'react'

function MedReportCard( {title, button, Icon}) {
  return (
    <div className='flex justify-between items-center bg-white p-2 px-4 rounded'>
        <div className='flex gap-4 items-center'>
        <Icon className='text-[#39827a]'/>
        <h2 className='text-gray-400 font-normal'>{title}</h2>
        </div>
      <button className='text-[#39827a] font-medium hover:text-[#368a80]'>{button}</button>
    </div>
  )
}

export default MedReportCard
