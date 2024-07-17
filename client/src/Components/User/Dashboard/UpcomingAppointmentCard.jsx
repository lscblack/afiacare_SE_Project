import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function UpcomingAppointmentCard({ appointments }) {
  const [visibleIndex, setVisibleIndex] = useState(0);

  const handleToggleUp = () => {
    setVisibleIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleToggleDown = () => {
    setVisibleIndex((prevIndex) => Math.min(prevIndex + 1, appointments.length - 1));
  };

  return (
    <div>
      {appointments.length > 0 && (
        <div>
          <div className=" p-4  mb-4 rounded-lg bg-white border-l-8 border-[#39827a] border-solid">
            <h3 className="font-medium text-[#39827a] text-[15px]">{appointments[visibleIndex].title}</h3>
            <div className='flex justify-between'>
            <p className="text-gray-400 text-[14px]">{appointments[visibleIndex].date}</p>
            <p className="text-gray-400 text-[14px]">{appointments[visibleIndex].time}</p>
            </div>
            <div className='flex justify-between items-center'>
            <p className="text-[#39827a]">{appointments[visibleIndex].description}</p>
            <p className="text-gray-400 text-[14px]">{appointments[visibleIndex].status}</p>
            </div>
          <div className='flex items-center gap-4 mt-2'>
            <button className='border p-1 px-3  text-gray-400 rounded-md hover:bg-[#39827a] hover:text-white hover:border-white hover:border-solid duration-300'>Reschedule</button>
            <button className='bg-[#39827a] text-white p-1 px-3 rounded-md hover:bg-[#368a80] duration-300'>Details</button>
          </div>
          </div>
          <div className="flex justify-start gap-4 mt-4">
            <button
              onClick={handleToggleUp}
              disabled={visibleIndex === 0}
              className="text-xl text-[#39827a] disabled:text-gray-300"
            >
              <FaChevronUp />
            </button>
            <button
              onClick={handleToggleDown}
              disabled={visibleIndex === appointments.length - 1}
              className="text-xl text-[#39827a] disabled:text-gray-300"
            >
              <FaChevronDown />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpcomingAppointmentCard;
