import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

function FAQ() {
  const lang = useSelector(state => state.afiaCare.langs); // Get the current language from Redux store

  const faqData = [
    {
      question: lang.faq_question1,
      answer: lang.faq_answer1
    },
    {
      question: lang.faq_question2,
      answer: lang.faq_answer2
    },
    {
      question: lang.faq_question3,
      answer: lang.faq_answer3
    },
    {
      question: lang.faq_question4,
      answer: lang.faq_answer4
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations
    });
  }, []);

  return (
    <div className='bg-[#ffffff] p-8' data-aos="fade-up">
      <h2 className='text-[#39827a] text-3xl mb-4 text-center'>{lang.faq_title}</h2>
      <div className='space-y-4'>
        {faqData.map((faq, index) => (
          <div key={index} className='border rounded-lg overflow-hidden'>
            <div className='flex justify-between items-center p-4 bg-[#F1F5F9] cursor-pointer'
              onClick={() => toggleFAQ(index)}
              data-aos="fade-right" // Animation for the question
            >
              <h3 className='text-lg text-[#39827a]'>{faq.question}</h3>
              {activeIndex === index ? (
                <FaChevronUp className='text-[#39827a]' />
              ) : (
                <FaChevronDown className='text-[#39827a]' />
              )}
            </div>
            {activeIndex === index && (
              <div className='p-4 bg-white' data-aos="fade-left"> {/* Animation for the answer */}
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
