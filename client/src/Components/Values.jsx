import React from 'react';
import { FaLightbulb, FaUniversalAccess, FaShieldAlt, FaHeart, FaHandsHelping } from 'react-icons/fa';

const values = [
  { icon: FaLightbulb, title: "Innovation", text: "We embrace cutting-edge technology to provide innovative solutions that address the unique challenges of the healthcare system." },
  { icon: FaUniversalAccess, title: "Accessibility", text: "We are committed to making healthcare services accessible to everyone, regardless of their location or background." },
  { icon: FaShieldAlt, title: "Integrity", text: "We uphold the highest standards of integrity in all our operations, ensuring transparency, accountability, and ethical practices." },
  { icon: FaHeart, title: "Compassion", text: "We prioritize the well-being of our users and are dedicated to providing compassionate and patient-centered care." },
  { icon: FaHandsHelping, title: "Collaboration", text: "We believe in the power of collaboration and work closely with healthcare providers, patients, and donors to achieve our mission." }
];

function OurValues() {
  return (
    <div className="bg-[#ffffff] p-8">
      <h2 className="text-[#39827a] text-3xl mb-4 text-center">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {values.map((value, index) => (
          <div key={index} className="flex flex-col items-center p-6 border rounded bg-white shadow-sm">
            <value.icon className="text-[#39827a] text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-[#39827a] text-center mt-2 mb-2">{value.title}</h3>
              <p className="text-gray-500 font-[400] text-[14px] text-center">{value.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurValues;
