import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar'; 
import AppointmentHistory from '../../Components/Doctor/AppointmentHistory';
import MyApi from "../../AxiosInstance/MyApi";
import { toast } from 'react-toastify';
import { RiMore2Fill } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai'; 

// import dashboards
import AdminDashboard from '../../Components/Admin/AdminDashboard';
import UserDashboard from '../../Components/User/UserDashboard';
import NurseDashboard from '../../Components/Nurse/NurseDashboard';
import HospitalDashboard from '../../Components/Hospital/HospitalDashboard';
import MinisterDashboard from '../../Components/Minister/MinisterDashboard';

function Users() {
  const [showMenuSmall, setShowMenuSmall] = useState(true);
  const [currentUser, setCurrentUser] = useState("admin");
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(null);
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

  const getUsers = async () => {
    try {
      const response = await MyApi.get(`/admin/all_users`);
      setUsers(response.data);
    } catch (error) {
      setError(error.response.data.detail || 'An error occurred');
    }
  };

  useEffect(() => {
    getUsers();
  }, []);


  const handleMoreClick = (user) => {
    setSelectedUsers(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUsers(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.acc_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteUser = async (id) => {
      try {
          // Send the userId in the request body
          const response = await MyApi.delete('/admin/user/remove', {
              data: { userId: id } // Use `data` to send the body for DELETE requests
          });
          console.log(response);
          closeModal();
          toast.warning('User deleted successfully');
          getUsers();
      } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.detail || 'An error occurred');
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
        {currentUser === 'admin' && (
          <div className="p-5 bg-white rounded-md m-5">
            <h2 className="text-2xl font-bold mb-2 text-[#39827a]">Users</h2>
            <p className="text-gray-500 mb-4">View and manage upcoming users.</p>

            <div className="overflow-x-auto flex items-start gap-4 md:gap-0 justify-normal md:justify-between flex-wrap pb-5">
              <div className="min-w-full md:min-w-[65%] shadow-lg mt-5">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search users"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-3/4 mb-4 p-2 bg-transparent border border-gray-300 rounded text-gray-500 outline-none"
                  />
                  <select name="" id="" className='w-1/4 mb-4 p-2 bg-transparent border border-gray-300 rounded text-gray-500 outline-none' onChange={(e) => setSearchQuery(e.target.value) }>
                    <option value="">All</option>
                    <option value="minister">MInister</option>
                    <option value="hospital">Hospital</option>
                    <option value="doctor">Doctor</option>
                    <option value="nurse">Nurse</option>
                    <option value="patient">Patient</option>
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead>
                      <tr>
                        <th className="text-left py-2 px-4 border-b border-gray-300 text-gray-700">Patient Name</th>
                        <th className="text-left py-2 px-4 border-b border-gray-300 text-gray-700">Date of Birth</th>
                        <th className="text-left py-2 px-4 border-b border-gray-300 text-gray-700">Type</th>
                        <th className="text-left py-2 px-4 border-b border-gray-300 text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {error ? (
                        <tr><td colSpan="5" className="text-center py-2 px-4 border-b border-gray-200 text-gray-500">{error}</td></tr>
                      ) : (
                        filteredUsers.map((user) => (
                          <tr key={user.id} className="cursor-pointer">
                            <td className="py-2 px-4 border-b border-gray-200 text-gray-500">{user.fname + " " + user.lname}</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-gray-500">{new Date(user.dob).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-gray-500">{user.acc_type}</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-gray-500">
                              <div className='cursor-pointer  text-[#39827a]' onClick={(e) => { e.stopPropagation(); handleMoreClick(user); }}>
                                <RiMore2Fill size={17} className='m-auto'/>
                              </div>
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
        {currentUser !== 'admin' && renderDashboard()}
      </div>

      {isModalOpen && selectedUsers && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg w-[90%] max-w-lg relative">
              <button className="absolute top-4 right-5 text-gray-500 hover:text-gray-700" onClick={closeModal}>
                <AiOutlineClose size={24} />
              </button>
            <h2 className="text-2xl font-bold mb-2 text-[#39827a]">User Details</h2>
            <p className="text-gray-500 mb-4"><strong>Name:</strong> {selectedUsers.fname + " " + selectedUsers.lname}</p>
            <p className="text-gray-500 mb-4"><strong>Username:</strong> {selectedUsers.username}</p>
            <p className="text-gray-500 mb-4"><strong>Email:</strong> {selectedUsers.email}</p>
            <p className="text-gray-500 mb-4"><strong>DoB:</strong> {new Date(selectedUsers.dob).toLocaleDateString()}</p>
            <p className="text-gray-500 mb-4"><strong>Phone:</strong> {!selectedUsers.phone ? "N/A" : selectedUsers.phone}</p>
            <p className="text-gray-500 mb-4"><strong>Emergency Contact:</strong> {!selectedUsers.emergency_contact ? "N/A" : selectedUsers.emergency_contact }</p>
            <p className="text-gray-500 mb-4"><strong>Emergency Name:</strong> {!selectedUsers.emergency_contact_name ? "N/A" : selectedUsers.emergency_contact_name }</p>
            <hr className='mb-4'/>
            <p className="text-sm text-[#c04c44]"><strong>Danger zone:</strong> You are about to delete this user.</p>
            <button
              className="mt-4 px-4 py-2 bg-[#a52920] text-white rounded hover:bg-[#ca352b]"
              onClick={() => deleteUser(selectedUsers.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
