import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const donations = [
  { id: 1, center: 'City Blood Bank', type: 'Blood Donation', date: '13th Jul 2024', status: 'Completed' },
  { id: 2, center: 'Regional Blood Center', type: 'Plasma Donation', date: '13th Jul 2024', status: 'Completed' },
  { id: 3, center: 'National Blood Service', type: 'Platelet Donation', date: '14th Jul 2024', status: 'Completed' },
  { id: 4, center: 'Hope Foundation Blood Drive', type: 'Blood Donation', date: '20th Jun 2024', status: 'Completed' },
];

function RecentDonations() {
  return (
    <div>
      <h2 className=" font-medium text-[16px] mb-2 text-gray-500">Recent Donations</h2>
      <div className="p-4 bg-white rounded-lg shadow-sm border-l-8 border-red-400">
        <ul>
          {donations.map((donation) => (
            <li key={donation.id} className="mb-2 flex items-center justify-between">
              <div className="flex justify-between items-center rounded-md border-b border-gray-300 pb-2 w-full cursor-pointer hover:bg-slate-100 hover:translate-y-[-5px] duration-300 px-4">
                <div>
                  <div className='flex gap-4 items-center'>
                    <h2 className="text-[#39827a]">{donation.center}</h2>
                    <p className='text-gray-700 text-[12px] font-medium bg-slate-200 px-2 py-1 rounded w-15 h-7 text-center'>{donation.status}</p>
                  </div>
                  <p className="text-gray-400 text-[14px]">{donation.type} - {donation.date}</p>
                </div>
                <FaChevronRight className="text-gray-400 text-[16px]" />
              </div>
            </li>
          ))}
        </ul>
        <button className='text-[#39827a] hover:underline underline-offset-4 flex items-center gap-1'>View all <FaChevronRight className="text-[12px]" /> </button>
      </div>
    </div>
  );
}

export default RecentDonations;
