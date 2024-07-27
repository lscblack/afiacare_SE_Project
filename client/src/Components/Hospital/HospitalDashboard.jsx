
import React from 'react';
import { useSelector } from 'react-redux';




function HospitalDashboard() {
  const UserInfo = useSelector(state => state.afiaCare.usersLogin);
  
  return (
    <div>
    <h1 className='text-center text-gray-600'>Hello Hospital</h1>
    </div>
);
}

export default HospitalDashboard;
