import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLangSate } from "../features/SharedDataSlice/SharedData";
import { HiChevronRight } from "react-icons/hi2";
import {
  FaFileMedicalAlt,
  FaHandshake,
  FaShareAlt,
  FaHeartbeat,
  FaStethoscope,
  FaMoneyCheckAlt,
  FaComments,
} from "react-icons/fa";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

function Card() {
  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState("");
  const CardData = [
    {
      title: lang.records_text,
      description: lang.description1,
      Icon: FaFileMedicalAlt,
    },
    {
      title: lang.donor_text,
      description: lang.description2,
      Icon: FaHandshake,
    },
    {
      title: lang.sharing_text,
      description: lang.description3,
      Icon: FaShareAlt,
    },
    {
      title: lang.monitoring_text,
      description: lang.description4,
      Icon: FaHeartbeat,
    },
    {
      title: lang.doctor_text,
      description: lang.description5,
      Icon: FaStethoscope,
    },
    {
      title: lang.insurance_text,
      description: lang.description6,
      Icon: FaMoneyCheckAlt,
    },
    {
      title: lang.forum_text,
      description: lang.description7,
      Icon: FaComments,
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <div className="p-8 h-screen">
      <h2 className="text-3xl font-bold  text-[#39827a] text-center mb-10">
        {lang.card_title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {CardData.map((item, index) => (
          <div className="p-4 border rounded bg-white shadow-sm"
            key={index}
            data-aos="fade-up" // Add AOS animation
          >
            <div className="flex items-center mb-2">
              <item.Icon className="text-[#39827a] border p-1 rounded-full text-4xl mr-2" />
              <h3 className="text-lg font-semibold text-[#39827a]">
                {item.title}
              </h3>
            </div>
            <p className="text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
      <button className="bg-[#39827a] text-white p-2 rounded mt-10 flex m-auto items-center gap-x-1 hover:bg-[#39827a]/90">
        {lang.SuggestButton} <HiChevronRight />
      </button>
    </div>
  );
}

export default Card;
