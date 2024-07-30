import React, { useState, useEffect } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { FaHospital, FaPills } from 'react-icons/fa';
import { MdOutlineAddLocation } from "react-icons/md";
import MyApi from '../../../AxiosInstance/MyApi';

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

function RecommendedFacilities({ view_type }) {
  const [facilities, setFac] = useState({
    Hospitals: [],
    pharmacies: [],
  });

  const allFacilities = [...facilities.Hospitals, ...facilities.pharmacies];
  const [visibleChunks, setVisibleChunks] = useState(2);
  const chunkedFacilities = chunkArray(allFacilities, 4);

  const loadMore = () => {
    setVisibleChunks(prev => prev + 1);
  };

  useEffect(() => {
    const updateFacilities = (data) => {
      const facilityData = view_type === 'hospital' ? data.hospitals : data.pharmacies;

      const formattedData = facilityData.map((facility) => ({
        name: facility.name,
        location: `${facility.location[0]}, ${facility.location[1]}`,
        contact: facility.contact_details?.phone || 'Not available',
        mapUrl: facility.link || 'Not available',
        icon: view_type === 'hospital' ? <FaHospital size={24} /> : <FaPills size={24} />
      }));

      setFac(prev => ({
        ...prev,
        [view_type === 'hospital' ? 'Hospitals' : 'pharmacies']: formattedData,
      }));
    };

    const fetchNearbyFacilities = (lat, lon) => {
      const endpoint = view_type === "hospital"
        ? `apis/me/near_by_hospitals/${lat}&${lon}`
        : `apis/me/near_by_pharmacies/${lat}&${lon}`;

      MyApi.get(endpoint)
        .then(response => updateFacilities(response.data))
        .catch(error => console.error('Error fetching facilities:', error));
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchNearbyFacilities(latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, [view_type]);

  return (
    <div>
      <div className='grid gap-10'>
        {allFacilities.length === 0 &&
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 px-6">
            {[0,1,2,3,4,5,6,7].map(index=>(
            <div key={index} className="bg-white p-3  rounded-lg border-r-8 border-[#39827a]">
              <div className="flex gap-8 justify-between items-start">
                <div className="text-[#39827a] bg-slate-100 p-2 rounded-full">
                  {view_type === 'hospital' ? <FaHospital size={27} /> : <FaPills size={27} />}
                </div>
                <div className='w-full'>

                  <div className="h-1 bg-gray-400 animate-pulse w-full rounded-full"></div>
                  <div className="h-2 bg-gray-300 animate-pulse w-11/12 rounded-full mt-2"></div>
                  <div className="h-3 bg-gray-200 animate-pulse w-5/6 rounded-full mt-2"></div>
                  <div className="h-4 bg-gray-200 animate-pulse w-4/6 rounded-full mt-2"></div>
                </div>
              </div>
            </div>
            ))}
          </div>
        }
        {chunkedFacilities.slice(0, visibleChunks).map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 px-6">
            {chunk.map((facility, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg border-r-8 border-[#39827a] border-solid cursor-pointer overflow-hidden bg-white transform hover:scale-105 duration-300"
              >
                <div className="p-4">
                  <div className='flex items-center gap-2'>
                    <div className="text-[#39827a] bg-slate-100 p-2 rounded-full">
                      {facility.icon}
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{facility.name}</h2>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-400 font-normal flex items-center gap-1"><MdOutlineAddLocation /> {facility.location}</p>
                    <div>
                      <p className="text-sm text-gray-600 bg-slate-100 px-1 rounded w-[60%] mb-2">{facility.contact}</p>
                      <p className="text-sm text-gray-600">{facility.hours}</p>
                    </div>
                    <button
                      className="text-[#39827a] font-medium flex items-center gap-2 mt-2"
                      onClick={() => window.open(facility.mapUrl, '_blank')}
                    >
                      Open in Maps <IoIosArrowForward />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {visibleChunks < chunkedFacilities.length && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-[#39827a] text-white font-medium py-2 px-4 rounded"
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default RecommendedFacilities;
