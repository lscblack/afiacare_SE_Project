import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar'; 
import MyApi from "../../AxiosInstance/MyApi";
import { toast } from 'react-toastify';
import { RiMore2Fill } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai'; 
import AvatarImg from "../../assets/images/avatar.png";

// import dashboards
import AdminDashboard from '../../Components/Admin/AdminDashboard';
import UserDashboard from '../../Components/User/UserDashboard';
import NurseDashboard from '../../Components/Nurse/NurseDashboard';
import HospitalDashboard from '../../Components/Hospital/HospitalDashboard';
import MinisterDashboard from '../../Components/Minister/MinisterDashboard';

function Ministers() {
  const [showMenuSmall, setShowMenuSmall] = useState(true);
  const [currentUser, setCurrentUser] = useState("admin");
  const [error, setError] = useState(null);
  const [ministers, setMinisters] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);


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

  const getMinisters = async () => {
    try {
      const response = await MyApi.get(`/admin/all_ministers`);
      setMinisters(response.data);
    } catch (error) {
      setError(error.response.data.detail || 'An error occurred');
    }
  };

  useEffect(() => {
    getMinisters();
  }, []);


  const handleMoreClick = (user) => {
    setSelectedministers(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedministers(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredministers = ministers.filter((user) =>
    user.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.acc_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMinister = async () => {
    try {
      const response = await MyApi.get(`/admin/all_users`);
      setUsers(response);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(error.response || 'An error occurred');
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
            <h2 className="text-2xl font-bold mb-2 text-[#39827a]">Ministers</h2>
            <p className="text-gray-500 mb-4">View and manage upcoming ministers.</p>

            <div className="overflow-x-auto flex items-start gap-4 md:gap-0 justify-normal md:justify-between flex-wrap pb-5">
              <div className="min-w-full md:min-w-[65%] shadow-lg mt-5">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search ministers"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-3/4 mb-4 p-2 bg-transparent border border-gray-300 rounded text-gray-500 outline-none"
                  />
                  <select name="" id="" className='w-1/4 mb-4 p-2 bg-transparent border border-gray-300 rounded text-gray-500 outline-none' onChange={(e) => setSearchQuery(e.target.value) }>
                    <option value="">All</option>
                    <option value="minister">Minister</option>
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
                    {!error && !ministers.length && [0, 1, 2, 3, 4, 5].map((i) => (
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
                          <th className="text-left py-2 px-4 border-b border-gray-300 text-gray-700">
                            <div className="bg-gradient-to-r from-gray-100 to-gray-300 w-full h-3 mr-2 rounded-sm animate-pulse"></div>
                          </th>
                        </tr>

                      ))}
                      {error ? (
                        <tr><td colSpan="5" className="text-center py-2 px-4 border-b border-gray-200 text-gray-500">{error}</td></tr>
                      ) : (
                        filteredministers.map((user) => (
                          <tr key={user.id} className="cursor-pointer" onClick={(e) => { e.stopPropagation(); handleMoreClick(user); }}>
                            <td className="py-2 px-4 border-b border-gray-200 text-gray-500">{user.fname + " " + user.lname}</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-gray-500">{new Date(user.dob).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-gray-500">{user.acc_type}</td>
                            <td className="py-2 px-4 border-b border-gray-200 text-gray-500">
                              <div className='cursor-pointer  text-[#39827a]' >
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

              {/* More Details */}
              {filteredministers.length > 0 ? (
                
              <div className='shadow-lg w-full md:w-[30%] min-h-full mt-5 bg-white rounded-sm border border-gray-200 p-2'>
                <div className='relative'>
                  <img
                    className='h-32 w-32 rounded-full mx-auto'
                    src={AvatarImg}
                    alt='user profile'
                  /> 
                  
                  <div
                    className='absolute right-1 top-1 bg-white border border-gray-300 rounded-full p-1 cursor-pointer text-[#39827a]'
                    onClick={() => setSelectedUser(null)}
                  >
                    <AiOutlineClose size={20} />
                  </div>
                </div>
                <div className='p-2'>
                  {selectedUser ? (
                    <>
                      <h3 className='text-center text-lg font-bold'>{selectedUser.fname + ' ' + selectedUser.lname}</h3>
                      <p className='text-center text-gray-500 mb-2'>{selectedUser.acc_type}</p>
                      <div className='text-gray-700'>
                      <p className="text-gray-500 mb-4"><strong>Name:</strong> {selectedUser.fname + " " + selectedUser.lname}</p>
                      <p className="text-gray-500 mb-4"><strong>Username:</strong> {selectedUser.username}</p>
                      <p className="text-gray-500 mb-4"><strong>Email:</strong> {selectedUser.email}</p>
                      <p className="text-gray-500 mb-4"><strong>DoB:</strong> {new Date(selectedUser.dob).toLocaleDateString()}</p>
                      <p className="text-gray-500 mb-4"><strong>Phone:</strong> {!selectedUser.phone ? "N/A" : selectedUser.phone}</p>
                      <p className="text-gray-500 mb-4"><strong>Emergency Contact:</strong> {!selectedUser.emergency_contact ? "N/A" : selectedUser.emergency_contact }</p>
                      <p className="text-gray-500 mb-4"><strong>Emergency Name:</strong> {!selectedUser.emergency_contact_name ? "N/A" : selectedUser.emergency_contact_name }</p>
                      </div>
                    </>
                  ) : (
                    <p className='text-center text-gray-500'>No user selected</p>
                  )}
                </div>
              </div>
              ) : (
                <div className='w-full md:w-[30%] min-h-full mt-5 bg-white rounded-sm border border-gray-200 p-2'>
                  <button className='text-white w-full bg-[#39827a] p-2 rounded' onClick={handleAddMinister}>Add Minister</button>
                  {/* display users here */}
                </div>
              )
              
              }

            </div>
          </div>
        )}
        {currentUser !== 'admin' && renderDashboard()}
      </div>

      {isModalOpen && selectedministers && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg w-[90%] max-w-lg relative">
              <button className="absolute top-4 right-5 text-gray-500 hover:text-gray-700" onClick={closeModal}>
                <AiOutlineClose size={24} />
              </button>
            <h2 className="text-2xl font-bold mb-2 text-[#39827a]">User Details</h2>
            <p className="text-gray-500 mb-4"><strong>Name:</strong> {selectedministers.fname + " " + selectedministers.lname}</p>
            <p className="text-gray-500 mb-4"><strong>Username:</strong> {selectedministers.username}</p>
            <p className="text-gray-500 mb-4"><strong>Email:</strong> {selectedministers.email}</p>
            <p className="text-gray-500 mb-4"><strong>DoB:</strong> {new Date(selectedministers.dob).toLocaleDateString()}</p>
            <p className="text-gray-500 mb-4"><strong>Phone:</strong> {!selectedministers.phone ? "N/A" : selectedministers.phone}</p>
            <p className="text-gray-500 mb-4"><strong>Emergency Contact:</strong> {!selectedministers.emergency_contact ? "N/A" : selectedministers.emergency_contact }</p>
            <p className="text-gray-500 mb-4"><strong>Emergency Name:</strong> {!selectedministers.emergency_contact_name ? "N/A" : selectedministers.emergency_contact_name }</p>
            <hr className='mb-4'/>
            <p className="text-sm text-[#c04c44]"><strong>Danger zone:</strong> You are about to delete this user.</p>
            <button
              className="mt-4 px-4 py-2 bg-[#a52920] text-white rounded hover:bg-[#ca352b]"
              onClick={() => deleteUser(selectedministers.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ministers;
