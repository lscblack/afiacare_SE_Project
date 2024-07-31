import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";
import { TbGraphFilled } from "react-icons/tb";
import RecentActivities from "../RecentActivities";
import Chart from "./LineChart";
import { useNavigate } from "react-router-dom";
import MyApi from "../../AxiosInstance/MyApi";
import { toast } from 'react-toastify';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const handleCardClick = (path) => {
    navigate(path);
  };

  const [data, setData] = useState({
    total_appointments: 0,
    pending_appointments: 0,
    completed_appointments: 0,
    total_records: 0,
    total_patients: 0
  });

  const getDoctorCounts = async () => {
    try {
      const response = await MyApi.get(`/sum/doctor`);
      setData(response.data); // Assuming response.data contains the desired data
    } catch (error) {
      toast.error(error.response?.data?.detail || 'An error occurred');
    }
  };

  useEffect(() => {
    getDoctorCounts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#39827a]">Doctor Dashboard</h1>

      <div className="p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-slate-600 bg-gray-200 p-3 rounded-md ">
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font">Total</h2>
          <p className="text-5xl font-bold">{data.total_appointments}</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font">Pending</h2>
          <p className="text-5xl font-bold">{data.pending_appointments}</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font">Completed</h2>
          <p className="text-5xl font-bold">{data.completed_appointments}</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font">Total Records</h2>
          <p className="text-5xl font-bold">{data.total_records}</p>
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font">Total Patients</h2>
          <p className="text-5xl font-bold">{data.total_patients}</p>
        </div>
      </div>
    </div>

      {/* <div className="mt-8 flex flex-wrap gap-5">
        <div className="mt-8 w-full md:w-[48%] ">
          <RecentActivities />
        </div>
        <div className="mt-8 w-full md:w-[48%] ">
          <Chart />
        </div>
      </div> */}
    </div>
  );
};

export default DoctorDashboard;
