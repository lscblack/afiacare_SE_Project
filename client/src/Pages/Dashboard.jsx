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

function Dashboard() {
  return (
    <div className="flex">
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
        <SidebarItem icon={<MdContactSupport size={20} />} text="Support" />
        <SidebarItem icon={<IoIosSettings size={20} />} text="Settings" alert />
      </Sidebar>

      <div className="flex-1">
        <Navbar /> {/* Place your Navbar here */}
        <div className="p-6">
        
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
