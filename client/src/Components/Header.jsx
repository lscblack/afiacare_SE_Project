import React, { useState, useEffect } from "react";
import logo from "./../assets/images/afiacare.svg";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import HeaderItem from "./HeaderItem";
import enFlag from "./../assets/images/en-flag.png"; // Add your English flag image
import frFlag from "./../assets/images/fr-flag.png"; // Add your French flag image

function Header() {
  const [toggle, setToggle] = useState(false);
  const [languageToggle, setLanguageToggle] = useState(false);
  const [scrollColor, setScrollColor] = useState("bg-slate-100");

  const menu = [
    { name: "Home", link: "/home" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Services", link: "/" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrollColor("bg-[#ffffff]");
      } else {
        setScrollColor("bg-slate-100");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex items-center justify-between py-2 px-6 md:px-10 sticky top-0 left-0 right-0 z-[100] duration-300 ${scrollColor}`}
    >
      <div className="flex items-center justify-between w-full">
        <img src={logo} className="w-[60px] md:w-[80px] object-cover" alt="" />

        <div className="flex items-center md:hidden gap-2">
          {/* Mobile language toggle button */}
          <div className="relative">
            <button
              onClick={() => setLanguageToggle(!languageToggle)} className="flex items-center text-[#39827a] gap-1 px-2 py-1 border rounded cursor-pointer"
            >
              <img src={enFlag} alt="EN" className="w-5 h-5" />
              En
              <IoIosArrowDown />
            </button>
            {languageToggle && (
              <div className="absolute left-0 mt-2 w-[120px] bg-white border rounded shadow-lg">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:bg-gray-100 w-full">
                  <img src={enFlag} alt="EN" className="w-5 h-5" />
                  English
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:bg-gray-100 w-full">
                  <img src={frFlag} alt="FR" className="w-5 h-5" />
                  French
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu */}
          <HiBars3BottomRight
            size={30} className="cursor-pointer text-[#39827a] bg-slate-200 p-1 rounded"
            onClick={() => setToggle(!toggle)}
          />
          {toggle && (
            <div className="absolute top-14 right-2 w-[95%] bg-[#ffffff] p-4 border rounded-sm shadow-lg">
              {menu.map((item) => (
                <HeaderItem key={item.name} goto={item.link} name={item.name} />
              ))}
              <div className="flex items-center gap-2 mt-4">
                <button className="bg-[#39827a] text-white w-[100px] rounded-md font-medium px-3 py-2 hover:bg-[#1D6559] duration-300">
                  Login
                </button>
                <button className="bg-[#ffffff] text-[#39827a] border w-[100px] rounded-md font-medium px-3 py-2 border-[#39827a] border-solid hover:bg-[#39827a] hover:text-white duration-300">
                  Register
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:flex gap-6">
          {menu.map((item) => (
            <HeaderItem key={item.name} goto={item.link} name={item.name} />
          ))}
        </div>

        {/* Language Toggle Button for larger screens */}
        <div className="hidden md:block relative">
          <button
            onClick={() => setLanguageToggle(!languageToggle)} className="flex items-center text-[#39827a] gap-1 px-2 py-1 border rounded cursor-pointer"
          >
            <img src={enFlag} alt="EN" className="w-5 h-5" />
            En
            <IoIosArrowDown />
          </button>
          {languageToggle && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:bg-gray-100 w-full">
                <img src={enFlag} alt="EN" className="w-5 h-5" />
                English
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:bg-gray-100 w-full">
                <img src={frFlag} alt="FR" className="w-5 h-5" />
                French
              </button>
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-5">
          <button className="bg-[#39827a] text-white w-[100px] rounded-md font-medium px-3 py-2 hover:bg-[#1D6559] duration-300">
            Login
          </button>
          <button className=" text-[#39827a] border w-[100px] rounded-md font-medium px-3 py-2 border-[#39827a] border-solid hover:bg-[#39827a] hover:text-white duration-300">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
