import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhoneSquareAlt,
} from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import { Link } from "react-router-dom";
import SubLogo from "./../assets/images/aviacare_full_white.svg";
import { IoIosArrowForward } from "react-icons/io";
import FooterImg from "./../assets/images/footerimg.png";
function Footer() {
  return (
    <footer className="bg-[#39827a] text-white py-1">
      <div>
        <div className="flex flex-col md:flex-row items-center justify-between py-0 md:px-4">
          <div className="md:w-[60%]  ">
            <img src={SubLogo} className="w-[250px] " alt="" />
          </div>
          <div className="md:w-[30%] mb-20 md:mb-0">
            <p className="text-sm font-light mb-2 text-[19px]">
              Sign up for our{" "}
              <span className="text-[#fff] font-medium">Newsletter</span>
            </p>
            <input
              type="email"
              placeholder="Enter your email" className="p-2 md:w-[65%]    outline-none bg-[#f5f5f5] rounded text-gray-500"
            />
            <button className="absolute right-[120px]  md:right-40 mt-1 bg-[#398274] text-white p-2 rounded">
              <IoIosArrowForward />
            </button>
          </div>
        </div>
        <hr className="w-[90%] m-auto" />
        <div className="flex flex-col md:flex-row justify-between items-center px-20 py-2">
          <div className="">
            <h2 className="text-xl font-semibold text-[18px] mb-4">
              Quick Links
            </h2>
            <ul className="flex flex-col space-y-2 text-center">
              <li className="text-gray-200 hover:text-white font-light">
                <Link to="/">Home</Link>
              </li>
              <li className="text-gray-200 hover:text-white font-light">
                <Link to="/about">About</Link>
              </li>
              <li className="text-gray-200 hover:text-white font-light">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="text-gray-200 hover:text-white font-light">
                <Link to="/services">Services</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <h2 className="text-xl font-semibold text-[18px] mb-4 mt-4 md:mt-0 text-center">
              Contact us
            </h2>
            <ul className="flex flex-col space-y-2 items-center mb-4">
              <li className="text-gray-200 hover:text-white font-light">
                <a href="tel:+1234567890" className="flex items-center gap-1">
                  <FaPhoneSquareAlt /> +1234567890
                </a>
              </li>
              <li className="text-gray-200 hover:text-white font-light">
                <a
                  href="mailto:Qp6Xa@example.com" className="flex items-center gap-1"
                >
                  <MdMarkEmailRead /> Qp6Xa@example.com
                </a>
              </li>
              <li className="text-gray-200 hover:text-white font-light">
                <a
                  href="https://www.google.com/maps" className="flex items-center gap-1"
                >
                  <HiLocationMarker /> 123 Main St, Anytown USA
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[18px] mb-4 text-center">
              Follow us
            </h2>
            <ul className="flex space-x-4 mb-4">
              <li>
                <a href="https://www.facebook.com/">
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/">
                  <FaLinkedin />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <img
              src={FooterImg} className="w-[200px] md:w-[400px] md:h-[400px] border rounded-full object-cover"
              alt=""
            />
          </div>
        </div>
        <p className="text-center text-sm mt-4">
          © 2023 afiacare. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
