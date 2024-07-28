import React from "react";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";
import { TbGraphFilled } from "react-icons/tb";
import RecentActivities from "../RecentActivities";
import Chart from "./LineChart";

const DoctorDashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#39827a]">Doctor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg cursor-pointer">
          <div className="flex items-center">
            <FaCalendarAlt size={24} className="text-blue-500 mr-4" />
            <h2 className="text-xl font-semibold">Appointments</h2>
          </div>
          <p className="text-gray-500 mt-2">View and manage upcoming appointments.</p>
          {/* Add appointment content here */}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg cursor-pointer">
          <div className="flex items-center">
            <FaUsers size={24} className="text-green-500 mr-4" />
            <h2 className="text-xl font-semibold">Patients</h2>
          </div>
          <p className="text-gray-500 mt-2">View and manage patient details.</p>
          {/* Add patient content here */}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg cursor-pointer">
          <div className="flex items-center">
            <TbGraphFilled size={24} className="text-purple-500 mr-4" />
            <h2 className="text-xl font-semibold">Statistics</h2>
          </div>
          <p className="text-gray-500 mt-2">View health statistics and trends.</p>
          {/* Add statistics content here */}
        </div>

      </div>

      <div className="mt-8 flex flex-wrap gap-5">
        <div className="mt-8 w-full md:w-[48%] ">
          <RecentActivities />
        </div>
        <div className="mt-8 md:w-[48%] ">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
