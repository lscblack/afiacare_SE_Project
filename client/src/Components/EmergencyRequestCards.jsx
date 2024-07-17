import React from 'react';
import { FaAmbulance, FaHandsHelping, FaPhone, FaMedkit } from 'react-icons/fa';

const emergencyRequests = [
  { title: 'Call Ambulance', icon: FaAmbulance },
  { title: 'Emergency Assistance', icon: FaHandsHelping },
  { title: 'Call Emergency Services', icon: FaPhone },
  { title: 'First Aid Kit', icon: FaMedkit },
];

function EmergencyRequestCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 p-6">
      {emergencyRequests.map((request, index) => (
        <div key={index} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
          <request.icon className="text-3xl text-[#39827a] mb-2" />
          <h2 className="text-xl font-semibold text-[#39827a]">{request.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default EmergencyRequestCards;
