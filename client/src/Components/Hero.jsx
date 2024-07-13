import React, { useEffect, useState } from "react"; // Added useEffect import
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS
import HeroImg from "./../assets/images/hero.png";
import Ui from "./../assets/images/ui.png";
import { useSelector } from "react-redux";
import { changeLangSate } from "../features/SharedDataSlice/SharedData";
function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations
    });
  }, []);

  const lang = useSelector(state => state.afiaCare.langs);

  return (
    <div className="flex-wrap-reverse items-center justify-center flex gap-0 md:py-10 px-5 md:flex-row z-0 md:h-[100vh] overflow-hidden">
      <div className="space-y-4 md:ml-10 md:w-[60%] text-center md:text-left mb-8 md:mb-0">
        <p className="text-[#39827a] text-sm" data-aos="fade-up">{lang.hero_greetings}</p>
        <h1 className="text-2xl md:text-6xl text-[#39827a] font-bold" data-aos="fade-up">
          {lang.hero_title}
        </h1>
        <p className="text-gray-500 text-base" data-aos="fade-up">
          {lang.hero_text}
        </p>
        <div data-aos="fade-up">
          <form action="">
            <input
              type="email"
              placeholder={lang.placeholder_email} className="p-2 border-[#39827a] border-solid outline-none bg-[#f5f5f5] rounded border rounded-r-none text-gray-500"
            />
            <button className="bg-[#39827a] text-white p-2 rounded rounded-l-none cursor-pointer">
              {lang.newsButton}
            </button>
          </form>
        </div>
      </div>
      <div className="md:w-[30%] z-[-1]" data-aos="fade-left">
        <img
          src={HeroImg}
          alt="" className="w-[500px] h-[500px] object-cover"
        />
      </div>

      <img
        src={Ui}
        alt="" className="absolute top-30 right-0 md:top-10 md:right-0 w-[260px] opacity-80"
        data-aos="fade-up"
      />
      <img
        src={Ui}
        alt="" className="absolute bottom-20 right-[567px] w-[260px] opacity-80"
        data-aos="fade-up"
      />
      <img
        src={Ui}
        alt="" className="absolute top-30 md:top-10 left-0 w-[260px] opacity-80"
        data-aos="fade-up"
      />
    </div>
  );
}

export default Hero;
