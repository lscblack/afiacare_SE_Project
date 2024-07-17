import React from 'react';
import { Carousel } from 'antd';
import FirstAidImg1 from '../../../assets/images/FirstAidImg1.jpg';
import FirstAidImg2 from '../../../assets/images/FirstAidImg2.jpg';
import FirstAidImg3 from '../../../assets/images/FirstAidImg3.jpg';
import FirstAidImg4 from '../../../assets/images/FirstAidImg4.avif';
import FirstAidImg5 from '../../../assets/images/FirstAidImg5.jpg';
import FirstAidImg6 from '../../../assets/images/FirstAidImg6.avif';
import FirstAidImg7 from '../../../assets/images/FirstAidImg7.jpg';
import FirstAidImg8 from '../../../assets/images/FirstAidImg8.jpg';

const firstAidInstructions = [
  { 
    title: 'Poisoning', 
    image: FirstAidImg1, 
    buttonText: 'Learn More' 
  },
  { 
    title: 'Bleeding', 
    image: FirstAidImg2, 
    buttonText: 'Learn More' 
  },
  { 
    title: 'Burns', 
    image: FirstAidImg3, 
    buttonText: 'Learn More' 
  },
  { 
    title: 'Choking', 
    image: FirstAidImg4, 
    buttonText: 'Learn More' 
  },
  { 
    title: 'Fractures', 
    image: FirstAidImg5, 
    buttonText: 'Learn More' 
  },
  { 
    title: 'Drowning', 
    image: FirstAidImg6, 
    buttonText: 'Learn More' 
  },
  { 
    title: 'Heart Attack', 
    image: FirstAidImg7, 
    buttonText: 'Learn More' 
  },
  { 
    title: 'Heat Stroke', 
    image: FirstAidImg8, 
    buttonText: 'Learn More' 
  },
];

// Helper function to chunk the firstAidInstructions array
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

function FirstAidCards() {
  const chunkedInstructions = chunkArray(firstAidInstructions, 4);

  return (
    <div>
      <Carousel arrows autoplay>
        {chunkedInstructions.map((chunk, chunkIndex) => (
          <div key={chunkIndex}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 px-6">
              {chunk.map((aid, index) => (
                <div 
                  key={index} 
                  className="flex flex-col rounded-lg border cursor-pointer overflow-hidden bg-white transform hover:scale-105 duration-300"
                >
                  <img src={aid.image} alt={aid.title} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">{aid.title}</h2>
                    <button className="bg-[#39827a] text-white px-4 py-2 rounded hover:bg-[#368a80] duration-300">
                      {aid.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default FirstAidCards;
