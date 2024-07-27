import React from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar'; 
import { Calendar, theme, Badge } from 'antd';
import { useSelector } from 'react-redux';
import Onboarding from './Onboarding';
import { useState } from 'react';
import { useEffect } from 'react';
import UserDashboard from '../Components/User/UserDashboard';
import AdminDashboard from '../Components/Admin/AdminDashboard';
import DoctorDashboard from '../Components/Doctor/DoctorDashboard';
import NurseDashboard from '../Components/Nurse/NurseDashboard';
import HospitalDashboard from '../Components/Hospital/HospitalDashboard';
import MinisterDashboard from '../Components/Minister/MinisterDashboard';



function Dashboard() {
  const UserInfo = useSelector(state => state.afiaCare.usersLogin);
  const [showMenuSmall, setShowMenuSmall] = useState(true)
  const { token } = theme.useToken();

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

  
  return (
    <div className="flex h-screen">
      <div className={`${showMenuSmall ? "" : "hidden"} z-50`}>
        <Sidebar />
      </div>


      <div className="flex-1  overflow-y-auto ">
        <div className='sticky top-0 z-40'>
          <Navbar showMenuSmall={showMenuSmall} setShowMenuSmall={setShowMenuSmall} /> {/* Place your Navbar here */}
        </div>
        {!UserInfo.UserInfo.acc_status &&
          <div className="bg-[white] p-1 z-0"> 
            <Onboarding />
          </div>
        }
        {UserInfo.UserInfo.acc_type === "patient" &&
          <UserDashboard />
        }
        {UserInfo.UserInfo.acc_type === "doctor" &&
          <DoctorDashboard />
        }
        {UserInfo.UserInfo.acc_type === "admin" &&
          <AdminDashboard />
        }
        {UserInfo.UserInfo.acc_type === "nurse" &&
          <NurseDashboard />
        }
        {UserInfo.UserInfo.acc_type === "minister" &&
          <MinisterDashboard />
        }
        {UserInfo.UserInfo.acc_type === "hospital" &&
          <HospitalDashboard />
        }

      </div>
    </div>

  );
}

export default Dashboard;
