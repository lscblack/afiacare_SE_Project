import React from 'react';
import { FaUserMd, FaUser, FaHandHoldingHeart } from 'react-icons/fa';
import { IoIosArrowForward } from "react-icons/io";

function GetInvolved() {
  const involvementOptions = [
    { icon: FaUserMd, title: "Healthcare Providers", description: "Join our network of professionals to deliver high-quality care and improve patient outcomes." },
    { icon: FaUser, title: "Patients", description: "Access comprehensive healthcare services and manage your health records with ease." },
    { icon: FaHandHoldingHeart, title: "Donors", description: "Support our mission by donating blood, organs, or financial aid to those in need." }
  ];

  return (
    <div className=' p-8'>
      <div className='text-center mb-8'>
        <h2 className='text-[#39827a] text-3xl mb-4'>Get Involved</h2>
        <p className='text-gray-400'>Join us in our mission to revolutionize healthcare in Cameroon. Whether you are a healthcare provider, patient, or donor, Afiacare offers the tools and support you need for a better healthcare experience.</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {involvementOptions.map((option, index) => (
          <div key={index} className='p-6 border rounded bg-white shadow-sm text-center'>
            <option.icon className='p-1 text-4xl mb-4 m-auto bg-slate-400 rounded-full' />
            <h3 className='text-xl font-semibold mb-2 text-[#39827a]'>{option.title}</h3>
            <p className='text-gray-400'>{option.description}</p>
          </div>
        ))}
      </div>
      <button className='bg-[#39827a] text-white mt-8 px-4 py-2 rounded flex m-auto items-center hover:bg-[#39827a]/90 duration-300'>
        Get Started <IoIosArrowForward />
      </button>
    </div>
  );
}

export default GetInvolved;
