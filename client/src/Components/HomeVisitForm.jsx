import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { DatePicker, Space } from 'antd';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { Cascader } from 'antd';
import { AutoComplete } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

function HomeVisitForm({ onClose }) {

    
  //Date picker
  const { RangePicker } = DatePicker;
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  
  
  // eslint-disable-next-line arrow-body-style
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
  
  const onChange = (time, timeString) => {
    console.log(time, timeString);
  };
  
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
  
  
  return (
    <div className="relative overflow-y-auto h-screen p-6">
      <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
        <AiOutlineClose size={24} />
      </button>
      <h3 className="text-xl font-medium text-[#39827a] mb-4 py-6">Request a Home Visit</h3>
      <form>
      <div className="mb-4 flex justify-between gap-4">
          <div className="w-[50%]">
          <label className="block text-gray-600 mb-4 font-medium">Patient First Name</label>
          <input type="text" className="w-full px-3 py-2 border rounded bg-transparent outline-none text-[#39827a]" />
          </div>
          <div className="w-[50%]">
          <label className="block text-gray-600 mb-4 font-medium">Patient Last Name</label>
         <input type="text" className="w-full px-3 py-2 border rounded bg-transparent outline-none text-[#39827a]" />
          </div>
        </div>
        <div className="flex items-center gap-5 mb-5">
      <Space direction="vertical" size={12} >
       <DatePicker 
         format="YYYY-MM-DD HH:mm:ss"
         disabledDate={disabledDate}
         disabledTime={disabledDateTime}
         showTime={{
           defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
         }}
       />
     </Space>
     <div>
     <TimePicker onChange={onChange} changeOnScroll needConfirm={false} />
     </div>
     <div>
        <AutoComplete
    style={{
      width: 210,
    }}
    options={optionsAuto}
    placeholder="Address"
    filterOption={(inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
  />
        </div>
    </div>
        
     
    <div className="mb-4">
        <label htmlFor="" className="block text-gray-600 mb-4 font-medium">Reason for Visit</label>
          <textarea className=" w-full px-3 py-2 border rounded bg-transparent outline-none text-[#39827a]" type="time" />
    </div>
        
    <div className="mb-4">
        <label htmlFor="" className="block text-gray-600 mb-4 font-medium">Additonal request(optional)</label>
          <textarea className=" w-full px-3 py-2 border rounded bg-transparent outline-none text-[#39827a]" type="time" />
    </div>
    <div>
          <label className="block text-gray-600 mb-4 font-medium">Select Hospital/Doctor (Optional)</label>
          <Cascader options={options} onChange={onChange} changeOnSelect />;
          <p className="text-gray-400 mt-2 mb-4 font-normal text-[12px]">These suggestions are based on provided location!</p>
          </div>
        <button type="submit" className="bg-[#39827a] text-white px-4 py-2 rounded hover:bg-[#368a80] duration-300">
          Request Visit
        </button>
      </form>
    </div>
  );
}

export default HomeVisitForm;
