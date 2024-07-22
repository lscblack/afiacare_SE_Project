import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { toast } from 'react-toastify';

const CheckboxOptionsStep = ({ formData, setFormData, handleSubmit, handlePrevStep }) => {
  const [profilePreview, setProfilePreview] = useState(null);
  const [docPreview, setDocPreview] = useState(null);

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = (error) => console.log('Error: ', error);
  };

  const handleUploadChange = (info, isProfilePicture) => {
    if (info.file.status === 'done') {
      toast.dismiss();
      message.success(`${info.file.name} file uploaded successfully`);
      getBase64(info.file.originFileObj, (base64) => {
        if (isProfilePicture) {
          setProfilePreview(base64);
          setFormData({ ...formData, avatar: base64 });
        } else {
          setDocPreview(base64);
          setFormData({ ...formData, id_prove: base64 });
        }
      });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const fileTypes = ['image/jpeg', 'image/png'];

  const profileProps = {
    beforeUpload: (file) => {
      if (!fileTypes.includes(file.type)) {
        toast.dismiss();
        message.error('You can only upload JPG files!');
        return Upload.LIST_IGNORE;
      }
      handleUploadChange({ file, fileList: [file], file: { status: 'done', originFileObj: file } }, true);
      return false; // Prevent auto upload
    },
  };

  const docProps = {
    beforeUpload: (file) => {
      if (!fileTypes.includes(file.type)) {
        toast.dismiss();
        message.error('You can only upload JPG,PNG files!');
        return Upload.LIST_IGNORE;
      }
      handleUploadChange({ file, fileList: [file], file: { status: 'done', originFileObj: file } }, false);
      return false; // Prevent auto upload
    },
  };
  const checkData = () => {
    if (!docPreview) {
      toast.error('ID Prove Is Needed!');
    } else {
      handleSubmit()
    }
  }
  return (
    <div className="bg-white w-full max-w-screen-lg m-auto rounded-lg overflow-y-auto p-4">
      <div className="border-b-gray border-b border-solid pb-4">
        <h2 className="text-gray-500 font-medium text-[22px] text-center">Document Upload</h2>
        <p className="text-gray-400 text-center">Please upload The Required DOCX Here</p>
      </div>

      <div className="md:p-8">
        <div className="flex gap-3 max-md:flex-wrap">
          <div className='w-full mb-4'>
            <h1 className='text-gray-500 font-medium text-md mb-4'>Upload Profile Picture</h1>
            <Upload {...profileProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {profilePreview && <img src={profilePreview} alt="Profile Preview" className="mt-2 w-32 h-32 object-cover" />}
          </div>
          <div className='w-full mb-4'>
            <h1 className='text-gray-500 font-medium text-md mb-4'>Upload Your ID</h1>
            <Upload {...docProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {docPreview && <img src={docPreview} alt="Document Preview" className="mt-2 w-32 h-32 object-cover" />}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevStep}
            className="bg-transparent text-gray-400 px-4 py-2 rounded hover:bg-gray-400 hover:text-white border duration-300"
          >
            Previous
          </button>
          <button
            onClick={() => checkData()}
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
