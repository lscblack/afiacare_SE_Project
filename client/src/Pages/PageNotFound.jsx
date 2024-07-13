import React, { useState } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { changeLangSate } from "../features/SharedDataSlice/SharedData";
import errorImg from '../assets/images/404Img.png'

function PageNotFound() {

  const lang = useSelector(state => state.afiaCare.langs);
  const [selectedLang, setSelectedLang] = useState("");

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="">
        <img src={errorImg} alt="" className="md:max-w-[600px]" />
      </div>
      <div className="text-center">
        <h1 className="text-3xl -mt-40 font-semibold text-[#39827a] mb-2">{lang.page_not_found_h1}</h1>
        <p className="text-gray-600">{lang.page_not_found_description}</p>
      </div>
    </div>
  )
}

export default PageNotFound
