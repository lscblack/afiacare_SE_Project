import React from 'react';
import { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import Sidebar from '../../../Components/Sidebar';
import Navbar from '../../../Components/Navbar';
import { FaHospital, FaClinicMedical, FaSyringe, FaTooth, FaUserMd, FaHeartbeat, FaAmbulance } from 'react-icons/fa';
import RecommendedFacilities from '../../../Components/User/Facilities/RecommendedFacilities';
import MyApi from "../../../AxiosInstance/MyApi";

// import dashboards
import AdminDashboard from '../../../Components/Admin/AdminDashboard';
import DoctorDashboard from '../../../Components/Doctor/DoctorDashboard';
import NurseDashboard from '../../../Components/Nurse/NurseDashboard';
import HospitalDashboard from '../../../Components/Hospital/HospitalDashboard';
import MinisterDashboard from '../../../Components/Minister/MinisterDashboard';




const Facilities = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [showMenuSmall, setShowMenuSmall] = useState(true)
  const [currentUser, setCurrentUser] = useState("patient");
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowMenuSmall(false);
      } else {
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

  const getAppointments = async () => {
    try {
      const response = await MyApi.get('/app/me/all');
      setAppointments(response.data);
    } catch (error) {
      setError(error.response || 'An error occurred');
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const onApprove = async (appointmentId) => {
    try {
      const response = await MyApi.patch(`/app/update_status/${appointmentId}?status=true`);
      getAppointments();
      toast.success('Appointment approved successfully');
    } catch (error) {
      toast.error(error.response.data.detail || 'An error occurred');
    }
  };

  const handleRowClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="p-5 bg-white rounded-md m-5">
          <h2 className="text-2xl font-bold mb-2 text-[#39827a]">Appointments</h2>
          <p className="text-gray-500 mb-4">View and manage upcoming appointments.</p>

          <div className="overflow-x-auto flex items-start gap-4 md:gap-0 justify-normal md:justify-between flex-wrap pb-5">
            <div className="w-full shadow-lg mt-5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search appointments"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-3/4 mb-4 p-2 bg-transparent border border-gray-300 rounded text-gray-500 outline-none"
                />
                <select name="" id="" className='w-1/4 mb-4 p-2 bg-transparent border border-gray-300 rounded text-gray-500 outline-none'>
                  <option value="">All</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead>
                    <tr>
                      <th className="text-left py-2 px-4 border-b border-gray-300 text-gray-700">Patient Name</th>
                      <th className="text-left py-2 px-4 border-b border-gray-300 text-gray-700">Date</th>
                      <th className="text-left py-2 px-4 border-b border-gray-300 text-gray-700">Reason</th>
                      <th className="text-left py-2 px-4 border-b border-gray-300 text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  {appointments.length == 0 && [0,1,2,3,4,5].map((i) => (
                      <tr key={i}>
                        <th className="text-left py-2 px-4 border-b border-gray-300 text-gray-700">
                            <div className="bg-gradient-to-r from-gray-100 to-gray-300 w-full h-3 mr-2 rounded-sm animate-pulse"></div>
                        </th>
                        <th className="text-left py-2 px-4 border-b border-gray-300 text-gray-700">
                            <div className="bg-gradient-to-r from-gray-100 to-gray-300 w-full h-3 mr-2 rounded-sm animate-pulse"></div>
                        </th>
                        <th className="text-left py-2 px-4 border-b border-gray-300 text-gray-700">
                            <div className="bg-gradient-to-r from-gray-100 to-gray-300 w-full h-3 mr-2 rounded-sm animate-pulse"></div>
                        </th>
                      </tr>
                      
                    ))}
                    {error && appointments.length != 0 ? (
                      <tr><td colSpan="5" className="text-center py-2 px-4 border-b border-gray-200 text-gray-500">{error}</td></tr>
                    ) : (
                      filteredAppointments.map((appointment) => (
                        <tr key={appointment.id} onClick={() => handleRowClick(appointment)} className="cursor-pointer">
                          <td className="py-2 px-4 border-b border-gray-200 text-gray-500">{appointment.fname + " " + appointment.lname}</td>
                          <td className="py-2 px-4 border-b border-gray-200 text-gray-500">{new Date(appointment.due_date).toLocaleDateString()}</td>
                          <td className="py-2 px-4 border-b border-gray-200 text-gray-500">{appointment.reason}</td>
                          <td className="py-2 px-4 border-b border-gray-200 text-gray-500">{!appointment.app_status ? "Pending" : "Approved"}</td>
                          
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="min-w-[30%]"> */}
              {/* <AppointmentHistory /> */}
            {/* </div> */}
          </div>
        </div>
        }
        {currentUser !== "patient" && renderDashboard()}

      </div>
    </div>
  );
};

export default Facilities;
