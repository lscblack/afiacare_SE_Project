import React from "react";

const SidebarProgress = ({ currentStep, steps }) => (
  <div className="flex  justify-center gap-10 items-center ">
    {steps.map((step, index) => (
      <div key={index} className={`flex   [900px]:bg-white p-2 md:p-2 rounded-md items-center mb-4 max-md:py-6 ${index <= currentStep ? "text-[#39827a] font-medium" : "text-gray-300"}`}>
        <div className={`w-8 h-8 mr-0 md:mr-2 rounded-full flex items-center justify-center text-gray-400 border ${index <= currentStep ? "border-none text-white bg-[#39827a]" : "border-gray-400 border-solid"}`}>
          {index + 1}
        </div>
        <span className="text-sm max-[900px]:hidden ">{step}</span>
      </div>
    ))}
  </div>
);

export default SidebarProgress;
