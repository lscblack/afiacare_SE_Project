import React from 'react'
import Sidebar, { SidebarItem } from '../Components/Sidebar'
import { LuLayoutDashboard } from 'react-icons/lu'
import { MdForum } from "react-icons/md";
import { FaHospitalUser } from "react-icons/fa6";
import { GrEmergency } from "react-icons/gr";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaHospitalAlt } from "react-icons/fa";

function Dashboard() {
  return (
    <div>
      <div>
      <Sidebar>
           <SidebarItem 
           icon={<LuLayoutDashboard size={20} /> }
           text="Dashboard"
           alert active/>
           <SidebarItem icon={<FaHospitalUser size={20}/> } text="Consultations"/>
           <SidebarItem icon={<GrEmergency  size={20}/> } text="Emergency"/>
           <SidebarItem icon={<BiSolidDonateBlood size={20}/> } text="Donations" alert/>
           <SidebarItem icon={<FaHospitalAlt size={20}/> } text="Facilities"/>
           <SidebarItem icon={<MdForum size={20}/> } text="Forums" alert/>
        </Sidebar>
      </div>

    </div>
   
  )
}

export default Dashboard
