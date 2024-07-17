import React from 'react';
import MetricCard from './MetricCard';
import { FaHeartbeat, FaLungs, FaTachometerAlt } from 'react-icons/fa';
import 'chart.js/auto';
import { IoIosArrowForward } from "react-icons/io";


const heartRateData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Heart Rate',
      data: [72, 75, 78, 76, 74, 73, 77],
      borderColor: '#00b6b2',
      fill: false,
    },
  ],
};

const respiratoryRateData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Respiratory Rate',
      data: [16, 18, 17, 16, 17, 18, 19],
      borderColor: '#fd5a19',
      fill: false,
    },
  ],
};

const bpData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Blood Pressure',
      data: [120, 122, 118, 119, 121, 123, 120],
      borderColor: '#fb6793',
      fill: false,
    },
  ],
};

function PhysicalOverview() {
  return (

        <div className='pt-3'>
            <div className='flex justify-between'>
                <h1 className='text-[#39827a] font-medium text-[16px]'>Physical Overview</h1>
                <button className='text-[#39827a] font-medium text-[14px] flex items-center gap-1'>View Report<IoIosArrowForward /></button>
            </div>
        <div className="flex flex-col p-3 gap-2">
            <MetricCard
                icon={FaHeartbeat}
                title="Heart Rate"
                value="72 bpm"
                graphData={heartRateData}
            />
            <MetricCard
                icon={FaLungs}
                title="Respiratory Rate"
                value="89-100 bpm"
                graphData={respiratoryRateData}
            />
            <MetricCard
                icon={FaTachometerAlt}
                title="Blood Pressure"
                value="120/80 mmHg"
                graphData={bpData}
            />
            </div>
        </div>
        
  );
}

export default PhysicalOverview;
