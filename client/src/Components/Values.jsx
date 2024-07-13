import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaLightbulb, FaUniversalAccess, FaShieldAlt, FaHeart, FaHandsHelping } from 'react-icons/fa';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const values = [
  { icon: FaLightbulb, key: 'innovation' },
  { icon: FaUniversalAccess, key: 'accessibility' },
  { icon: FaShieldAlt, key: 'integrity' },
  { icon: FaHeart, key: 'compassion' },
  { icon: FaHandsHelping, key: 'collaboration' }
];

function OurValues() {
  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
     
    });
  }, []);

  return (
    <div className="bg-[#ffffff] p-8">
      <h2 className="text-[#39827a] text-3xl mb-4 text-center">{lang.our_values}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {values.map((value, index) => (
          <div
            key={index} className="flex flex-col items-center p-6 border rounded bg-white shadow-sm"
            data-aos="fade-up" // Add AOS animation
          >
            <value.icon className="text-[#39827a] text-3xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-[#39827a] text-center mt-2 mb-2">{lang[value.key]}</h3>
              <p className="text-gray-500 font-[400] text-[14px] text-center">{lang[`${value.key}_text`]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurValues;
