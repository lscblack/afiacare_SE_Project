import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import { FaPlus } from 'react-icons/fa';

function RequestDonation() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div
        className=" p-4 border border-l-8 border-red-400 bg-white rounded-lg  cursor-pointer hover:shadow-lg transition-shadow duration-300"
        onClick={showDrawer}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[16px]  text-gray-500 font-medium">Request a Blood Donation</h2>
          <FaPlus className="text-red-400" />
        </div>
        <p className="text-gray-400 mt-2">Click here to request a blood donation.</p>
      </div>
      <Drawer
        title="Request a Blood Donation"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={600}
      >
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded-md bg-transparent outline-none "
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="bloodType">
              Blood Type
            </label>
            <select
              id="bloodType"
              name="bloodType"
              className="w-full px-4 py-2 border rounded-md bg-transparent outline-none"
              required
            >
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full px-4 py-2 border rounded-md bg-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="contact">
              Contact Information
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              className="w-full px-4 py-2 border rounded-md bg-transparent outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
              Additional Information
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full px-4 py-2 border rounded-md bg-transparent outline-none"
              rows="2"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#39827a] text-white font-semibold rounded-md hover:bg-[#368a80] transition duration-300"
            >
              Submit Request
            </button>
          </div>
        </form>
      </Drawer>
    </>
  );
}

export default RequestDonation;
