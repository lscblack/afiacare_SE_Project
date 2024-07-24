import React, { useEffect, useState } from "react";
import AvatarImg from "../../assets/images/avatar.png";
import FlagEN from "../../assets/images/en-flag.png"; // Replace with your actual flag image path
import FlagES from "../../assets/images/fr-flag.png"; // Replace with your actual flag image path
import { FiSearch } from "react-icons/fi";
import { AiOutlineLogin } from "react-icons/ai";
import { AiOutlineBell } from "react-icons/ai";
import { IoLanguageOutline } from "react-icons/io5";
import { MdWavingHand } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LuLayoutDashboard } from 'react-icons/lu';
import { useNavigate } from "react-router-dom";
import { resetStateToDefault } from "../../features/SharedDataSlice/SharedData";

function Navbar({ showMenuSmall, setShowMenuSmall }) {
  const UserInfo = useSelector(state => state.afiaCare.usersLogin);
  const dispatch = useDispatch()
  const nav = useNavigate()
  const [greeting, setGreeting] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setLanguageDropdownOpen(false); // Close language dropdown when profile is opened
  };

  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
  };
  const LogoutUser = () => {
    if (dispatch(resetStateToDefault())) {
      window.location.href = "/authentication"
    }
  }

  return (
    <div className="flex bg-white flex-col-reverse md:flex-row justify-between items-center px-4 md:px-8 py-4">
      <h1 className="text-lg hidden lg:flex items-center gap-2 font-semibold text-gray-500">
        {greeting}, <span className="text-[#57bdb1] text-[22px]">{UserInfo.UserInfo.username}</span>
        <MdWavingHand className="wave-icon" />
      </h1>
      <div className="flex max-lg:w-full justify-between">
        <button onClick={()=>setShowMenuSmall(!showMenuSmall)} className=" max-md:block hidden"><LuLayoutDashboard className="text-slate-700 text-4xl"/></button>
        <div className="flex items-center gap-4 ml-auto">
          <div className="relative max-sm:hidden">
            <input
              type="text"
              placeholder="Search..." className="p-2 pl-8 border rounded-lg text-sm bg-white text-gray-400 outline-none "
              style={{ width: "200px" }}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="relative">
            <button
              onClick={toggleNotification} className="text-gray-400 text-xl relative bg-white p-1 rounded-md"
            >
              <AiOutlineBell size={30} className="font-normal" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full"></span>
            </button>
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md z-10">
                {!UserInfo.UserInfo.email_confirm &&
                  <div className="p-2 px-4 text-gray-600 cursor-pointer"
                  >
                    <span className="text-red-500 font-bold">
                      Email not verified
                    </span>
                    <br></br> <span className="text-xs">(Fill The OnBoarding To Have Full Access)</span>
                    <span className="absolute top-4 right-4 w-2 h-2 bg-red-400 rounded-full"></span>
                  </div>
                }
              </div>
            )}
          </div>
          <div className="relative">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                src={UserInfo.UserInfo.avatar ? UserInfo.UserInfo.avatar : AvatarImg}
                alt={UserInfo.UserInfo.username} className="w-full h-full rounded-full border border-white shadow-md cursor-pointer"
                onClick={toggleDropdown}
              />
            </div>


            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 p-2 bg-white border rounded-lg shadow-lg z-10">
                {UserInfo.UserInfo.acc_type !== "patient" && <>
                  <p className="text-gray-600 text-center font-medium ">You're in as a user</p>
                  <button className="w-full text-[#57bdb1] text-center p-2 hover:bg-gray-100">
                    Switch Profile
                  </button>
                </>}

                <hr />
                <button className="w-full text-red-500 text-center p-2 hover:bg-gray-100 flex items-center gap-2" onClick={() => LogoutUser()}>
                  <AiOutlineLogin /> Logout
                </button>
                <button className="w-full text-[#57bdb1] text-center p-2 hover:bg-gray-100 flex items-center gap-2" onClick={toggleLanguageDropdown}>
                  <IoLanguageOutline /> Change Language
                </button>
                {languageDropdownOpen && (
                  <div className="mt-2">
                    <button className="flex items-center gap-2 w-full text-gray-600 hover:bg-gray-100 p-2">
                      <img src={FlagEN} alt="English" className="w-5 h-5" /> English
                    </button>
                    <button className="flex items-center gap-2 w-full text-gray-600 hover:bg-gray-100 p-2">
                      <img src={FlagES} alt="Spanish" className="w-5 h-5" /> French
                    </button>
                  </div>
                )}

              </div>
            )}
            <span className="absolute top-8 right-1 w-2 h-2 bg-green-500 rounded-full" title="Online"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;