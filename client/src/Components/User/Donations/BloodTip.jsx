import React, { useState, useEffect } from 'react';

const tips = [
  "Drink plenty of water before your donation.",
  "Eat a healthy meal before donating.",
  "Avoid fatty foods before donation.",
  "Wear clothing with sleeves that can be rolled up easily.",
  "Bring a list of medications you are currently taking.",
  "Make sure you get a good night's sleep before donating.",
  "Avoid heavy lifting or vigorous exercise after donating.",
  "Stay hydrated and eat iron-rich foods after donating.",
];

function BloodTip() {
  const [tip, setTip] = useState('');

  useEffect(() => {
    // Select a random tip
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border-l-8 border-red-400">
      <h2 className="text-gray-500 font-medium text-[16px] mb-2">Blood Donation Tip</h2>
      <p className="text-gray-400 text-[14px] font-medium">{tip}</p>

    </div>
  );
}

export default BloodTip;
