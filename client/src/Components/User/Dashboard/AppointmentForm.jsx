import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { DatePicker, Space, Cascader } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { toast } from 'react-toastify';
dayjs.extend(customParseFormat);

function AppointmentForm({ title, onClose }) {

  // state to store form values
  const [formValues, setFormValues] = useState({
    date: null,
    reason: '',
    hospital: [],
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
    // You can customize this as per your requirement
  });

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
    else if (formValues.reason === '') {
      toast.dismiss();
      toast.warning("Reason is required")
    }
    else if (formValues.hospital.length === 0) {
      toast.dismiss();
      toast.warning("Hospital selection is required")
    }
    else {
      console.log(formValues);
      toast.success("Form Submitted Successfully");
    }
  }

  const options = [
    {
      value: 'general_hospital',
      label: 'General Hospital',
      children: [
        {
          value: 'cardiologists',
          label: 'Cardiologists',
          children: [
            {
              value: 'dr_smith',
              label: 'Dr. Smith',
            },
            {
              value: 'dr_johnson',
              label: 'Dr. Johnson',
            },
          ],
        },
        {
          value: 'neurologists',
          label: 'Neurologists',
          children: [
            {
              value: 'dr_brown',
              label: 'Dr. Brown',
            },
            {
              value: 'dr_davis',
              label: 'Dr. Davis',
            },
          ],
        },
      ],
    },
    {
      value: 'city_clinic',
      label: 'City Clinic',
      children: [
        {
          value: 'pediatricians',
          label: 'Pediatricians',
          children: [
            {
              value: 'dr_miller',
              label: 'Dr. Miller',
            },
            {
              value: 'dr_wilson',
              label: 'Dr. Wilson',
            },
          ],
        },
        {
          value: 'dermatologists',
          label: 'Dermatologists',
          children: [
            {
              value: 'dr_moore',
              label: 'Dr. Moore',
            },
            {
              value: 'dr_taylor',
              label: 'Dr. Taylor',
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="relative px-6">
      <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
        <AiOutlineClose size={24} />
      </button>
      <h3 className="text-[18px] font-medium pt-16 mb-4 text-[#39827a]">Book a clinic appointment</h3>
      <form onSubmit={validateForm}>
        <div>
          <div className="flex items-center gap-5 mb-5 w-full">
            <span className="text-slate-500 font-bold">Choose Date For appointment</span>
            <Space direction="vertical" size={17}>
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
                showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                onChange={(date, dateString) => handleChange('date', dateString)}
              />
            </Space>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="reason" className="block text-slate-500 mb-4 font-medium">Reason for appointment</label>
          <textarea 
            id="reason" 
            className="w-full px-3 py-2 border rounded bg-transparent outline-none text-[#39827a]" 
            onChange={(e) => handleChange('reason', e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-slate-500 mb-4 font-medium">Select Hospital/Doctor</label>
          <Cascader 
            options={options} 
            onChange={(value) => handleChange('hospital', value)} 
            changeOnSelect 
          />
          <p className="text-gray-400 mt-2 mb-4 font-normal text-[12px]">These suggestions are based on provided location!</p>
        </div>
        <button type="submit" className="bg-[#39827a] text-white px-4 py-2 rounded hover:bg-[#368a80] duration-300">
          Schedule
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;
