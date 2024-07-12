import React, { useEffect, useState } from "react";
import AvatarImg from "../assets/images/avatar.png";
import { FiSearch } from "react-icons/fi";
import { AiOutlineBell } from "react-icons/ai";

function Navbar() {
  const [greeting, setGreeting] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-lg font-semibold text-[#39827a]">
        {greeting}, Simeon
      </h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="p-2 pl-10 border rounded-lg"
          />
          <FiSearch className="absolute left-3 top-2 text-gray-400" />
        </div>
        <button className="relative">
          <AiOutlineBell className="text-[#39827a] text-2xl" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
        <div className="relative">
          <img
            src={AvatarImg}
            w-10
            h-10
            rounded-full
            border--2
            border-white
            shadow-md
            cursor-pointer
            alt="Avatar"
            className="w-10 h-10 rounded-full border-2 border-white shadow-md cursor-pointer"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
              <button className="w-full text-left p-2 hover:bg-gray-100">
                Switch to Doctor account
              </button>
            </div>
          )}
          w-10 h-10 rounded-full border--2 border-white shadow-md cursor-pointer
          <span
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full tooltip"
            title="Online"
            w-10
            h-10
            rounded-full
            border--2
            border-white
            shadow-md
            cursor-pointer
          ></span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
