
import React from 'react';
import { useSelector } from 'react-redux';
import RecentActivities from '../RecentActivities';




function DoctorDashboard() {
  const UserInfo = useSelector(state => state.afiaCare.usersLogin);
  // const { token } = theme.useToken();
  
  return (
    <div>
    <h1 className='text-center text-gray-600'>Hello Doctor</h1>
    <RecentActivities/>
    </div>
);
}

export default DoctorDashboard;
