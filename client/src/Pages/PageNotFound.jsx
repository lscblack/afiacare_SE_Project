import React from "react";
import ErrorImg from "../assets/images/404Img.png";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { LuThumbsDown } from "react-icons/lu";

function PageNotFound() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[80%] md:w-[40%] md:h-[400px]">
        <img src={ErrorImg} className="w-[100%] md:w-[650px] flex m-auto" alt="" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-center text-[#39827a] mb-4">We are Sorry...</h1>
        <p className="text-center text-gray-400">The page you're trying to access does not exist or has restricted access.<br /> If you think this was a mistake, please contact us.</p>
      </div>
      <div className="flex justify-center gap-x-4">
        <Link to="/home">
          <button className="text-[#fff] bg-[#39827a] flex items-center mt-5 justify-start gap-x-2 border rounded-md p-2 hover:bg-[#336e67] duration-300">
            <IoIosArrowBack /> Home
          </button>
        </Link>
        <Link to="/contact">
          <button className="text-[#39827a] flex items-center mt-5 justify-start gap-x-2 border rounded-md p-2 hover:bg-[#39827a] hover:text-white duration-300">
            <LuThumbsDown /> Report
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
