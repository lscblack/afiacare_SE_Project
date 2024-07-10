import React from "react";

function HeaderItem({ name }) {
  return (
    <div>
      <h2 className="text-[14px] text-gray-500 font-medium uppercase flex items-center cursor-pointer hover:underline underline-offset-4">{name}</h2>
    </div>
  );
}

export default HeaderItem;
