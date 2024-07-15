import React, { useState } from "react";
import background1 from './../assets/images/bgCard.png'; // Replace with your background image path
import background2 from './../assets/images/bgCard2.png'; // Replace with your background image path
import AppointmentForm from "./AppointmentForm";
import BookingCard from "./BookingCard";
import { FaPlusCircle } from "react-icons/fa";
import { MdAddHome } from "react-icons/md";

function BookingDashboard() {
  const [activeForm, setActiveForm] = useState(null);

  const handleCardClick = (formType) => {
    setActiveForm(formType);
  };

  return (
    <div>
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
      {activeForm === "clinic" && <AppointmentForm title="Book a Clinic Appointment" />}
      {activeForm === "home" && <AppointmentForm title="Request a Home Visit" />}
    </div>
  );
}

export default BookingDashboard;
