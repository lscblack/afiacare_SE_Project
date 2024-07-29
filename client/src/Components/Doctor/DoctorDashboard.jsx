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
          <div className="">
          <div className='text-[#39827a] bg-slate-100 p-5 rounded-full w-fit m-auto'>
            <FaCalendarAlt size={42}  className="m-auto"/>
          </div>
            <h2 className="text-2xl text-center font-semibold bg-slate-100 rounded-full p-5 mt-5 text-gray-500">Appointments</h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg cursor-pointer" onClick={() => handleCardClick('/doctor/appointments')}>
          <div className="">
          <div className='text-[#39827a] bg-slate-100 p-5 rounded-full w-fit m-auto'>
            <FaUsers size={42}  className="m-auto"/>
          </div>
            <h2 className="text-2xl text-center font-semibold bg-slate-100 rounded-full p-5 mt-5 text-gray-500">Patients</h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg cursor-pointer" onClick={() => handleCardClick('/doctor/appointments')}>
          <div className="">
          <div className='text-[#39827a] bg-slate-100 p-5 rounded-full w-fit m-auto'>
            <TbGraphFilled size={42}  className="m-auto"/>
          </div>
            <h2 className="text-2xl text-center font-semibold bg-slate-100 rounded-full p-5 mt-5 text-gray-500">Statistics</h2>
          </div>
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
