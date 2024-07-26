import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar, { SidebarItem } from '../../Components/User/Sidebar';
import Navbar from '../../Components/User/Navbar'; // Import your Navbar component
import CardImg from '../../assets/images/DonorImg.jpg'
import backgroundImage from '../../assets/images/DonateBg.jpg';
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
    const [showMenuSmall, setShowMenuSmall] = useState(true)


    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setShowMenuSmall(false);
        }else{
          setShowMenuSmall(true);
  
        }
      };
  
      handleResize();
      window.addEventListener("resize", handleResize);
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    
  return (
    <div className='flex h-screen'>
        <div className={`${showMenuSmall ? "" : "hidden"} z-50`}>
        <Sidebar />
      </div>

      <div className="flex-1  overflow-y-auto ">
        <div className='sticky top-0 z-40'>
        <Navbar showMenuSmall={showMenuSmall} setShowMenuSmall={setShowMenuSmall} /> 
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
