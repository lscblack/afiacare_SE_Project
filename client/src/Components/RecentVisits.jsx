import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const visits = [
    { id: 1, description: 'MCEPO Clinic', type: 'Outpatient', date: '13th Jul 2024', status: 'Closed' },
    { id: 2, description: 'Regional Hospital', type: 'Outpatient', date: '13th Jul 2024', status: 'Closed' },
    { id: 3, description: 'PMI', type: 'Outpatient', date: '14th Jul 2024', status: 'Closed' },
    { id: 4, description: 'Hope Foundation training hospital', type: 'Inpatient', date: '20th Jun 2024',  status: 'Closed' },
];
function RecentVisits() {
  return (
    <div>
    <h2 className="text-[#39827a] font-medium text-[16px] mb-2">Recent Visits</h2>
    <div className="p-4 bg-white rounded-lg shadow-sm border-l-8 border-[#39827a]">
      <ul>
        {visits.map((visit) => (
          <li key={visit.id} className="mb-2 flex items-center justify-between">
            <div className="flex justify-between items-center rounded-md border-b border-gray-300 pb-2 w-full cursor-pointer hover:bg-slate-100 hover:translate-y-[-5px] duration-300 px-4">
              <div>
                <div className='flex gap-4 items-center'>
                <h2 className="text-[#39827a]">{visit.description}</h2>
                <p className='text-gray-700 text-[12px] font-medium bg-slate-200 px-2 py-1 rounded w-15 h-7 text-center'>{visit.status}</p>
                </div>
               
                <p className="text-gray-400 text-[14px]">{visit.type} - {visit.date}</p>
              </div>
             
              <FaChevronRight className="text-gray-400 text-[16px]" />
            </div>
         
          </li>
        ))}
      </ul>
      <button className='text-[#39827a] hover:underline underline-offset-4 flex items-center gap-1'>View all <FaChevronRight className="text-[12px]" /> </button>
    </div>
  </div>
  )
}

export default RecentVisits
