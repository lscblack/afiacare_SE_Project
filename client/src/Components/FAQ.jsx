import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function FAQ() {
  const faqData = [
    { question: "What is Afiacare?", answer: "Afiacare is a digital healthcare platform designed to improve the management and delivery of healthcare services in Cameroon." },
    { question: "How can I join Afiacare as a healthcare provider?", answer: "Healthcare providers can join Afiacare by registering on our platform and completing the required onboarding process." },
    { question: "What services does Afiacare offer to patients?", answer: "Afiacare offers services such as digitized patient records, doctor-patient consultations, health monitoring, and more." },
    { question: "How can donors contribute to Afiacare?", answer: "Donors can contribute by donating blood, organs, or financial aid through the Afiacare platform." }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='bg-[#ffffff] p-8'>
      <h2 className='text-[#39827a] text-3xl mb-4 text-center'>Frequently Asked Questions</h2>
      <div className='space-y-4'>
        {faqData.map((faq, index) => (
          <div key={index} className='border rounded-lg overflow-hidden'>
            <div 
              className='flex justify-between items-center p-4 bg-[#F1F5F9] cursor-pointer'
              onClick={() => toggleFAQ(index)}
            >
              <h3 className='text-lg  text-[#39827a]'>{faq.question}</h3>
              {activeIndex === index ? (
                <FaChevronUp className='text-[#39827a]' />
              ) : (
                <FaChevronDown className='text-[#39827a]' />
              )}
            </div>
            {activeIndex === index && (
              <div className='p-4 bg-white'>
                <p className='text-gray-400'>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
