import React from 'react';
import { FaAmbulance, FaHandsHelping, FaPhone, FaMedkit } from 'react-icons/fa';

const emergencyRequests = [
  { title: 'Call Ambulance', icon: FaAmbulance, description: 'Request Ambulance', btn: 'Call'  },
  { title: 'Emergency Assist', icon: FaHandsHelping, description: 'Request Assist', btn: 'Chat' },
  { title: 'Traffic Accident', icon: FaPhone, description: 'Request Accident', btn: 'Call' },
  { title: 'Report Abuse', icon: FaMedkit, description: 'Call Police to report abuse', btn: 'Call' },
];

function EmergencyRequestCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 p-6">
      {emergencyRequests.map((request, index) => (
        <div key={index} className="flex flex-col items-center p-4 bg-white rounded-lg border-l-8 border-[#39827a]">
          <request.icon className="text-2xl text-[#39827a] mb-2" />
          <h2 className="text-[16px] font-medium text-[#39827a]">{request.title}</h2>
          <p className='text-gray-400 text-[14px] font-normal mb-2'>{request.description}</p>
          <button className='text-[#39827a] text-[14px] border rounded-md py-1 px-2'>{request.btn}</button>
        </div>
      ))}
    </div>
  );
}

export default EmergencyRequestCards;
