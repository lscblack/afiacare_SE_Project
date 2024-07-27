import React, { useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const SystemStatistics = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Dummy statistics data
  const stats = {
    activeUsers: 320,
    recentActivities: 45,
    systemErrors: 2,
  };

  // Chart data and options
  const barData = {
    labels: ['Active Users', 'Recent Activities', 'System Errors'],
    datasets: [
      {
        label: 'Statistics',
        data: [stats.activeUsers, stats.recentActivities, stats.systemErrors],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
        borderColor: ['#388e3c', '#f57c00', '#d32f2f'],
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: ['Active Users', 'Recent Activities', 'System Errors'],
    datasets: [
      {
        data: [stats.activeUsers, stats.recentActivities, stats.systemErrors],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
        borderColor: ['#388e3c', '#f57c00', '#d32f2f'],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 shadow-md rounded">
      <h2 className="text-xl font-semibold mb-6 text-gray-800" data-aos="fade-up">System Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded bg-[#4caf50] text-white" data-aos="fade-right">
          <h3 className="font-semibold text-lg">Active Users</h3>
          <p className="text-2xl">{stats.activeUsers}</p>
        </div>
        <div className="p-6 rounded bg-[#ff9800] text-white" data-aos="fade-left">
          <h3 className="font-semibold text-lg">Recent Activities</h3>
          <p className="text-2xl">{stats.recentActivities}</p>
        </div>
        <div className="p-6 rounded bg-[#f44336] text-white" data-aos="fade-right">
          <h3 className="font-semibold text-lg">System Errors</h3>
          <p className="text-2xl">{stats.systemErrors}</p>
        </div>
        <div className="col-span-1 md:col-span-2" data-aos="zoom-in">
          <Bar data={barData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return context.dataset.label + ': ' + context.raw;
                  },
                },
              },
            },
          }} />
        </div>
        <div className="col-span-1 md:col-span-2" data-aos="zoom-in">
          <Doughnut data={doughnutData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return context.label + ': ' + context.raw;
                  },
                },
              },
            },
          }} />
        </div>
      </div>
    </div>
  );
};

export default SystemStatistics;
