import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { DatePicker, Space, TimePicker, AutoComplete } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { toast } from 'react-toastify';
dayjs.extend(customParseFormat);

function HomeVisitForm({ onClose }) {

  // state to store form values
  const [formValues, setFormValues] = useState({
    date: null,
    time: null,
    address: '',
    reason: '',
    additionalRequest: '',
    hospital: '',
  });
    
  //Date picker
  const { RangePicker } = DatePicker;
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  });
  const disabledRangeTime = (_, type) => {
    if (type === 'start') {
      return {
        disabledHours: () => range(0, 60).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => range(0, 60).splice(20, 4),
      disabledMinutes: () => range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  };

  //
  const optionsAuto = [
    {
      value: 'Burns Bay Road',
    },
    {
      value: 'Downing Street',
    },
    {
      value: 'Wall Street',
    },
  ];



  // function to handle input change
  const handleChange = (field, value) => {
    setFormValues({ ...formValues, [field]: value });
  };

  // validation
  const validateForm = (e) => {
    e.preventDefault();
    if (formValues.date === null) {
      toast.dismiss();
      toast.warning("Date is required")
    }
    else if (formValues.time === null) {
      toast.dismiss();
      toast.warning("Time is required")
    }
    else if (formValues.address === '') {
      toast.dismiss();
      toast.warning("Address is required")
    }
    else if (formValues.reason === '') {
      toast.dismiss();
      toast.warning("Reason is required")
    }
    else if (formValues.hospital === '') {
      toast.dismiss();
      toast.warning("Hospital is required")
    }
    else {
      console.log(formValues);
      toast.success("Form Submitted Successfully");
    }
  }

  return (
    <div className="relative overflow-y-auto h-screen p-6">
      <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
        <AiOutlineClose size={24} />
      </button>
      <h3 className="text-xl font-medium text-[#39827a] mb-4 py-6">Request a Home Visit</h3>
      <form>
        <label htmlFor="date" className="block text-gray-600 mb-4 font-medium">Pick the date for the visit</label>
        <div className="flex items-center gap-5 mb-5">
          <Space direction="vertical" size={12}>
            <DatePicker 
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
              onChange={(date, dateString) => handleChange('date', dateString)}
            />
          </Space>
          <div>
            <TimePicker onChange={(time, timeString) => handleChange('time', timeString)} changeOnScroll needConfirm={false} />
          </div>
          <div>
            <AutoComplete
              style={{ width: 210 }}
              options={optionsAuto}
              placeholder="Address"
              filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
              onChange={(value) => handleChange('address', value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="reason" className="block text-gray-600 mb-4 font-medium">Reason for Visit</label>
          <textarea 
            id="reason" 
            className="w-full px-3 py-2 border rounded bg-transparent outline-none text-[#39827a]" 
            onChange={(e) => handleChange('reason', e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="additionalRequest" className="block text-gray-600 mb-4 font-medium">Additional Request (optional)</label>
          <textarea 
            id="additionalRequest" 
            className="w-full px-3 py-2 border rounded bg-transparent outline-none text-[#39827a]" 
            onChange={(e) => handleChange('additionalRequest', e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="hospital" className="block text-gray-600 mb-4 font-medium">Select Hospital/Doctor</label>
          <select 
            id="hospital" 
            className="w-1/3 px-3 py-2 border rounded bg-transparent outline-none text-gray-500"
            onChange={(e) => handleChange('hospital', e.target.value)}
          >
            <option value="" disabled className="text-red bg-white text-[15px]">Hospitals to be done</option>
            <option value="here" className="text-red bg-white text-[15px]">Here</option>
            <option value="there" className="text-red bg-white text-[15px]">There</option>
          </select>
          <p className="text-gray-400 mt-2 mb-4 font-normal text-[12px]">These suggestions are based on provided location!</p>
        </div>
        
        <button onClick={(e) => validateForm(e)} type="submit" className="bg-[#39827a] text-white px-4 py-2 rounded hover:bg-[#368a80] duration-300">
          Request Visit
        </button>
      </form>
    </div>
  );
}

export default HomeVisitForm;
