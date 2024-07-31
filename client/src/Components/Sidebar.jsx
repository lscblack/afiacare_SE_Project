import React, { useContext, createContext, useState, useEffect } from "react";
import Logo from "../assets/images/afiacare.svg";
import { LuChevronFirst, LuChevronLast, LuLayoutDashboard } from "react-icons/lu";
import { IoMdMore, IoIosSettings } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogin } from "react-icons/ai";
import ProfileAvatar from "../assets/images/avatar.png";
import { useSelector } from "react-redux";
import { ChangeDefault, resetStateToDefault } from "../features/SharedDataSlice/SharedData";
import { useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaHospitalUser, FaHospitalAlt, FaUsers, FaCalendarAlt, FaUserNurse, FaClipboardList } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";
import { MdForum, MdContactSupport, MdDashboardCustomize, MdPeople, MdPerson, MdAccessTime, MdReport, MdSettings, MdHealthAndSafety } from "react-icons/md";
import { GrEmergency } from "react-icons/gr";
import { TbGraphFilled } from "react-icons/tb";
import { FaCalendarMinus } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaFolderPlus } from "react-icons/fa";

const SidebarContext = createContext();

export function SidebarItem({ icon, text, active, alert, link }) {
  const defaultUser = useSelector(state => state.afiaCare.defaultView);
  const dispatch = useDispatch()
  const linkAction = (action) => {
    if (action == defaultUser) {
      window.location.href = ""
    } else {
      dispatch(ChangeDefault(action))
    }
  }
  const { expanded } = useContext(SidebarContext);
  // useEffect(() => {
  //   if (link == "/dashboard" && defaultUser !== "") {
  //     window.location.href = ""//
  //   }
  // }, [link])
  return (
    <>
      
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
      
        
    </>
  );
}

function Sidebar({ currentUser, setCurrentUser }) {
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

  const getSidebarItems = acc_type => {
    if (acc_type === "patient") {
      return [
        { icon: <LuLayoutDashboard size={20} />, text: "Dashboard", link: "/dashboard", alert: true },
        // UserInfo.UserInfo.acc_status && { icon: <FaHospitalUser size={20} />, text: "View Records", link: "/records" },
        UserInfo.UserInfo.acc_status && { icon: <FaHospitalUser size={20} />, text: "View Appointments", link: "/appointments" },
        // UserInfo.UserInfo.acc_status && { icon: <FaHospitalUser size={20} />, text: "Consultations", link: "/user/consultations" },
        // UserInfo.UserInfo.acc_status && { icon: <BiSolidDonateBlood size={20} />, link: "/user/donations", text: "Donations", alert: true },
        // { icon: <GrEmergency size={20} />, link: "/user/emergency", text: "Emergency" },
        { icon: <FaHospitalAlt size={20} />, link: "/facilities", text: "Facilities" },
        // UserInfo.UserInfo.acc_status && { icon: <MdForum size={20} />, text: "Messages", link: "/user/messages", alert: true },
        // UserInfo.UserInfo.acc_status && { icon: <IoIosSettings size={20} />, text: "Settings", link: "/user/settings", alert: true },
        // { icon: <MdContactSupport size={20} />, text: "Support", link: "/user/support" }
      ];
    } else if (acc_type === "doctor") {
      return [
        { icon: <MdDashboardCustomize size={20} />, text: "Dashboard", link: "/doctor/dashboard" },
        { icon: <FaCalendarMinus size={20} />, text: "Appointments", link: "/doctor/appointments" },
        // { icon: <FaUsers size={20} />, text: "Patients", link: "/doctor/patients" },
        // { icon: <TbGraphFilled size={20} />, text: "Statistics", link: "/doctor/statistics" },
        // { icon: <MdForum size={20} />, text: "Forums", link: "/doctor/forums" },
        // { icon: <FaPlusCircle size={20} />, text: "Requests", link: "/doctor/requests" },
        // { icon: <FaFolderPlus size={20} />, text: "Test Results", link: "/doctor/test-results" },
      ];
    } else if (acc_type === "admin") {
      return [
        { icon: <MdDashboardCustomize size={20} />, text: "Dashboard", link: "/admin/dashboard" },
        // { icon: <MdPeople size={20} />, text: "Manage Doctors", link: "/admin/manage-doctors" },
        { icon: <MdPerson size={20} />, text: "Manage Users", link: "/admin/users" },
        // { icon: <MdAccessTime size={20} />, text: "View Appointments", link: "/admin/view-appointments" },
        // { icon: <MdReport size={20} />, text: "Reports", link: "/admin/reports" },
        // { icon: <MdSettings size={20} />, text: "Settings", link: "/admin/settings" }
      ];
    } else if (acc_type === "nurse") {
      return [
        { icon: <MdDashboardCustomize size={20} />, text: "Dashboard", link: "/nurse/dashboard" },
        { icon: <FaUserNurse size={20} />, text: "Patients", link: "/nurse/patients" },
        { icon: <MdHealthAndSafety size={20} />, text: "Health Records", link: "/nurse/health-records" },
        { icon: <FaClipboardList size={20} />, text: "Tasks", link: "/nurse/tasks" },
        { icon: <MdForum size={20} />, text: "Forums", link: "/nurse/forums" },
        { icon: <MdContactSupport size={20} />, text: "Support", link: "/nurse/support" }
      ];
    } else if (acc_type === "minister") {
      return [
        { icon: <MdDashboardCustomize size={20} />, text: "Dashboard", link: "/minister/dashboard" },
        { icon: <FaUsers size={20} />, text: "Manage Health Programs", link: "/minister/manage-health-programs" },
        { icon: <MdReport size={20} />, text: "Reports", link: "/minister/reports" },
        { icon: <FaHospitalAlt size={20} />, text: "Facilities", link: "/minister/facilities" },
        { icon: <TbGraphFilled size={20} />, text: "Statistics", link: "/minister/statistics" },
        { icon: <MdContactSupport size={20} />, text: "Support", link: "/minister/support" }
      ];
    } else if (acc_type === "hospital") {
      return [
        { icon: <MdDashboardCustomize size={20} />, text: "Dashboard", link: "/hospital/dashboard" },
        { icon: <FaCalendarAlt size={20} />, text: "Manage Appointments", link: "/hospital/manage-appointments" },
        { icon: <FaUsers size={20} />, text: "Manage Patients", link: "/hospital/manage-patients" },
        { icon: <MdForum size={20} />, text: "Forums", link: "/hospital/forums" },
        { icon: <MdContactSupport size={20} />, text: "Support", link: "/hospital/support" }
      ];
    }
  };

  const sidebarItems = getSidebarItems(currentUser);



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
