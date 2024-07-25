import React from 'react';
import { useEffect, useState } from 'react';
import Sidebar from '../../Components/User/Sidebar';
import Navbar from '../../Components/User/Navbar'; 
import EmergencyRequestCards from '../../Components/User/Emergency_Components/EmergencyRequestCards';
import FirstAidCards from '../../Components/User/Emergency_Components/FirstAidCards';
import HospitalsNearyou from '../../Components/User/Emergency_Components/HospitalsNearyou';

function Emergency() {
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
  const [showMenuSmall, setShowMenuSmall] = useState(true);


  return (
    <div className='flex h-screen'>
       <div className={`${showMenuSmall ? "" : "hidden"} z-50`}>
        <Sidebar />
      </div>
      <div className="flex-1  overflow-y-auto ">
        <div className='sticky top-0 z-40'>
        <Navbar showMenuSmall={showMenuSmall} setShowMenuSmall={setShowMenuSmall} />
        </div>
       <div>
        <div>
            <EmergencyRequestCards />
        </div>
        <div className='px-6'>
            <h1 className='text-[#39827a] font-medium text-[16px]'>Hospitals Near you</h1>
            <HospitalsNearyou />
        </div>
        <div className='pb-8'>
            <h1 className='text-[#39827a] font-medium text-[16px] p-6'>What to do incase of an Emergency</h1>
            <FirstAidCards />
        </div>
       </div>
     
      </div>
    </div>
  )
}

export default Emergency
