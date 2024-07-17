import React from 'react';
import { Line } from 'react-chartjs-2';
import { FaHeartbeat, FaLungs, FaTachometerAlt } from 'react-icons/fa';

function MetricCard({ icon: Icon, title, value, graphData }) {
  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="flex items-center p-4 bg-white rounded-lg border hover:translate-y-[-5px] duration-300">
      <Icon className="text-4xl text-[#39827a] mr-4 bg-slate-200 p-1 rounded-md" />
      <div className="flex-1">
        <h2 className="text-[14px] font-medium text-gray-500">{title}</h2>
        <p className="text-gray-600 mt-1 text-[16px] font-semibold">{value}</p>
      </div>
      <div className="w-1/3 h-14">
        <Line data={graphData} options={options}  />
      </div>
    </div>
  );
}

export default MetricCard;
