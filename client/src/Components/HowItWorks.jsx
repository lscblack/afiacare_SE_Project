import React from "react";
import {
  FaLaptopCode,
  FaDatabase,
  FaChalkboardTeacher,
  FaVials,
  FaRocket,
} from "react-icons/fa";
function HowItWorks() {
  return (
    <div className="p-5">
      <h2 className="text-center text-3xl text-[#39827a] mb-2">
        How it works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-5">
        <div className="flex flex-col items-center justify-center flex">
          <FaLaptopCode  size={80} className="bg-[#ffffff] text-[#39827a] p-2 rounded-full border border-l-teal-500" />
          <h2 className="text-[#39827a] font-medium text-xl mb-2">Platform Development</h2>
          <p className="text-gray-400 text-center">
            We build a secure, scalable platform using modern technologies.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center flex">
          <FaDatabase  size={80} className="bg-[#ffffff] text-[#39827a] p-2 rounded-full border border-l-teal-500" />
          <h2 className="text-[#39827a] font-medium text-xl mb-2"> Data Integration</h2>
          <p className="text-gray-400 text-center">Our platform seamlessly integrates with existing hospital management systems.</p>
        </div>
        <div className="flex flex-col items-center justify-center flex">
          <FaChalkboardTeacher
            size={80} className="bg-[#ffffff] text-[#39827a] p-2 rounded-full border border-l-teal-500"
          />
          <h2 className="text-[#39827a] font-medium text-xl mb-2">User Training</h2>
          <p className="text-gray-400 text-center">We provide comprehensive training for healthcare providers and patients.</p>
        </div>
        <div className="flex flex-col items-center justify-center flex">
          <FaVials  size={80} className="bg-[#ffffff] text-[#39827a] p-2 rounded-full border border-l-teal-500" />
          <h2 className="text-[#39827a] font-medium text-xl mb-2">Pilot Testing</h2>
          <p className="text-gray-400 text-center">Conduct pilot tests in selected hospitals to refine the system.</p>
        </div>
        <div className="flex flex-col items-center justify-center flex">
          <FaRocket  size={80} className="bg-[#ffffff] text-[#39827a] p-2 rounded-full border border-l-teal-500" />
          <h2 className="text-[#39827a] font-medium text-xl mb-2">Full Deployment</h2>
          <p className="text-gray-400 text-center">Roll out the platform across Cameroon with ongoing support and updates.</p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
