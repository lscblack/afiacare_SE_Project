import React from 'react';
import { Calendar, theme, Badge } from 'antd';
import RecentActivities from '../RecentActivities';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaUsers } from "react-icons/fa";
import { TbGraphFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";


function AdminDashboard() {

  const [showMenuSmall, setShowMenuSmall] = useState(true)
  //auto
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowMenuSmall(false);
      }else{
        setShowMenuSmall(true);

      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Removed `expanded` from the dependency array

  const navigate = useNavigate();


  const UserInfo = useSelector(state => state.afiaCare.usersLogin);
  const { token } = theme.useToken();
  const wrapperStyle = {
    borderRadius: token.borderRadiusLG,
  };
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  // Event details
  const getListData = (value) => {
    let listData = []; // Specify the type of listData
    switch (value.date()) {
      case 1:
        listData = [
          {
            type: 'warning',
            content: 'System Maintenance',
          },
        ];
        break;
      case 10:
        listData = [
          {
            type: 'warning',
            content: 'User Audit',
          },
        ];
        break;
      case 15:
        listData = [
          {
            type: 'success',
            content: 'Report Generation',
          },
        ];
        break;
      default:
    }
    return listData || [];
  };
  const getMonthData = (value) => {
    if (value.month() === 1) {
      return 1394;
    }
  };

  // Event rendering
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Event</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  const handleCardClick = (path) => {
    navigate(path);
  };
  return (

    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#39827a]">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
      <div className="bg-white p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg cursor-pointer" onClick={() => handleCardClick('/admin/users')}>
          <div>
          <div className='text-[#39827a] bg-slate-100 p-5 rounded-full w-fit m-auto'>
            <FaUsers size={42}  className="m-auto"/>
          </div>
            <h2 className="text-2xl text-center font-semibold bg-slate-100 rounded-full p-5 mt-5 text-gray-500">Users</h2>
          </div>
        </div>

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
            <TbGraphFilled size={42}  className="m-auto"/>
          </div>
            <h2 className="text-2xl text-center font-semibold bg-slate-100 rounded-full p-5 mt-5 text-gray-500">Statistics</h2>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-4 md:flex-row">
        
        <div className='md:w-[50%]'> 
          <div style={wrapperStyle} className='p-4'>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} cellRender={cellRender} />
          </div>
          <div>
            {/* <UserManagement /> */}
          </div>
          <div>
            {/* <SystemStatistics /> */}
          </div>
        </div>
        <div className='md:w-[50%]'>
          <div>
            {/* <ReportsDashboard /> */}
          </div>
          <div>
            <RecentActivities />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
