import React from 'react';
import Sidebar, { SidebarItem } from '../../Components/User/Sidebar';
import Navbar from '../../Components/User/Navbar'; // Import your Navbar component
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdForum } from "react-icons/md";
import CardImg from '../../assets/images/DonorImg.jpg'
import { FaHospitalUser } from "react-icons/fa6";
import { GrEmergency } from "react-icons/gr";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaHospitalAlt } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";
import { SiFigshare } from "react-icons/si";
import backgroundImage from '../../assets/images/DonateBg.jpg';
import { Link } from 'react-router-dom';
import GreetingsCard from '../../Components/User/consultations/GreetingsCard';
import RecentDonations from '../../Components/User/Donations/RecentDonations';
import PeopleInNeed from '../../Components/User/Donations/PeopleInNeed';
import UpcomingDonations from '../../Components/User/Donations/UpcomingDonations';
import WellnessCard from '../../Components/User/consultations/WellnessCard';
import BloodTip from '../../Components/User/Donations/BloodTip';
import RequestDonation from '../../Components/User/Donations/RequestDonation';


function Donations() {
    const title = 'Save a life!';
    const message = "You can become a blood donor in a few clicks!";
    const BookText = 'Register';
    const ExamText = 'Blood donation eligibility';
    const description = "Find out what is required of you...";
    const buttonText =  'More details';
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
        <SidebarItem icon={<GrEmergency size={20} />} text="Emergency"  />
       </Link>
       <Link to="/user/donations">
        <SidebarItem icon={<BiSolidDonateBlood size={20} />} text="Donations" alert active/>
       </Link>
       <Link to="/facilities">
        <SidebarItem icon={<FaHospitalAlt size={20} />} text="Facilities" />
       </Link>
        <SidebarItem icon={<MdForum size={20} />} text="Messages" alert />
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
        <GreetingsCard  title={title} message={message} backgroundImage={backgroundImage} BookText={BookText} />
        </div>
        <div className='px-6'>
            <h2 className='text-[16px] mb-2 text-gray-500 font-medium'> People with matching blood group in need</h2>
           <div className='py-4 bg-white p-4 rounded-md'>
            <PeopleInNeed />
           </div>
        </div>
        <div className='p-6'>
            <UpcomingDonations />
        </div>
        </div>
      
        <div className='md:w-[50%]'>
          <div className='py-4'>
          <RecentDonations />
          </div>
          <div className='py-4'>
            <RequestDonation />
          </div>
          <div>
            <WellnessCard CardImg={CardImg} ExamText={ExamText} description={description} buttonText={buttonText} />
          </div>
          <div className='py-4'>
            <BloodTip />
          </div>
         
        </div>
       </div>
     
      </div>
    </div>
  )
}

export default Donations
