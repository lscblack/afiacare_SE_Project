import React from "react";
import {Link}  from 'react-router-dom';
function HeaderItem({ name,goto }) {
  return (
    <div>
      <Link to={goto} className="text-[14px] text-gray-500 font-medium  flex items-center cursor-pointer hover:underline underline-offset-4">{name}</Link>
    </div>
  );
}

export default HeaderItem;
