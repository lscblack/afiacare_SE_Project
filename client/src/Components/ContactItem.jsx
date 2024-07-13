import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { RiChat1Line } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import AOS from 'aos';
import 'aos/dist/aos.css';

function ContactItem() {
  const lang = useSelector((state) => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <div className="bg-white p-10" data-aos="zoom-in"> {/* Added AOS attribute here */}
      <div className="flex flex-col md:flex-row justify-center items-start space-y-8 md:space-y-0 md:space-x-8">
        {/* Contact Info Section */}
        <div className="p-6 w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2 text-[#39827a]">
                {lang.contact_item_text1}
              </h2>
              <p className="text-gray-600 mb-2">
                {lang.contact_item_description1}
              </p>
              <p className="text-gray-800 font-semibold mb-2 flex items-center gap-2">
                <MdOutlinePhoneInTalk /> +91 9876543210
              </p>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[#39827a]">
                {lang.contact_item_text2}
              </h2>
              <p className="text-gray-600 mb-2">
                {lang.contact_item_description2}
              </p>
              <a
                href="" className="text-gray-800 font-semibold mb-4 mt-4 flex items-center gap-2 hover:text-[#39827a] duration-300"
              >
                <RiChat1Line /> {lang.contact_action2}
              </a>
              <a
                href="" className="text-gray-800 font-semibold mb-4 mt-4 flex items-center gap-2 hover:text-[#39827a] duration-300"
              >
                <FiSend /> {lang.contact_action}
              </a>
              <a
                href="" className="text-gray-800 font-semibold mb-2 flex items-center gap-2 hover:text-[#39827a] duration-300"
              >
                <FaXTwitter /> {lang.message_twitter}
              </a>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#39827a] mt-4">
                {lang.contact_item_text3}
              </h2>
              <p className="text-gray-600 mb-2">
                {lang.contact_item_description3}
              </p>
              <a
                href="" className="text-gray-800 font-semibold mb-2 flex items-center gap-2"
              >
                <IoLocationOutline /> 100 Akwa street, Douala Cameroon
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="p-6 w-full md:w-1/2 flex flex-col justify-between">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="Firstname" className="block text-gray-700 mb-2">
                  {lang.first_name}
                </label>
                <input
                  type="text"
                  id="Firstname" className="w-full p-2 border bg-transparent text-[#39827a] rounded focus:outline-none focus:ring-1 focus:ring-[#39827a]"
                  placeholder={lang.first_name}
                />
              </div>
              <div>
                <label htmlFor="Lastname" className="block text-gray-700 mb-2">
                  {lang.last_name}
                </label>
                <input
                  type="text"
                  id="Lastname" className="w-full p-2 border bg-transparent text-[#39827a] rounded focus:outline-none focus:ring-1 focus:ring-[#39827a]"
                  placeholder={lang.last_name}
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="Email" className="block text-gray-700 mb-2">
                {lang.email}
              </label>
              <input
                type="email"
                id="Email" className="w-full p-2 border bg-transparent text-[#39827a] rounded focus:outline-none focus:ring-1 focus:ring-[#39827a]"
                placeholder={lang.email}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="Phone" className="block text-gray-700 mb-2">
                {lang.phone}
              </label>
              <div className="flex">
                <select className="w-[100px] p-2 border border-r-0 rounded-l focus:outline-none bg-transparent text-[#39827a]">
                  <option value="+1">+1 US</option>
                  <option value="+44">+44 NED</option>
                  <option value="+237">+237 CMR</option>
                  <option value="+91">+91 IND</option>
                  {/* Add more country codes as needed */}
                </select>
                <input
                  type="tel"
                  id="Phone" className="w-full p-2 border border-l-0 rounded-r focus:outline-none bg-transparent text-[#39827a]"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="Message" className="block text-gray-700 mb-2">
                {lang.message}
              </label>
              <textarea
                id="Message"
                rows="2" className="w-full p-2 border rounded focus:outline-none bg-transparent text-[#39827a]"
                placeholder={lang.message_placeholder}
              ></textarea>
            </div>
            <button
              type="submit" className="w-full bg-[#39827a] text-white py-2 px-4 rounded hover:bg-[#336e67] focus:outline-none focus:ring-2 focus:ring-[#39827a]"
            >
              {lang.send}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactItem;
