import React from 'react';
import Sidebar, { SidebarItem } from '../Components/Sidebar';
import Navbar from '../Components/Navbar'; // Import your Navbar component
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdForum } from "react-icons/md";
import { FaHospitalUser } from "react-icons/fa6";
import { GrEmergency } from "react-icons/gr";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaHospitalAlt } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";
import { SiFigshare } from "react-icons/si";
import BookingDashboard from '../Components/BookingDashBoard';
import BloodGroupCard from '../Components/BloodGroupCard';
import BMICard from '../Components/BMICard';

function Dashboard() {
  return (
    <div className="flex h-screen">
      <div>
      <Sidebar>
        <SidebarItem 
          icon={<LuLayoutDashboard size={20} />}
          text="Dashboard"
          alert
          active
        />
        <SidebarItem icon={<FaHospitalUser size={20} />} text="Consultations" />
        <SidebarItem icon={<GrEmergency size={20} />} text="Emergency" />
        <SidebarItem icon={<BiSolidDonateBlood size={20} />} text="Donations" alert />
        <SidebarItem icon={<FaHospitalAlt size={20} />} text="Facilities" />
        <SidebarItem icon={<MdForum size={20} />} text="Forums" alert />
        <hr className='my-3' />
        <SidebarItem icon={<SiFigshare size={20} />} text="Referrals" />
        <SidebarItem icon={<MdContactSupport size={20} />} text="Support" />
        <SidebarItem icon={<IoIosSettings size={20} />} text="Settings" alert />
       
      </Sidebar>
      </div>
     

      <div className="flex-1  overflow-y-auto ">
        <div className='sticky top-0 z-40'>
        <Navbar /> {/* Place your Navbar here */}
        </div>
       
      <div className="flex flex-col px-4 md:flex-row">
         <div className='md:w-[50%]'>
          <BookingDashboard />
         </div>
         <div className='md:w-[50%]'>
          <div>
          <BloodGroupCard />
          </div>
        <div>
          <BMICard />
        </div>
   
          </div>
      </div>
      </div>
    </div>
   
  );
}

export default Dashboard;
