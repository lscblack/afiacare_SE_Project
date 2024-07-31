
import React, { useState } from 'react';
import BookingDashboard from './Dashboard/BookingDashBoard';
import BloodGroupCard from './Dashboard/BloodGroupCard';
import BMICard from './Dashboard/BMICard';
import MedReportDashboard from './Dashboard/MedReportDashboard';
import { Calendar, theme, Badge } from 'antd';
import AppointmentDis from './Dashboard/AppointmentDis';
import RecentActivities from '../RecentActivities';
import { useSelector } from 'react-redux';
import { ChangeDefault } from '../../features/SharedDataSlice/SharedData';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NewRecord from './Views/NewRecord';
import NewAppointment from './Views/NewAppointment';


function UserDashboard() {
  const UserInfo = useSelector(state => state.afiaCare.usersLogin);
  const defaultUser = useSelector(state => state.afiaCare.defaultView);
  const [showInfo, setShowInfo] = useState(false)
  const dispatch = useDispatch()
  const { token } = theme.useToken();
  const wrapperStyle = {
    borderRadius: token.borderRadiusLG,
  };
  // const onPanelChange = (value, mode) => {
  //   console.log(value.format('YYYY-MM-DD'), mode);
  // };

  //Event details

  // const getListData = (value) => {
  //   let listData = []; // Specify the type of listData
  //   switch (value.date()) {
  //     case 1:
  //       listData = [
  //         {
  //           type: 'warning',
  //           content: 'Appt',
  //         },

  //       ];
  //       break;
  //     case 10:
  //       listData = [
  //         {
  //           type: 'warning',
  //           content: 'App',
  //         },

  //       ];
  //       break;
  //     case 15:
  //       listData = [
  //         {
  //           type: 'success',
  //           content: 'event',
  //         },

  //       ];
  //       break;
  //     default:
  //   }
  //   return listData || [];
  // };
  // const getMonthData = (value) => {
  //   if (value.month() === 1) {
  //     return 1394;
  //   }
  // };

  //Event rendering 
  // const monthCellRender = (value) => {
  //   const num = getMonthData(value);
  //   return num ? (
  //     <div className="notes-month">
  //       <section>{num}</section>
  //       <span>Event</span>
  //     </div>
  //   ) : null;
  // };
  // const dateCellRender = (value) => {
  //   const listData = getListData(value);
  //   return (
  //     <ul className="events">
  //       {listData.map((item) => (
  //         <li key={item.content}>
  //           <Badge status={item.type} text={item.content} />
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };
  // const cellRender = (current, info) => {
  //   if (info.type === 'date') return dateCellRender(current);
  //   if (info.type === 'month') return monthCellRender(current);
  //   return info.originNode;
  // };
  return (
    <>
      <div className="flex flex-col px-4 md:flex-row">
        <div className='md:w-[50%]'>
          <div>
            <BookingDashboard />
          </div>

          <div style={wrapperStyle} className='p-4' >
            {/* <Calendar fullscreen={false} onPanelChange={onPanelChange} cellRender={cellRender} /> */}

            <h2 className='p-2 text-[#39827a] '>Profile Overview</h2>
            <div className="max-w-4xl mx-auto bg-white text-slate-600 p-6 rounded-lg">

                  <div className="flex items-center">
                    <img src={UserInfo.UserInfo.avatar} alt="User Avatar" className="w-24 h-24 rounded-full mr-4" />
                    <div>
                      <h2 className="text-2xl font-bold">{UserInfo.UserInfo.fname} {UserInfo.UserInfo.lname}</h2>
                      <p className="text-gray-600">@{UserInfo.UserInfo.username}</p>
                      <p className="text-gray-600">{UserInfo.UserInfo.email}</p>
                      <p className="text-gray-600">{UserInfo.UserInfo.gender}</p>
                      <p className="text-gray-600">{UserInfo.UserInfo.phone}</p>
                    </div>
                  </div>
                  <button className='p-2 border border-[#39827a] text-[#39827a] hover:bg-[#39827a] hover:text-white rounded-lg m-auto block mt-3 ' onClick={() => {setShowInfo(!showInfo)}}>Show more Information</button>
                  {showInfo && 
                  <>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
                    <p><strong>Date of Birth:</strong> {UserInfo.UserInfo.dob}</p>
                    <p><strong>National ID:</strong> {UserInfo.UserInfo.N_id}</p>
                    <p><strong>ID Type:</strong> {UserInfo.UserInfo.Id_type}</p>
                    <p><strong>Father's Name:</strong> {UserInfo.UserInfo.father_name}</p>
                    <p><strong>Mother's Name:</strong> {UserInfo.UserInfo.mother_name}</p>
                    <p><strong>Married:</strong> {UserInfo.UserInfo.married ? "Yes" : "No"}</p>
                    {UserInfo.UserInfo.married && <p><strong>Spouse:</strong> {UserInfo.UserInfo.spouse}</p>}
                  </div>
                  <hr />
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Health Information</h3>
                    <p><strong>Height:</strong> {UserInfo.UserInfo.height} cm</p>
                    <p><strong>Weight:</strong> {UserInfo.UserInfo.weight} kg</p>
                    <p><strong>Blood Type:</strong> {UserInfo.UserInfo.blood_type}</p>
                    <p><strong>Existing Medical Conditions:</strong> {UserInfo.UserInfo.existing_medical_conditions}</p>
                    <p><strong>Allergies:</strong> {UserInfo.UserInfo.allergies.join(', ')}</p>
                    <p><strong>Physical Activity Level:</strong> {UserInfo.UserInfo.physical_activity_level}</p>
                    <p><strong>Dietary Preferences:</strong> {UserInfo.UserInfo.dietary_preferences.join(', ')}</p>
                    <p><strong>Smoking Status:</strong> {UserInfo.UserInfo.smoking_status}</p>
                    <p><strong>Alcohol Consumption:</strong> {UserInfo.UserInfo.alcohol_consumption}</p>
                    <p><strong>Primary Health Goal:</strong> {UserInfo.UserInfo.primary_health_goal}</p>
                    <p><strong>Preferred Workout Types:</strong> {UserInfo.UserInfo.preferred_workout_types.join(', ')}</p>
                    <p><strong>Preferred Workout Times:</strong> {UserInfo.UserInfo.preferred_workout_times}</p>
                  </div>
                  <hr />
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Emergency Contact</h3>
                    <p><strong>Contact:</strong> {UserInfo.UserInfo.emergency_contact}</p>
                    <p><strong>Contact Name:</strong> {UserInfo.UserInfo.emergency_contact_name}</p>
                  </div>
                  <hr />
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                    <p><strong>Email:</strong> {UserInfo.UserInfo.email}</p>
                    <p><strong>Phone:</strong> {UserInfo.UserInfo.phone}</p>
                    <p><strong>Country:</strong> {UserInfo.UserInfo.country}</p>
                    <p><strong>Gender:</strong> {UserInfo.UserInfo.gender}</p>
                  </div>
                  </>
                  }

                </div>


          </div>
          <div>
            {/* <AppointmentDis /> */}
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
            {/* <MedReportDashboard /> */}
          </div>
          <div>
            {/* <RecentActivities /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
