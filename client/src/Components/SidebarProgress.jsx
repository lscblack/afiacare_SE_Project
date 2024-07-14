import React from "react";

const SidebarProgress = ({ currentStep, steps }) => (
  <div className="hidden md:block md:w-1/4 p-4 border-l border-gray-300">
    {steps.map((step, index) => (
      <div key={index} className={`flex items-center mb-4 ${index <= currentStep ? "text-white font-semibold" : "text-white-300"}`}>
        <div className={`w-8 h-8 mr-2 rounded-full flex items-center justify-center border ${index <= currentStep ? "border-white border border-solid bg-[#39827a]" : "border-gray-400 border-solid"}`}>
          {index + 1}
        </div>
        <span className="text-sm">{step}</span>
      </div>
    ))}
  </div>
);

export default SidebarProgress;
