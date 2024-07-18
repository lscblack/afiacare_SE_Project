import React from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { Carousel } from 'antd';
import { FaHospital, FaClinicMedical, FaSyringe, FaTooth, FaUserMd, FaHeartbeat, FaAmbulance,} from 'react-icons/fa';
import { MdOutlineAddLocation } from "react-icons/md";

const facilities = {
  Hospitals: [
    { name: 'City Hospital', location: '123 Main St, City', contact: '+1 234 567 890', hours: '9 AM - 5 PM', mapUrl: 'https://maps.google.com?q=123+Main+St', icon: <FaHospital size={24} /> },
    { name: 'County Hospital', location: '456 Elm St, County', contact: '+1 234 567 891', hours: '8 AM - 6 PM', mapUrl: 'https://maps.google.com?q=456+Elm+St', icon: <FaHospital size={24} /> }
  ],
  'Independent Clinic': [
    { name: 'Health Clinic', location: '789 Oak St, City', contact: '+1 234 567 892', hours: '10 AM - 4 PM', mapUrl: 'https://maps.google.com?q=789+Oak+St', icon: <FaClinicMedical size={24} /> },
    { name: 'Wellness Clinic', location: '101 Pine St, County', contact: '+1 234 567 893', hours: '9 AM - 3 PM', mapUrl: 'https://maps.google.com?q=101+Pine+St', icon: <FaClinicMedical size={24} /> }
  ],
  Diagnostic: [
    { name: 'Diagnostic Center', location: '102 Maple St, City', contact: '+1 234 567 894', hours: '8 AM - 4 PM', mapUrl: 'https://maps.google.com?q=102+Maple+St', icon: <FaSyringe size={24} /> },
    { name: 'Lab Services', location: '103 Cedar St, County', contact: '+1 234 567 895', hours: '7 AM - 5 PM', mapUrl: 'https://maps.google.com?q=103+Cedar+St', icon: <FaSyringe size={24} /> }
  ],
  Pharmacy: [
    { name: 'City Pharmacy', location: '104 Birch St, City', contact: '+1 234 567 896', hours: '9 AM - 8 PM', mapUrl: 'https://maps.google.com?q=104+Birch+St', icon: <FaUserMd size={24} /> },
    { name: 'County Pharmacy', location: '105 Walnut St, County', contact: '+1 234 567 897', hours: '8 AM - 9 PM', mapUrl: 'https://maps.google.com?q=105+Walnut+St', icon: <FaUserMd size={24} /> }
  ],
  'Dental Clinic': [
    { name: 'Smile Dental', location: '106 Ash St, City', contact: '+1 234 567 898', hours: '9 AM - 5 PM', mapUrl: 'https://maps.google.com?q=106+Ash+St', icon: <FaTooth size={24} /> },
    { name: 'Bright Dental', location: '107 Pine St, County', contact: '+1 234 567 899', hours: '8 AM - 4 PM', mapUrl: 'https://maps.google.com?q=107+Pine+St', icon: <FaTooth size={24} /> }
  ],
  'Specialized Services': [
    { name: 'Cardiology Center', location: '108 Chestnut St, City', contact: '+1 234 567 900', hours: '9 AM - 6 PM', mapUrl: 'https://maps.google.com?q=108+Chestnut+St', icon: <FaHeartbeat size={24} /> },
    { name: 'Orthopedic Center', location: '109 Hickory St, County', contact: '+1 234 567 901', hours: '8 AM - 5 PM', mapUrl: 'https://maps.google.com?q=109+Hickory+St', icon: <FaHeartbeat size={24} /> }
  ],
  'Dialysis Center': [
    { name: 'Dialysis Center 1', location: '110 Spruce St, City', contact: '+1 234 567 902', hours: '7 AM - 7 PM', mapUrl: 'https://maps.google.com?q=110+Spruce+St', icon: <FaAmbulance size={24} /> },
    { name: 'Dialysis Center 2', location: '111 Fir St, County', contact: '+1 234 567 903', hours: '6 AM - 6 PM', mapUrl: 'https://maps.google.com?q=111+Fir+St', icon: <FaAmbulance size={24} /> }
  ],
  'Evacuation Services': [
    { name: 'Evacuation Services 1', location: '112 Redwood St, City', contact: '+1 234 567 904', hours: '24/7', mapUrl: 'https://maps.google.com?q=112+Redwood+St', icon: <FaAmbulance size={24} /> },
    { name: 'Evacuation Services 2', location: '113 Cypress St, County', contact: '+1 234 567 905', hours: '24/7', mapUrl: 'https://maps.google.com?q=113+Cypress+St', icon: <FaAmbulance size={24} /> }
  ]
};

// Helper function to chunk the facilities array
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

function RecommendedFacilities() {
  const allFacilities = Object.values(facilities).flat();
  const chunkedFacilities = chunkArray(allFacilities, 4);

  return (
    <div>
        <h1 className='text-gray-500 font-medium text-[16px] p-6'>Recommended Facilities</h1>
      <Carousel arrows autoplay>
        {chunkedFacilities.map((chunk, chunkIndex) => (
          <div key={chunkIndex}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 px-6">
              {chunk.map((facility, index) => (
                <div 
                  key={index} 
                  className="flex flex-col rounded-lg border-r-8 border-[#39827a] border-solid cursor-pointer overflow-hidden bg-white transform hover:scale-105 duration-300"
                >
                  <div className=" p-4">
                    <div className='flex items-center gap-2'>
                    <div className="text-[#39827a] bg-slate-100 p-2 rounded-full">
                      {facility.icon}
                    </div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">{facility.name}</h2>
                    </div>
                   
                    <div className="ml-4">
                     
                      <p className="text-sm text-gray-400 font-normal flex items-center gap-1"><MdOutlineAddLocation /> {facility.location}</p>
                      <div className=''>
                      <p className="text-sm text-gray-600 bg-slate-100 px-1 rounded w-[60%] mb-2"> {facility.contact}</p>
                      <p className="text-sm text-gray-600">{facility.hours}</p>
                      </div>
                   
                      <button 
                        className="text-[#39827a] font-medium flex items-center gap-2 mt-2"
                        onClick={() => window.open(facility.mapUrl, '_blank')}
                      >
                        Open in Maps <IoIosArrowForward />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default RecommendedFacilities;
