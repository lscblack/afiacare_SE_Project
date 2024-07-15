import React from 'react';
import UpcomingAppointmentCard from './UpcomingAppointmentCard';

const appointments = [
  { title: 'Doctor Appointment', date: '2024.07.16', time: '10:00 AM', description: 'General checkup with Dr. Smith.', status: 'On time'},
  { title: 'Dentist Appointment', date: '2024.07.18', time: '02:00 PM', description: 'Teeth cleaning and checkup.', status: 'Late' },
  { title: 'Therapist Appointment', date: '2024.07.20', time: '01:00 PM', description: 'Monthly therapy session.', status: 'On time' },
];

function AppointmentDis() {
  return (
    <div className=" p-4">
        <h1 className=" mb-2 text-[#39827a] font-medium text-[16px]">Upcoming Appointments <span className='text-[#39827a] h-6 w-6 border p-1 rounded-full text-[14px]'>3</span></h1>
      <UpcomingAppointmentCard appointments={appointments} />
    </div>
  );
}

export default AppointmentDis;
