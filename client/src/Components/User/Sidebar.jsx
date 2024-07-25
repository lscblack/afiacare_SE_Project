import React, { useContext, createContext, useState, useEffect } from "react";
import Logo from "../../assets/images/afiacare.svg";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { IoMdMore } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogin } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import ProfileAvatar from "../../assets/images/avatar.png";
import { useSelector } from "react-redux";
import { resetStateToDefault } from "../../features/SharedDataSlice/SharedData";
import { useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { LuLayoutDashboard } from 'react-icons/lu';
import { FaHospitalUser } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { BiSolidDonateBlood } from "react-icons/bi";
import { MdForum, MdContactSupport } from "react-icons/md";
import { GrEmergency } from "react-icons/gr";
import { FaHospitalAlt } from "react-icons/fa";
import { SiFigshare } from "react-icons/si";

const SidebarContext = createContext();

export function SidebarItem({ icon, text, active, alert, link }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link to={link || '#'}>
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-sm rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-slate-50 to-slate-100 text-[#39827a]" : "hover:bg-gray-50 text-gray-500"}`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-[#5bbbb0] ${expanded ? "" : "top-2"}`}
          />
        )}
        {!expanded && (
          <div className="absolute left-full rounded-md px-2 py-1 ml-6 text-xs text-white bg-[#39827a] invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}

function Sidebar({ children }) {
  const UserInfo = useSelector(state => state.afiaCare.usersLogin);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setExpanded(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const LogoutUser = () => {
    if (dispatch(resetStateToDefault())) {
      window.location.href = "/authentication";
    }
  };

  const sidebarItems = [
    { icon: <LuLayoutDashboard size={20} />, text: "Dashboard", link: "/dashboard", alert: true },
    UserInfo.UserInfo.acc_status && { icon: <FaHospitalUser size={20} />, text: "Consultations", link: "/user/consultations" },
    UserInfo.UserInfo.acc_status && { icon: <BiSolidDonateBlood size={20} />, link: "/user/donations", text: "Donations", alert: true },
    { icon: <GrEmergency size={20} />, link: "/user/emergency", text: "Emergency" },
    { icon: <FaHospitalAlt size={20} />,link: "/facilities", text: "Facilities" },
    UserInfo.UserInfo.acc_status && { icon: <MdForum size={20} />, text: "Messages", alert: true },
    UserInfo.UserInfo.acc_status && { icon: <IoIosSettings size={20} />, text: "Settings", alert: true },
    { icon: <MdContactSupport size={20} />, text: "Support" }
  ].filter(Boolean);

  return (
    <aside className={`h-screen ${expanded ? "w-64" : "w-20"} transition-all`}>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={Logo}
            alt="logo"
            className={`overflow-hidden transition-all ${expanded ? "w-20" : "w-10"}`}
          />
          <button
            onClick={() => setExpanded(!expanded)} className="p-1.5 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 duration-300"
          >
            {expanded ? <LuChevronFirst /> : <LuChevronLast />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {sidebarItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                text={item.text}
                alert={item.alert}
                link={item.link}
                active={item.link === location.pathname}
              />
            ))}
          </ul>
        </SidebarContext.Provider>

        <div className="border-t flex flex-col p-3 relative">
          <img src={UserInfo.UserInfo.avatar ? UserInfo.UserInfo.avatar : ProfileAvatar} className="w-12 h-12 rounded-full" alt="" />
          <div
            className={`flex justify-between items-center ml-3 overflow-hidden transition-all ${expanded ? "w-52" : "w-0"}`}
          >
            <div className="leading-5">
              <h4 className="text-gray-500 font-semibold">{UserInfo.UserInfo.fname + " " + UserInfo.UserInfo.lname}</h4>
              <span className="text-gray-400 text-xs">{UserInfo.UserInfo.email}</span>
            </div>
            <button onClick={() => setActionsVisible(!actionsVisible)}>
              <IoMdMore size={24} className="text-gray-400" />
            </button>
          </div>
          {actionsVisible && (
            <div className="absolute right-0 bottom-12 w-48 bg-white border rounded shadow-lg p-4">
              <ul className="text-gray-500 ">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b flex items-center gap-x-2"><CgProfile /> View Profile</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b flex items-center gap-x-2"> <IoSettingsOutline /> Settings</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-400 flex items-center gap-x-2" onClick={LogoutUser}><AiOutlineLogin /> Log Out</li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
