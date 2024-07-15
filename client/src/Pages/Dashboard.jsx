import React from 'react';
import Sidebar, { SidebarItem } from '../Components/Sidebar';
import Navbar from '../Components/Navbar'; // Import your Navbar component
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdForum } from "react-icons/md";
import { FaHospitalUser } from "react-icons/fa6";
import { GrEmergency } from "react-icons/gr";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaHospitalAlt } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";
import { SiFigshare } from "react-icons/si";
import BookingDashboard from '../Components/BookingDashBoard';
import BloodGroupCard from '../Components/BloodGroupCard';
import BMICard from '../Components/BMICard';
import MedReportDashboard from '../Components/MedReportDashboard';
import { Calendar, theme, Badge } from 'antd';
import AppointmentDis from '../Components/AppointmentDis';
import RecentActivities from '../Components/RecentActivities';




function Dashboard() {
  const { token } = theme.useToken();
  const wrapperStyle = {
    borderRadius: token.borderRadiusLG,
  };
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  //Event details

  const getListData = (value) => {
    let listData = []; // Specify the type of listData
    switch (value.date()) {
      case 1:
        listData = [
          {
            type: 'warning',
            content: 'Appt',
          },
        
        ];
        break;
      case 10:
        listData = [
          {
            type: 'warning',
            content: 'App',
          },
         
        ];
        break;
      case 15:
        listData = [
          {
            type: 'success',
            content: 'event',
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

  //Event rendering 
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

  return (
    <div className="flex h-screen">
      <div>
      <Sidebar>
        <SidebarItem 
          icon={<LuLayoutDashboard size={20} />}
          text="Dashboard"
          alert
          active
        />
        <SidebarItem icon={<FaHospitalUser size={20} />} text="Consultations" />
        <SidebarItem icon={<GrEmergency size={20} />} text="Emergency" />
        <SidebarItem icon={<BiSolidDonateBlood size={20} />} text="Donations" alert />
        <SidebarItem icon={<FaHospitalAlt size={20} />} text="Facilities" />
        <SidebarItem icon={<MdForum size={20} />} text="Forums" alert />
        <hr className='my-3' />
        <SidebarItem icon={<SiFigshare size={20} />} text="Referrals" />
        <SidebarItem icon={<MdContactSupport size={20} />} text="Support" />
        <SidebarItem icon={<IoIosSettings size={20} />} text="Settings" alert />
       
      </Sidebar>
      </div>
     

      <div className="flex-1  overflow-y-auto ">
        <div className='sticky top-0 z-40'>
        <Navbar /> {/* Place your Navbar here */}
        </div>
       
      <div className="flex flex-col px-4 md:flex-row">
         <div className='md:w-[50%]'>
          <div>
          <BookingDashboard />
          </div>
          
         <div style={wrapperStyle} className='p-4' >
         <Calendar fullscreen={false} onPanelChange={onPanelChange} cellRender={cellRender} />
         </div>
         <div>
         <AppointmentDis />
         </div>
         </div>
         <div className='md:w-[50%]'>
          <div>
          <BloodGroupCard />
          </div>
        <div>
          <BMICard />
        </div>
          <div className='mt-2'>
            <MedReportDashboard />
          </div>
          <div>
            <RecentActivities />
          </div>
          </div>
      </div>
      </div>
    </div>
   
  );
}

export default Dashboard;
