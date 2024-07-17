import React from 'react';
import { Button, Input, Select } from 'antd';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from 'react-icons/fa';

const FacilityDrawerContent = ({ facilities, loading }) => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <Input.Search placeholder="Search facilities" style={{ width: '70%' }} />
        <Select placeholder="Select location" style={{ width: '28%' }}>
          <Select.Option value="location1">Location 1</Select.Option>
          <Select.Option value="location2">Location 2</Select.Option>
          <Select.Option value="location3">Location 3</Select.Option>
        </Select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        facilities.map((facility, index) => (
          <div key={index} className="mb-4 border p-4 rounded-md">
            <div className='flex items-center justify-between mb-2'>
              <h2 className="text-[#39827a] font-medium text-[16px]">{facility.name}</h2>
              <p className='text-[#39827a] font-medium text-[12px] bg-slate-100 px-2 py-1 rounded flex items-center gap-2'>  <FaClock size={12} />{facility.hours}</p>
            </div>
            <div className="flex items-center justify-between gap-2 text-gray-400 font-normal mb-4">
                <div className='flex items-center gap-2'>
                <FaMapMarkerAlt size={14} />
                <span> {facility.location}</span>
                </div>
                <div>
                    <p className='text-gray-400 text-[12px] bg-slate-100 p-1 rounded'>{facility.distance}</p>
                </div>
             
            </div>
    
            <div className="flex justify-between mt-2">
              <button className='border p-1 px-3 flex items-center gap-2  text-gray-400 rounded-md hover:bg-[#39827a] hover:text-white hover:border-white hover:border-solid duration-300'  onClick={() => window.open(`tel:${facility.contact}`)}><FaPhoneAlt /> Call</button>
              <button onClick={() => window.open(facility.mapUrl)} className='flex items-center gap-2 text-[#39827a] font-medium'><FaMapMarkerAlt /> Open in Maps</button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default FacilityDrawerContent;
