import React from "react";
import {
  FaClipboardList,
  FaHeartbeat,
  FaVideo,
  FaMobileAlt,
  FaChalkboardTeacher,
  FaChartLine,
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const services = [
  {
    title: "Healthcare Management System",
    description:
      "Streamline your operations with our user-friendly healthcare management platform. Our system enables efficient patient data handling, appointment scheduling, and medical record management.",
    icon: <FaClipboardList className="text-3xl mb-2" />,
  },
  {
    title: "Donor Matching and Management",
    description:
      "Our advanced donor matching system helps hospitals connect with potential donors quickly and effectively, increasing the likelihood of successful outcomes.",
    icon: <FaHeartbeat className="text-3xl mb-2" />,
  },
  {
    title: "Telemedicine Services",
    description:
      "Access healthcare from the comfort of your home with our telemedicine services. Patients can consult with healthcare professionals via video calls.",
    icon: <FaVideo className="text-3xl mb-2" />,
  },
  {
    title: "Mobile Application",
    description:
      "Stay connected with our mobile application, designed for both patients and healthcare providers, featuring appointment reminders and medication tracking.",
    icon: <FaMobileAlt className="text-3xl mb-2" />,
  },
  {
    title: "Training and Support",
    description:
      "We believe in empowering our users. Our ongoing training sessions and dedicated technical support ensure effective use of our platform.",
    icon: <FaChalkboardTeacher className="text-3xl mb-2" />,
  },
  {
    title: "Research and Analytics",
    description:
      "Gain insights into healthcare trends and performance metrics, helping healthcare providers make informed decisions.",
    icon: <FaChartLine className="text-3xl mb-2" />,
  },
];

function OurServices() {
  return (
    <div className="bg-gradient-to-r from-[#39827a] to-[#025e53] p-8">
      <h2 className="text-[#ffffff] text-3xl mb-2 text-center">Our Services</h2>
      <p className="text-white text-lg mb-8 text-center">
        At Afiacare, we are committed to enhancing the healthcare experience through our innovative digital solutions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index} className="relative border rounded-lg p-6 shadow-sm bg-white"
          >
            <div className="text-center mb-4">
              <div className="absolute -mt-12 bg-[#39827a] border border-spacing-2  text-white p-2 rounded-full w-12 h-12 flex items-center justify-center">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#39827a]">{service.title}</h3>
            </div>
            <p className="text-gray-600 text-sm  text-justify">{service.description}</p>
          </div>
        ))}
      </div>
      <button className="bg-[#39827a] text-white mt-8 px-4 py-2 rounded flex m-auto items-center hover:bg-[#39827a]/90 duration-300">Get Started<IoIosArrowForward /></button>
    </div>
  );
}

export default OurServices;
