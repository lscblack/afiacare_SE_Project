import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const activities = [
  { id: 1, description: 'Appointment with Dr. Smith', date: '2024-07-14', time: '10:00 AM' },
  { id: 2, description: 'Blood donation at City Center', date: '2024-07-15', time: '2:00 PM' },
  { id: 3, description: 'Therapy session', date: '2024-07-16', time: '1:00 PM' },
];

function RecentActivities() {
  return (
    <div>
      <h2 className="text-[#39827a] font-medium text-[16px] mb-2">Recent Activities</h2>
      <div className="p-4 bg-white rounded-lg shadow-sm border-l-8 border-[#39827a]">
        <ul>
          {activities.map((activity) => (
            <li key={activity.id} className="mb-2 flex items-center justify-between">
              <div className="flex justify-between items-center rounded-md border-b border-gray-300 pb-2 w-full cursor-pointer hover:bg-slate-100 hover:translate-y-[-5px] duration-300 px-4">
                <div>
                  <h2 className="text-[#39827a]">{activity.description}</h2>
                  <p className="text-gray-400 text-[14px]">{activity.date} - {activity.time}</p>
                </div>
               
                <FaChevronRight className="text-gray-400 text-[16px]" />
              </div>
           
            </li>
          ))}
        </ul>
        <button className='text-[#39827a] hover:underline underline-offset-4 flex items-center gap-1'>View all <FaChevronRight className="text-[12px]" /> </button>
      </div>
    </div>
  );
}

export default RecentActivities;
