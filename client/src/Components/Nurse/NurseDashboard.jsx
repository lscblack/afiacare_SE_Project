
import React from 'react';
import { useSelector } from 'react-redux';




function NurseDashboard() {
  const UserInfo = useSelector(state => state.afiaCare.usersLogin);
  
  return (
    <div>
    <h1 className='text-center text-gray-600'>Hello Nurse</h1>
    <RecentActivities/>
    </div>
);
}

export default NurseDashboard;
