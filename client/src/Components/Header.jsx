import React, { useState, useEffect } from "react";
import logo from "./../assets/images/afiacare.svg";
import { HiBars3BottomRight } from "react-icons/hi2";
import HeaderItem from "./HeaderItem";

function Header() {
  const [toggle, setToggle] = useState(false);
  const [scrollColor, setScrollColor] = useState("bg-slate-100");

  const menu = [
    { name: "Home", link: "/home" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/" },
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
      className={`flex items-center justify-between py-0 px-10 sticky top-0 left-0 right-0 z-[100] duration-300 ${scrollColor}`}
    >
      <div className="flex items-center justify-between gap-80 z-[1500]">
        <img src={logo} className="w-[60px] md:w-[80px] object-cover" alt="" />
        <div className="hidden md:flex gap-8 ">
          {menu.map((item) => (


            <HeaderItem key={item.name} goto={item.link} name={item.name} />
          
          ))}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden" onClick={() => setToggle(!toggle)}>
          <HiBars3BottomRight
            size={35} className="cursor-pointer absolute text-[#39827a] top-4 right-7 bg-slate-200 p-1 rounded"
          />
          {toggle ? (
            <div className="absolute top-14 right-2 w-[95%] bg-[#ffffff] p-5 border rounded-sm">
              {menu.map((item) => (
                <HeaderItem key={item.name} goto={item.link} name={item.name} />
              ))}
              <div className="items-center gap-2 flex mt-5 justify-center">
                <button className="bg-[#39827a] w-[100px] md:w-[120px] rounded-md font-medium px-3 py-2 hover:bg-[#1D6559] duration-300">
                  Login
                </button>
                <button className="bg-[#ffffff] w-[100px] text-[#39827a] md:w-[120px] rounded-md font-medium px-3 py-2 border hover:bg-[#39827a] hover:text-[#ffffff] duration-300">
                  Register
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="items-center gap-5 hidden md:flex">
        <button className="bg-[#39827a] w-[100px] md:w-[120px] rounded-md font-medium px-3 py-2 hover:bg-[#1D6559] duration-300">
          Login
        </button>
        <button className="bg-[#ffffff] w-[100px] text-[#39827a] md:w-[120px] rounded-md font-medium px-3 py-2 border hover:bg-[#39827a] hover:text-[#ffffff] duration-300">
          Register
        </button>
      </div>
    </div>
  );
}

export default Header;
