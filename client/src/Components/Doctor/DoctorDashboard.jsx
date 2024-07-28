import React from "react";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";
import { TbGraphFilled } from "react-icons/tb";
import RecentActivities from "../RecentActivities";
import Chart from "./LineChart";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const handleCardClick = (path) => {
    navigate(path);
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#39827a]">Doctor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg cursor-pointer" onClick={() => handleCardClick('/doctor/appointments')}>
          <div className="flex items-center">
          <div className='text-[#39827a] bg-slate-100 p-2 rounded-full'>
            <FaCalendarAlt size={24}  />
          </div>
            <h2 className="text-xl font-semibold">Appointments</h2>
          </div>
          <p className="text-gray-500 mt-2">View and manage upcoming appointments.</p>
          {/* Add appointment content here */}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg cursor-pointer">
          <div className="flex items-center">
          <div className='text-[#39827a] bg-slate-100 p-2 rounded-full '>
            <FaUsers size={24}  />
          </div>
            <h2 className="text-xl font-semibold">Patients</h2>
          </div>
          <p className="text-gray-500 mt-2">View and manage patient details.</p>
          {/* Add patient content here */}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg cursor-pointer">
          <div className="flex items-center">
          <div className='text-[#39827a] bg-slate-100 p-2 rounded-full '>
            <TbGraphFilled size={24} className="" />
          </div>
            <h2 className="text-xl font-semibold">Statistics</h2>
          </div>
          <p className="text-gray-500 mt-2">View health statistics and trends.</p>
           <h2 className="text-2xl font-semibold text-[#39827a]">34%</h2>
        </div>

      </div>

      <div className="mt-8 flex flex-wrap gap-5">
        <div className="mt-8 w-full md:w-[48%] ">
          <RecentActivities />
        </div>
        <div className="mt-8 w-full md:w-[48%] ">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
