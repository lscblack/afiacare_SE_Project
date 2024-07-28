import React from 'react';
import { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar'; 
import FacilityCard from '../../Components/User/Facilities/FacilityCard';
import FacilityDrawerContent from '../../Components/User/Facilities/FacilityDrawerContent';
import { FaHospital, FaClinicMedical, FaSyringe, FaTooth, FaUserMd, FaHeartbeat, FaAmbulance } from 'react-icons/fa';
import RecommendedFacilities from '../../Components/User/Facilities/RecommendedFacilities';

// import dashboards
import AdminDashboard from '../../Components/Admin/AdminDashboard';
import DoctorDashboard from '../../Components/Doctor/DoctorDashboard';
import NurseDashboard from '../../Components/Nurse/NurseDashboard';
import HospitalDashboard from '../../Components/Hospital/HospitalDashboard';
import MinisterDashboard from '../../Components/Minister/MinisterDashboard';

const facilities = [
    { id: 1, icon: <FaHospital size={24} />, title: 'Hospitals' },
    { id: 2, icon: <FaClinicMedical size={24} />, title: 'Independent Clinic' },
    { id: 3, icon: <FaSyringe size={24} />, title: 'Diagnostic' },
    { id: 4, icon: <FaUserMd size={24} />, title: 'Pharmacy' },
    { id: 5, icon: <FaTooth size={24} />, title: 'Dental Clinic' },
    { id: 6, icon: <FaHeartbeat size={24} />, title: 'Specialized Services' },
    { id: 7, icon: <FaAmbulance size={24} />, title: 'Dialysis Center' },
    { id: 8, icon: <FaAmbulance size={24} />, title: 'Evacuation Services' }
];

const facilitiesData = {
  Hospitals: [
    { name: 'City Hospital', location: '123 Main St, City', contact: '+1 234 567 890', hours: '6 am - 5 pm', distance: '600m', mapUrl: 'https://maps.google.com?q=123+Main+St' },
    { name: 'County Hospital', location: '456 Elm St, County', contact: '+1 234 567 891', hours: '8 AM - 6 PM', mapUrl: 'https://maps.google.com?q=456+Elm+St' }
  ],
  'Independent Clinic': [
    { name: 'Health Clinic', location: '789 Oak St, City', contact: '+1 234 567 892', hours: '10 AM - 4 PM', distance: '700m', mapUrl: 'https://maps.google.com?q=789+Oak+St' },
    { name: 'Wellness Clinic', location: '101 Pine St, County', contact: '+1 234 567 893', hours: '9 AM - 3 PM', mapUrl: 'https://maps.google.com?q=101+Pine+St' }
  ],
  Diagnostic: [
    { name: 'Diagnostic Center', location: '102 Maple St, City', contact: '+1 234 567 894', hours: '8 AM - 4 PM', distance: '600m', mapUrl: 'https://maps.google.com?q=102+Maple+St' },
    { name: 'Lab Services', location: '103 Cedar St, County', contact: '+1 234 567 895', hours: '7 AM - 5 PM', distance: '600m', mapUrl: 'https://maps.google.com?q=103+Cedar+St' }
  ],
  Pharmacy: [
    { name: 'City Pharmacy', location: '104 Birch St, City', contact: '+1 234 567 896', hours: '9 AM - 8 PM', distance: '600m', mapUrl: 'https://maps.google.com?q=104+Birch+St' },
    { name: 'County Pharmacy', location: '105 Walnut St, County', contact: '+1 234 567 897', hours: '8 AM - 9 PM', distance: '600m', mapUrl: 'https://maps.google.com?q=105+Walnut+St' }
  ],
  'Dental Clinic': [
    { name: 'Smile Dental', location: '106 Ash St, City', contact: '+1 234 567 898', hours: '9 AM - 5 PM', distance: '600m', mapUrl: 'https://maps.google.com?q=106+Ash+St' },
    { name: 'Bright Dental', location: '107 Pine St, County', contact: '+1 234 567 899', hours: '8 AM - 4 PM', distance: '600m', mapUrl: 'https://maps.google.com?q=107+Pine+St' }
  ],
  'Specialized Services': [
    { name: 'Cardiology Center', location: '108 Chestnut St, City', contact: '+1 234 567 900', hours: '9 AM - 6 PM', distance: '600m', mapUrl: 'https://maps.google.com?q=108+Chestnut+St' },
    { name: 'Orthopedic Center', location: '109 Hickory St, County', contact: '+1 234 567 901', hours: '8 AM - 5 PM', distance: '600m', mapUrl: 'https://maps.google.com?q=109+Hickory+St' }
  ],
  'Dialysis Center': [
    { name: 'Dialysis Center 1', location: '110 Spruce St, City', contact: '+1 234 567 902', hours: '7 AM - 7 PM', distance: '600m', mapUrl: 'https://maps.google.com?q=110+Spruce+St' },
    { name: 'Dialysis Center 2', location: '111 Fir St, County', contact: '+1 234 567 903', hours: '6 AM - 6 PM', distance: '600m', mapUrl: 'https://maps.google.com?q=111+Fir+St' }
  ],
  'Evacuation Services': [
    { name: 'Evacuation Services 1', location: '112 Redwood St, City', contact: '+1 234 567 904', hours: '24/7', distance: '600m', mapUrl: 'https://maps.google.com?q=112+Redwood+St' },
    { name: 'Evacuation Services 2', location: '113 Cypress St, County', contact: '+1 234 567 905', hours: '24/7', distance: '600m', mapUrl: 'https://maps.google.com?q=113+Cypress+St' }
  ]
};

const Facilities = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [drawerContent, setDrawerContent] = useState([]);
  const [showMenuSmall, setShowMenuSmall] = useState(true)
  const [currentUser, setCurrentUser] = useState("patient");



  const showDrawer = (title) => {
    setDrawerTitle(title);
    setDrawerContent(facilitiesData[title]);
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

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
        <div className='sticky top-0 z-40'>
          <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} showMenuSmall={showMenuSmall} setShowMenuSmall={setShowMenuSmall} />
        </div>
        {currentUser === "patient" &&
          <div>
              <div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 p-4">
          {facilities.map(facility => (
            <FacilityCard
              key={facility.id}
              icon={facility.icon}
              title={facility.title}
              onClick={() => showDrawer(facility.title)}
            />
          ))}
        </div>
        </div>
        <Drawer
          closable
          destroyOnClose
          title={<p>{drawerTitle}</p>}
          placement="right"
          open={open}
          onClose={() => setOpen(false)}
        >
          <FacilityDrawerContent facilities={drawerContent} loading={loading} />
        </Drawer>
        <div>
            <RecommendedFacilities />
        </div>
          </div>
        }
        {currentUser !== "patient" && renderDashboard()}
        
      </div>
    </div>
  );
};

export default Facilities;
