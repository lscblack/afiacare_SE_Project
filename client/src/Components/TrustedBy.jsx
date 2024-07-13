import React, { useState } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { changeLangSate } from "../features/SharedDataSlice/SharedData";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

function TrustedBySlider() {
  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState(""); // State to track selected language
  const logos = [
    { src: 'https://i.pinimg.com/originals/85/95/f4/8595f4b711e503bc72fe396e5043e0c2.png', alt: 'Company 1' },
    { src: 'https://static.vecteezy.com/system/resources/thumbnails/017/177/954/small/round-medical-cross-symbol-on-transparent-background-free-png.png', alt: 'Company 2' },
    { src: 'https://seeklogo.com/images/M/medical-hospital-logo-463FA27180-seeklogo.com.png', alt: 'Company 3' },
    { src: 'https://static.vecteezy.com/system/resources/thumbnails/014/322/451/small/hospital-icons-design-in-blue-circle-png.png', alt: 'Company 4' },
    { src: 'https://www.freepnglogos.com/uploads/medicine-logo-png-1.png', alt: 'Company 5' },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className=' p-8'>
      <h2 className='text-[#39827a] text-3xl mb-8 text-center'>{lang.Trusted_title}</h2>
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index} className='flex justify-center items-center p-4'>
            <img src={logo.src} alt={logo.alt} className='max-h-20 object-contain' />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default TrustedBySlider;
