import React from 'react';
import { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar'; 
import EmergencyRequestCards from '../../Components/User/Emergency_Components/EmergencyRequestCards';
import FirstAidCards from '../../Components/User/Emergency_Components/FirstAidCards';
import HospitalsNearyou from '../../Components/User/Emergency_Components/HospitalsNearyou';

// import dashboards
import AdminDashboard from '../../Components/Admin/AdminDashboard';
import DoctorDashboard from '../../Components/Doctor/DoctorDashboard';
import NurseDashboard from '../../Components/Nurse/NurseDashboard';
import HospitalDashboard from '../../Components/Hospital/HospitalDashboard';
import MinisterDashboard from '../../Components/Minister/MinisterDashboard';

function Emergency() {
  const [currentUser, setCurrentUser] = useState("patient");

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
  }, []);
  const [showMenuSmall, setShowMenuSmall] = useState(true);

  const renderDashboard = () => {
    switch (currentUser) {
      case 'admin':
        return <AdminDashboard />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'nurse':
        return <NurseDashboard />;
      case 'hospital':
        return <HospitalDashboard />;
      case 'minister':
        return <MinisterDashboard />;
      default:
        return <UserDashboard />;
    }
  };


  return (
    <div className='flex h-screen'>
      <div className={`${showMenuSmall ? "" : "hidden"} z-50`}>
        <Sidebar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className='sticky top-0 z-40'>
          <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} showMenuSmall={showMenuSmall} setShowMenuSmall={setShowMenuSmall} />
        </div>
        {currentUser === "patient" && 
          <div>
            <div>
                <EmergencyRequestCards />
            </div>
            <div className='px-6'>
                <h1 className='text-[#39827a] font-medium text-[16px]'>Hospitals Near you</h1>
                <HospitalsNearyou />
            </div>
            <div className='pb-8'>
                <h1 className='text-[#39827a] font-medium text-[16px] p-6'>What to do incase of an Emergency</h1>
                <FirstAidCards />
            </div>
          </div>
        }
        {currentUser !== "patient" && renderDashboard()}
     
      </div>
    </div>
  )
}

export default Emergency
