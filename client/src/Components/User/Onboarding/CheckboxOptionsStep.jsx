
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';


const props = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
};

const CheckboxOptionsStep = ({ formData, setFormData, handleSubmit, handlePrevStep }) => {
  const toggleCheckbox = (option) => {
    setFormData((prevData) => {
      const isSelected = prevData.checkboxOptions.includes(option);
      if (isSelected) {
        return {
          ...prevData,
          checkboxOptions: prevData.checkboxOptions.filter((item) => item !== option),
        };
      } else {
        return {
          ...prevData,
          checkboxOptions: [...prevData.checkboxOptions, option],
        };
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white w-full max-w-screen-lg m-auto rounded-lg overflow-y-auto p-4">
      <div className="border-b-gray border-b border-solid pb-4">
        <h2 className="text-gray-500 font-medium text-[22px] text-center">Document Upload</h2>
        <p className="text-gray-400 text-center">Please upload your profile photo and ID</p>
      </div>
      
      <div className="md:p-8">
     
    <div className='max-w-screen-sm mb-4'>
      <h1 className='text-gray-500 font-medium text-[16px] mb-4'>Upload ID</h1>
    <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
    </div>
   
    <div className='max-w-screen-sm mb-4'>
      <h1 className='text-gray-500 font-medium text-[16px] mb-4'>Upload avatar</h1>
    <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
    </div>

      

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevStep}
            className="bg-transparent text-gray-400 px-4 py-2 rounded hover:bg-gray-400 hover:text-white border duration-300"
          >
            Previous
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#39827a] text-white px-4 py-2 rounded hover:bg-[#368a80] duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckboxOptionsStep;
