import React from "react";
import CardItem from "./CardItem";
import {
  FaFileMedicalAlt,
  FaHandshake,
  FaShareAlt,
  FaHeartbeat,
  FaStethoscope,
  FaMoneyCheckAlt,
  FaComments,
} from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi2";
function Card() {
  const CardData = [
    {
      title: "Digital Patient Records",
      description:
        "Accurate and quick access to medical information by digitizing patient records.",
      Icon: FaFileMedicalAlt,
    },
    {
      title: "Donor Matching",
      description:
        "Facilitate quick and easy connection with matching donors in emergencies.",
      Icon: FaHandshake,
    },
    {
      title: "Seamless Data Sharing",
      description:
        "Enable smooth and error-free information exchange between hospitals.",
      Icon: FaShareAlt,
    },
    {
      title: "Health Monitoring",
      description:
        "Monitor patient health and provide timely medical suggestions.",
      Icon: FaHeartbeat,
    },
    {
      title: "Doctor-Patient Consultations",
      description:
        "Improve consultations and follow-ups with robust digital tools.",
      Icon: FaStethoscope,
    },
    {
      title: "Insurance & Finance Management",
      description:
        "Efficiently manage insurance claims and financial transactions.",
      Icon: FaMoneyCheckAlt,
    },
    {
      title: "Community Forums",
      description:
        "Engage in discussions with patients and doctors for better health insights.",
      Icon: FaComments,
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4 text-[#39827a] text-center mb-10">
        Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {CardData.map((item, index) => (
          <div className="p-4 border rounded bg-white shadow-sm" key={index}>
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
        Suggest a feature <HiChevronRight />
      </button>
    </div>
  );
}

export default Card;
