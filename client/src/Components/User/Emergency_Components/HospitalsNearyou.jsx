import React from 'react'
import { FiAlertCircle } from "react-icons/fi";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };

function HospitalsNearyou() {
  return (
    <div>
      <div className='bg-white mt-2 rounded p-4 border-yellow-400 border-solid border'>
        <p className=' text-yellow-400 flex items-center gap-2'><FiAlertCircle /> Maps are not available yet. We're working on it!</p>
      </div>
    </div>
  )
}

export default HospitalsNearyou
