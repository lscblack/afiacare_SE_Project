import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { MdAddHome } from "react-icons/md";

function BookingCard({ title, backgroundImage, Icon, onClick }) {
  return (
    <div
      className=" max-w-sm rounded-lg overflow-hidden shadow-lg m-4 cursor-pointer hover:translate-y-[-5px] duration-300"
      onClick={onClick}
    >
      <div className="h-40 w-60 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="h-full w-full bg-[#39827a] bg-opacity-60 flex flex-wrap items-end p-4">
            <div className="w-full px-5">
              <Icon className="w-8 h-8 text-[#39827a] bg-white p-1 rounded-full float-right " />
            </div>
          <h3 className="text-white text-xl font-medium h-full flex items-end pb-7">{title}</h3>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
