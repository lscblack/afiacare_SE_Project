import React from 'react';
import AboutImg from "./../assets/images/WhoWeAre.png";
import { HiChevronRight } from "react-icons/hi2";

function WhoWeAre() {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${AboutImg})` }}>
      <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay */}
      <div className="relative w-[100%] md:w-[90%] mt-10 md:mt-0 p-10  text-white ">
        <h2 className="text-4xl font-semibold  text-white mb-5">Who We Are</h2>
        <p className="text-white text-lg font-normal">
        Afiacare is a pioneering digital healthcare platform designed to transform the healthcare landscape in Cameroon. Our mission is to provide a seamless, efficient, and accessible healthcare experience for patients, healthcare providers, and donors. With a focus on leveraging cutting-edge technology, Afiacare aims to address the critical challenges faced by the healthcare system and improve overall health outcomes.
        </p>
        <button className="bg-[#39827a] flex items-center mt-5 justify-start gap-x-2 border rounded-md p-2 hover:bg-[#fff] hover:text-[#39827a] duration-300">
          Discover us <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default WhoWeAre;
