import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';
function Footer() {
  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState(""); // State to track selected language
  return (
    <footer className="bg-[#39827a] text-white py-1">
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between py-0 md:px-4">
        <div className="md:w-[60%]">
          <img src={SubLogo} className="w-[250px]" alt="Afiacare Logo" />
        </div>
        <div className="md:w-[30%] mb-20 md:mb-0">
          <p className="text-sm font-light mb-2 text-[19px]">
            {lang.footer_newsletter}{" "}

          </p>
          <input
            type="email"
            placeholder={lang.placeholder_email} className="p-2 md:w-[65%] outline-none bg-[#f5f5f5] rounded text-gray-500"
          />
          <button className="absolute right-[120px] md:right-40 mt-1 bg-[#398274] text-white p-2 rounded">
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <hr className="w-[90%] m-auto" />
      <div className="flex flex-col md:flex-row justify-between items-center px-20 py-2">
        <div className="">
          <h2 className="text-xl font-semibold text-[18px] mb-4">
            {lang.footer_quick_links}
          </h2>
          <ul className="flex flex-col space-y-2 text-center">
            <li className="text-gray-200 hover:text-white font-light">
              <Link to="/">{lang.home}</Link>
            </li>
            <li className="text-gray-200 hover:text-white font-light">
              <Link to="/about">{lang.about}</Link>
            </li>
            <li className="text-gray-200 hover:text-white font-light">
              <Link to="/contact">{lang.contact}</Link>
            </li>
            <li className="text-gray-200 hover:text-white font-light">
              <Link to="/services">{lang.services}</Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h2 className="text-xl font-semibold text-[18px] mb-4 mt-4 md:mt-0 text-center">
            {lang.footer_contact_us}
          </h2>
          <ul className="flex flex-col space-y-2 items-center mb-4">
            <li className="text-gray-200 hover:text-white font-light">
              <a href="tel:+1234567890" className="flex items-center gap-1">
                <FaPhoneSquareAlt /> {lang.footer_phone}
              </a>
            </li>
            <li className="text-gray-200 hover:text-white font-light">
              <a
                href={`mailto:${lang.footer_email}`} className="flex items-center gap-1"
              >
                <MdMarkEmailRead /> {lang.footer_email}
              </a>
            </li>
            <li className="text-gray-200 hover:text-white font-light">
              <a
                href="https://www.google.com/maps" className="flex items-center gap-1"
              >
                <HiLocationMarker /> {lang.footer_address}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[18px] mb-4 text-center">
            {lang.footer_follow_us}
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
            alt="Footer Image"
          />
        </div>
      </div>
      <p className="text-center text-sm mt-4">{lang.footer_rights}</p>
    </div>
  </footer>
  );
}

export default Footer;
