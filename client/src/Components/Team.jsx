import React, { useState } from "react";
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { CiLinkedin } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";
import { CiFacebook } from "react-icons/ci";
import { changeLangSate } from "../features/SharedDataSlice/SharedData";
import { useSelector, useDispatch } from "react-redux";
// Import team member images
import Member1 from '../assets/images/Member1.jpg';
import Member2 from '../assets/images/Member2.jpg';
import Member3 from '../assets/images/Member3.jpg';
import Member4 from '../assets/images/Member4.png';



function Team() {
  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState(""); // State to track selected language

  const teamMembers = [
    {
      img: Member1,
      name: 'M. Branis Sumba',
      role: lang.team_role1,
      linkedin: 'https://www.linkedin.com/in/johndoe',
      instagram: 'https://www.instagram.com/johndoe',
      facebook: 'https://www.facebook.com/johndoe'
    },
    {
      img: Member2,
      name: 'Simeon A. Kongnyuy',
      role: lang.team_role2,
      linkedin: 'https://www.linkedin.com/in/janesmith',
      instagram: 'https://www.instagram.com/janesmith',
      facebook: 'https://www.facebook.com/janesmith'
    },
    {
      img: Member3,
      name: 'Loue S. Christian',
      role: lang.team_role3,
      linkedin: 'https://www.linkedin.com/in/emilyjohnson',
      instagram: 'https://www.instagram.com/emilyjohnson',
      facebook: 'https://www.facebook.com/emilyjohnson'
    },
    {
      img: Member4,
      name: 'Divine O. Itu',
      role: lang.team_role4,
      linkedin: 'https://www.linkedin.com/in/michaelbrown',
      instagram: 'https://www.instagram.com/michaelbrown',
      facebook: 'https://www.facebook.com/michaelbrown'
    }
  ];
  return (
    <div className=" p-10">
      <h2 className="text-[#39827a] text-3xl mb-4 text-center">{lang.ourTeam_title}</h2>
      <p className="text-center mb-8 text-gray-500">
        {lang.ourTeam_description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-start p-4 border rounded-md bg-white hover:translate-y-[-10px] duration-300 cursor-pointer">
            <img src={member.img} alt={member.name} className="w-[100%] h-[280px] object-cover shadow-md hover:scale-105 duration-300 cursor-pointer rounded mb-4" />
            <h3 className="font-medium text-[18px] text-[#39827a]">{member.name}</h3>
            <p className="text-gray-500">{member.role}</p>
            <div className="flex mt-2 space-x-3">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 bg-slate-100 p-2 rounded-full hover:text-[#0e76a8]">
              <CiLinkedin size={22} />
              </a>
              <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-600 bg-slate-100 p-2 rounded-full hover:text-[#E4405F]">
              <IoLogoInstagram size={22} />
              </a>
              <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 bg-slate-100 p-2 rounded-full hover:text-[#3b5998]">
              <CiFacebook size={22} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
