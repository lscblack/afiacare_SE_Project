
import React from 'react';
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
  const dispatch = useDispatch()
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
  console.log(defaultUser)
  return (
    <>
    {defaultUser == "View Records" && <NewRecord/> }
    {defaultUser == "View Appointments" && <NewAppointment/> }
    {defaultUser == "" &&
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
    </>
  );
}

export default UserDashboard;
