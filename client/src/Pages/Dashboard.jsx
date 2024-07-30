import React from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import { useSelector } from 'react-redux';
import Onboarding from './Onboarding';
import { useState, useEffect } from 'react';
import UserDashboard from '../Components/User/UserDashboard';
import AdminDashboard from '../Components/Admin/AdminDashboard';
import DoctorDashboard from '../Components/Doctor/DoctorDashboard';
import NurseDashboard from '../Components/Nurse/NurseDashboard';
import HospitalDashboard from '../Components/Hospital/HospitalDashboard';
import MinisterDashboard from '../Components/Minister/MinisterDashboard';
import { useDispatch } from 'react-redux';
import { ChangeDefault } from '../features/SharedDataSlice/SharedData';

function Dashboard(acc_type) {
  const UserInfo = useSelector(state => state.afiaCare.usersLogin);
  const [showMenuSmall, setShowMenuSmall] = useState(true);
  const [currentUser, setCurrentUser] = useState(acc_type ? acc_type.acc_type : "patient");

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

  if (acc_type) {
    renderDashboard();
  }

  useEffect(() => {
    const handleResize = () => {
      setShowMenuSmall(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);



  return (
    <div className="flex h-screen">
      <div className={`${showMenuSmall ? "" : "hidden"} z-50`}>
        <Sidebar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className='sticky top-0 z-40'>
          <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} showMenuSmall={showMenuSmall} setShowMenuSmall={setShowMenuSmall} />
        </div>
        {!UserInfo.UserInfo.acc_status ? (
          <div className="bg-white p-1 z-0">
            <Onboarding />
          </div>
        ) : (
          renderDashboard()
        )}
      </div>
    </div>
  );
}

export default Dashboard;
