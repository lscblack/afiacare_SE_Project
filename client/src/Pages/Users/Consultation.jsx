import React from 'react';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar'; 
import backgroundImage from '../../assets/images/bgImg.png';
import GreetingsCard from '../../Components/User/consultations/GreetingsCard';
import CardImg from '../../assets/images/welness3.jpg';
import CardInsuranceImg from '../../assets/images/InsuranceImg.avif';
import WellnessCard from '../../Components/User/consultations/WellnessCard';
import PhysicalOverview from '../../Components/User/consultations/PhysicalOverview';
import RecentVisits from '../../Components/User/consultations/RecentVisits';
import InsuranceCard from '../../Components/User/consultations/InsuranceCard';
import UpcomingConsultations from '../../Components/User/consultations/UpcomingConsultations';
import { useState, useEffect } from 'react';

// import dashboards
import AdminDashboard from '../../Components/Admin/AdminDashboard';
import DoctorDashboard from '../../Components/Doctor/DoctorDashboard';
import NurseDashboard from '../../Components/Nurse/NurseDashboard';
import HospitalDashboard from '../../Components/Hospital/HospitalDashboard';
import MinisterDashboard from '../../Components/Minister/MinisterDashboard';

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
    const [currentUser, setCurrentUser] = useState("patient");

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
      const renderDashboard = () => {
        switch (currentUser) {
          case 'admin':
            return <AdminDashboard />;
          case 'doctor':
            return <DoctorDashboard />;
          case 'nurse':
            return <NurseDashboard />;
          case 'hospital':
            return <HospitalDashboard />;
          case 'minister':
            return <MinisterDashboard />;
          default:
            return <UserDashboard />;
        }
      };
      

    return (
        <div className="flex h-screen">
          <div className={`${showMenuSmall ? "" : "hidden"} z-50`}>
            <Sidebar currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </div>

            <div className="flex-1 overflow-y-auto">
                <div className="sticky top-0 z-40">
                <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} showMenuSmall={showMenuSmall} setShowMenuSmall={setShowMenuSmall} />
                </div>
                {currentUser === 'patient' && 
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
                }

                {currentUser !== 'patient' && renderDashboard()}
                
            </div>
        </div>
    );
}

export default Consultation;
