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
import { Link } from 'react-router-dom';

function Emergency() {
  return (
    <div className='flex h-screen'>
       <div>
      <Sidebar>
        <Link to="/dashboard">   <SidebarItem 
          icon={<LuLayoutDashboard size={20} />}
          text="Dashboard"
          alert
         
        /></Link>
     
        <Link to="/user/consultations"> <SidebarItem icon={<FaHospitalUser size={20} />} text="Consultations"  /></Link>
       <Link to="/user/emergency">
        <SidebarItem icon={<GrEmergency size={20} />} text="Emergency"  active />
       </Link>
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
          <div className='p-4'>
          
          </div>
          <div className='p-4'>
          
          </div>
          <div className='p-4'>
          
          </div>
            <div>
           
            </div>
         </div>
         <div className='md:w-[50%]'>
          <div>
        
          </div>
          <div className='pb-4'>
         
          </div>
          </div>
      </div>
      </div>
    </div>
  )
}

export default Emergency
