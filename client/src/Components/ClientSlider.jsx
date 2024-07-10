import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

function ClientSlider() {
  const testimonials = [
    {
      quote:
        "Afiacare has transformed our healthcare delivery. The digital platform is user-friendly and incredibly efficient.",
      client: "Dr. John Doe",
      role: "Healthcare Provider",
    },
    {
      quote:
        "Thanks to Afiacare, managing my health records has never been easier. I can access my medical history anytime.",
      client: "Jane Smith",
      role: "Patient",
    },
    {
      quote:
        "As a donor, Afiacare provides a seamless process for tracking my donations and connecting with those in need.",
      client: "Mark Johnson",
      role: "Donor",
    },
    {
      quote:
        "Thanks to Afiacare, managing my health records has never been easier. I can access my medical history anytime.",
      client: "Jane Smith",
      role: "Patient",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-[#ffffff] p-8 flex flex-col gap-4">
      <h2 className="text-[#39827a] text-3xl mb-8 text-center">
        What Our Clients Say
      </h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index} className="p-6  bg-white  mx-4 cursor-grab flex justify-between items-center"
          >
            <div className="flex items-center">
           
              <div className="text-left">
                <FaQuoteLeft className="text-[#39827a] text-xl mb-2" />
                <p className="text-lg  mb-2 text-[#39827a]">
                  {testimonial.quote}
                </p>
                <FaQuoteRight className="text-[#39827a] text-2xl mb-2" />
                <p className="text-md font-semibold">{testimonial.client}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ClientSlider;
