import React, { useState } from "react";
import background1 from './../assets/images/bgCard.png'; // Replace with your background image path
import background2 from './../assets/images/bgCard2.png'; // Replace with your background image path
import AppointmentForm from "./AppointmentForm";
import HomeVisitForm from "./HomeVisitForm";
import BookingCard from "./BookingCard";
import { FaPlusCircle } from "react-icons/fa";
import { MdAddHome } from "react-icons/md";

function BookingDashboard() {
  const [activeForm, setActiveForm] = useState(null);

  const handleCardClick = (formType) => {
    setActiveForm(formType);
  };

  const handleCloseDrawer = () => {
    setActiveForm(null);
  };

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row justify-center">
        <BookingCard
          title="Book clinic appointment"
          backgroundImage={background1}
          Icon={FaPlusCircle}
          onClick={() => handleCardClick("clinic")}
        />
        <BookingCard
          title="Request home visit"
          backgroundImage={background2}
          Icon={MdAddHome}
          onClick={() => handleCardClick("home")}
        />
      </div>

      {activeForm && (
        <div className="fixed inset-0 flex justify-end z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0" onClick={handleCloseDrawer}></div>
          <div className="bg-white w-full sm:w-1/2 md:w-1/3 lg:w-2/4 p-4 shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0">
            {activeForm === "clinic" ? (
              <AppointmentForm onClose={handleCloseDrawer} />
            ) : (
              <HomeVisitForm onClose={handleCloseDrawer} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingDashboard;
