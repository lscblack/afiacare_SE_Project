import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar'; 
import AppointmentHistory from '../../Components/Doctor/AppointmentHistory';
import MyApi from "../../AxiosInstance/MyApi";
import { toast } from 'react-toastify';

// import dashboards
import AdminDashboard from '../../Components/Admin/AdminDashboard';
import UserDashboard from '../../Components/User/UserDashboard';
import NurseDashboard from '../../Components/Nurse/NurseDashboard';
import HospitalDashboard from '../../Components/Hospital/HospitalDashboard';
import MinisterDashboard from '../../Components/Minister/MinisterDashboard';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [showMenuSmall, setShowMenuSmall] = useState(true);
  const [currentUser, setCurrentUser] = useState("doctor");
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
      case 'patient':
        return <UserDashboard />;
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
      setError(error.response.data.detail || 'An error occurred');
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const onApprove = async (appointmentId) => {
    try {
      const response = await MyApi.patch(`/app/update_status/${appointmentId}?status=true`);
      console.log(response)
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
        <div className="sticky top-0 z-40">
          <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} showMenuSmall={showMenuSmall} setShowMenuSmall={setShowMenuSmall} />
        </div>
        {currentUser === 'doctor' && (
          <div className="p-5 bg-white rounded-md m-5">
            <h2 className="text-2xl font-bold mb-2 text-[#39827a]">Appointments</h2>
            <p className="text-gray-500 mb-4">View and manage upcoming appointments.</p>

            <div className="overflow-x-auto flex items-start gap-4 md:gap-0 justify-normal md:justify-between flex-wrap pb-5">
              <div className="min-w-full md:min-w-[65%] shadow-lg mt-5">
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
                    <option value="">Approved</option>
                    <option value="">Pending</option>
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
                        <th className="text-left py-2 px-4 border-b border-gray-300 text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {error ? (
                        <tr><td colSpan="5" className="text-center py-2 px-4 border-b border-gray-200 text-gray-500">{error}</td></tr>
                      ) : (
                        filteredAppointments.map((appointment) => (
                          <tr key={appointment.id} onClick={() => handleRowClick(appointment)} className="cursor-pointer">
                            <td className="py-2 px-4 border-b border-gray-200 text-gray-500">{appointment.fname + " " + appointment.lname}</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-gray-500">{new Date(appointment.due_date).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-gray-500">{appointment.reason}</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-gray-500">{!appointment.app_status ? "Pending" : "Approved"}</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-gray-500">
                              <button
                                className="px-4 py-2 border-2 border-[#39827a] text-[#39827a] rounded hover:bg-[#39827a] hover:text-white"
                                onClick={(e) => { e.stopPropagation(); onApprove(appointment.app_id); }}
                              >
                                Approve
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="min-w-[30%]">
                <AppointmentHistory />
              </div>
            </div>
          </div>
        )}
        {currentUser !== 'doctor' && renderDashboard()}
      </div>

      {isModalOpen && selectedAppointment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg w-[90%] max-w-lg">
            <h2 className="text-2xl font-bold mb-2 text-[#39827a]">Appointment Details</h2>
            <p className="text-gray-500 mb-4"><strong>Patient Name:</strong> {selectedAppointment.fname + " " + selectedAppointment.lname}</p>
            <p className="text-gray-500 mb-4"><strong>Date:</strong> {new Date(selectedAppointment.due_date).toLocaleDateString()}</p>
            <p className="text-gray-500 mb-4"><strong>Reason:</strong> {selectedAppointment.reason}</p>
            <p className="text-gray-500 mb-4"><strong>Gender:</strong> {selectedAppointment.gender}</p>
            <p className="text-gray-500 mb-4"><strong>Marital Status:</strong> {!selectedAppointment.married ? "Single" : "Married"}</p>
            <p className="text-gray-500 mb-4"><strong>Smoking:</strong> {selectedAppointment.smoking_status}</p>
            <p className="text-gray-500 mb-4"><strong>Phone:</strong> {selectedAppointment.phone}</p>
            <p className="text-gray-500 mb-4"><strong>Emergency Contact:</strong> {selectedAppointment.emergency_contact + " (" + selectedAppointment.emergency_contact_name + ")"}</p>
            <button
              className="mt-4 px-4 py-2 bg-[#39827a] text-white rounded hover:bg-[#2e6d62]"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;
