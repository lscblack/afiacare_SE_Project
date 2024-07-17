import React from 'react';

const FacilityCard = ({ icon, title, onClick }) => {
  return (
    <div
      className="flex items-center p-4 bg-white rounded-lg text-center cursor-pointer hover:translate-y-[-5px] duration-300"
      onClick={onClick}
    >
      <div className='flex items-center gap-4'>
        <div className='text-[#39827a] bg-slate-100 p-2 rounded-full'>{icon}</div>
        <h3 className="text-[16px] font-medium text-[#39827a]">{title}</h3>
      </div>
    </div>
  );
};

export default FacilityCard;
