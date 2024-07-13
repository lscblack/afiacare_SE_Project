import React from 'react';
import Sidebar, { SidebarItem } from '../../Components/DoctorsSidebar';
import { MdForum } from "react-icons/md";
import { FaCalendarMinus } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { TbGraphFilled } from "react-icons/tb";
import { MdDashboardCustomize } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { FaFolderPlus } from "react-icons/fa6";
import { MdContactSupport } from "react-icons/md";
function DoctorsDashboard() {
  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem 
          icon={<MdDashboardCustomize size={20} />}
          text="Dashboard"
          alert
          active
        />
        <SidebarItem icon={<FaCalendarMinus size={20} />} text="Appointments" />
        <SidebarItem icon={<FaUsers size={20} />} text="Patients" alert />
        <SidebarItem icon={<TbGraphFilled size={20} />} text="Statistics" />
        <SidebarItem icon={<MdForum size={20} />} text="Forums" alert />
      
        <SidebarItem icon={<FaPlusCircle size={20} />} text="Requests" />
        <SidebarItem icon={<FaFolderPlus size={20} />} text="Test Results" />
        <hr className='my-3' />
        <SidebarItem icon={<MdContactSupport size={20} />} text="Help center" alert />
      </Sidebar>

      <div className="flex-1">
       
        <div className="p-6">
        
        </div>
      </div>
    </div>
  );
}

export default DoctorsDashboard;
