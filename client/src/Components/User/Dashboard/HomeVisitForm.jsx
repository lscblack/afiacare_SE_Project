import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { DatePicker, Space, TimePicker, AutoComplete } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { toast } from 'react-toastify';
dayjs.extend(customParseFormat);
import MyApi from "../../../AxiosInstance/MyApi";

function HomeVisitForm({ onClose }) {
  // state to store the hospital names
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // state to store form values
  const [formValues, setFormValues] = useState({
    date: null,
    address: '',
    reason: '',
    additionalRequest: '',
    hospital: '',
    hospital_id: '',
    doctor: '',
    specialists: '',
  });

  // function to get all hospitals available
  const getHospitals = async () => {
    try {
      const response = await MyApi.get("hospital/all");
      let data = response.data;
      
      // Ensure data is an array
      if (!Array.isArray(data)) {
        data = [data];
      }
      
      setHospitals(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDoctors = async () => {
    const params = {
      "worker_type": "nurse",
    }
    try {
      const response = await MyApi.get(`hosp/workers/all/${formValues.hospital_id}`, { params });
      let data = response.data;
      
      // Ensure data is an array
      if (!Array.isArray(data)) {
        data = [data];
      }
      // Flatten the array of workers from all hospitals into a single array
      data = data.reduce((acc, hospital) => {
        return acc.concat(hospital.workers || []);
      }, []);

      // set a doctor and specialist
      setDoctors(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(doctors, formValues);
  }, [doctors, formValues]);

  // run the getHospitals function when the component mounts
  useEffect(() => {
    getHospitals();
  }, []);

  // call getDoctors when hospital_id changes
  useEffect(() => {
    if (formValues.hospital_id) {
      getDoctors(formValues.hospital_id);
    }
  }, [formValues.hospital_id]);
    
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
    if (field === 'hospital') {
      const selectedHospital = hospitals.find(hospital => hospital.hospital_name === value);
      if (selectedHospital) {
        setFormValues({
          ...formValues,
          hospital: value,
          hospital_id: selectedHospital.id
        });
      }
    } else if (field === 'specialists') {
      const selectedSpecialist = doctors.find(doctor => doctor.specialists === value);
      if (selectedSpecialist) {
        setFormValues({
          ...formValues,
          specialists: value
        });
      }
    } else if (field === 'doctor') {
      setFormValues({
        ...formValues,
        doctor: value
      });
    }
    else {
      setFormValues({ ...formValues, [field]: value });
    }
  };

  // validation
  const validateForm = async (e) => {
    e.preventDefault();
    if (formValues.date === null) {
      toast.dismiss();
      toast.warning("Date is required")
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
            <option value="" className="text-red bg-white text-[15px]"></option>
            {hospitals.map((hospital) => (
              <option key={hospital.id} value={hospital.hospital_name} className="text-red bg-white text-[15px]">
                {hospital.hospital_name}
              </option>
            ))}
          </select>
          {/* add an extra select field for specialist based on what the hospital user selects */}
          {formValues.hospital && (
            <select
              id="specialist"
              className="w-1/3 px-3 py-2 border rounded bg-transparent outline-none text-gray-500"
              onChange={(e) => handleChange('specialists', e.target.value)}
            >
              <option value="" className="text-red bg-white text-[15px]"></option>
              {doctors.map((doctor) => (
                <option key={doctor.worker_id} value={doctor.specialists} className="text-red bg-white text-[15px]">
                  {doctor.specialists}
                </option>
              ))}
            </select>
          )}
          {/* add another field for a doctor */}
          {formValues.specialists && (
            <select
              id="doctor"
              className="w-1/3 px-3 py-2 border rounded bg-transparent outline-none text-gray-500"
              onChange={(e) => handleChange('doctor', e.target.value)}
            >
              <option value="" className="text-red bg-white text-[15px]"></option>
              <option value="" className="text-red bg-white text-[15px]">fdsfsd</option>
              {doctors.map((doctor) => (
                <option key={doctor.worker_id} value={doctor.worker_id} className="text-red bg-white text-[15px]">
                  {"Dr. " + doctor.fname + ' ' + doctor.lname}
                </option>
              ))}
            </select>
          )}
          
          <p className="text-gray-400 mt-2 mb-4 font-normal text-[12px]">These suggestions are based on provided location!</p>
        </div>
        
        <button onClick={(e) => validateForm(e)} type="submit" className="bg-[#39827a] text-white px-4 py-2 rounded hover:bg-[#368a80] duration-300">
          Submit
        </button>
      </form>
    </div>
  );
}

export default HomeVisitForm;
