import React from 'react';
import Sidebar, { SidebarItem } from '../../Components/User/Sidebar';
import Navbar from '../../Components/User/Navbar'; // Import your Navbar component
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdForum } from "react-icons/md";
import { FaHospitalUser } from "react-icons/fa6";
import { GrEmergency } from "react-icons/gr";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaHospitalAlt } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";
import { SiFigshare } from "react-icons/si";
import BookingDashboard from '../../Components/User/Dashboard/BookingDashBoard';
import BloodGroupCard from '../../Components/User/Dashboard/BloodGroupCard';
import BMICard from '../../Components/User/Dashboard/BMICard';
import MedReportDashboard from '../../Components/User/Dashboard/MedReportDashboard';
import { Calendar, theme, Badge } from 'antd';
import AppointmentDis from '../../Components/User/Dashboard/AppointmentDis';
import RecentActivities from '../../Components/RecentActivities';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Onboarding from '../Onboarding';




function Dashboard() {
  const UserInfo = useSelector(state => state.afiaCare.usersLogin);
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
      <div className='z-50'>
        <Sidebar>
          <Link to="/dashboard">   <SidebarItem
            icon={<LuLayoutDashboard size={20} />}
            text="Dashboard"
            alert
            active
          /></Link>
          {UserInfo.UserInfo.acc_status && UserInfo.UserInfo.acc_status &&
            <>
              <Link to="/user/consultations"> <SidebarItem icon={<FaHospitalUser size={20} />} text="Consultations" /></Link>
              <SidebarItem icon={<IoIosSettings size={20} />} text="Settings" alert />
              <SidebarItem icon={<BiSolidDonateBlood size={20} />} text="Donations" alert />
              <SidebarItem icon={<MdForum size={20} />} text="Messages" alert />
            </>
          }
          <SidebarItem icon={<GrEmergency size={20} />} text="Emergency" />
          <SidebarItem icon={<FaHospitalAlt size={20} />} text="Facilities" />
          <hr className='my-3' />
          <SidebarItem icon={<SiFigshare size={20} />} text="Referrals" />
          <SidebarItem icon={<MdContactSupport size={20} />} text="Support" />

        </Sidebar>
      </div>


      <div className="flex-1  overflow-y-auto ">
        <div className='sticky top-0 z-40'>
          <Navbar /> {/* Place your Navbar here */}
        </div>
        {!UserInfo.UserInfo.acc_status &&
          <div className="bg-[white] p-1 z-0">
            <Onboarding />
          </div>
        }
        {UserInfo.UserInfo.acc_status &&
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
        }
      </div>
    </div>

  );
}

export default Dashboard;
