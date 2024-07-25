import React from 'react';
import Sidebar, { SidebarItem } from '../../Components/User/Sidebar'; // Ensure SidebarItem is imported
import Navbar from '../../Components/User/Navbar'; // Import your Navbar component
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdForum } from "react-icons/md";
import { FaHospitalUser } from "react-icons/fa6";
import { GrEmergency } from "react-icons/gr";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaHospitalAlt } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";
import { SiFigshare } from "react-icons/si";
import backgroundImage from '../../assets/images/bgImg.png';
import { Link } from 'react-router-dom';
import GreetingsCard from '../../Components/User/consultations/GreetingsCard';
import CardImg from '../../assets/images/welness3.jpg';
import CardInsuranceImg from '../../assets/images/InsuranceImg.avif';
import WellnessCard from '../../Components/User/consultations/WellnessCard';
import PhysicalOverview from '../../Components/User/consultations/PhysicalOverview';
import RecentVisits from '../../Components/User/consultations/RecentVisits';
import InsuranceCard from '../../Components/User/consultations/InsuranceCard';
import UpcomingConsultations from '../../Components/User/consultations/UpcomingConsultations';
import { useState } from 'react';

function Consultation() {
    const title = 'How are you feeling today?';
    const message = "Reserve your slot, get ticket, don't wait in line!";
    const ExamText = 'WELLNESS TEST';
    const description = "Reserve your slot, get ticket, don't wait in line!";
    const buttonText = 'More details';
    const BookText = 'Book Consultation';
    const InsuranceText = 'Insurance Management';
    const InsuranceDescription = "Get a quote and get covered for your health needs.";
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
        <div className="flex h-screen">
          <div className={`${showMenuSmall ? "" : "hidden"} z-50`}>
            <Sidebar />
          </div>

            <div className="flex-1 overflow-y-auto">
                <div className="sticky top-0 z-40">
                <Navbar showMenuSmall={showMenuSmall} setShowMenuSmall={setShowMenuSmall} /> 
                </div>
                <div className="flex flex-col px-4 md:flex-row">
                    <div className="md:w-[50%]">
                        <div className="p-4">
                            <GreetingsCard
                                title={title}
                                message={message}
                                backgroundImage={backgroundImage}
                                BookText={BookText}
                            />
                        </div>
                        <div className="p-4">
                            <WellnessCard
                                ExamText={ExamText}
                                description={description}
                                buttonText={buttonText}
                                CardImg={CardImg}
                            />
                        </div>
                        <div className="p-4">
                            <InsuranceCard
                                InsuranceText={InsuranceText}
                                Insurancedescription={InsuranceDescription}
                                buttonText={buttonText}
                                CardInsuranceImg={CardInsuranceImg}
                            />
                        </div>
                        <div>
                            <UpcomingConsultations />
                        </div>
                    </div>
                    <div className="md:w-[50%]">
                        <div>
                            <PhysicalOverview />
                        </div>
                        <div className="pb-4">
                            <RecentVisits />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Consultation;
