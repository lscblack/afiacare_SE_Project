import React from "react";

function AppointmentForm({ title }) {
  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded shadow-lg">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input type="date" className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Time</label>
          <input type="time" className="w-full px-3 py-2 border rounded" />
        </div>
        <button type="submit" className="bg-[#39827a] text-white px-4 py-2 rounded hover:bg-[#368a80] duration-300">
          Schedule
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;
