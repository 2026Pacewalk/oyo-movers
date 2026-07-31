import React from "react";
import BookingForm from "./BookingForm";
import { Container } from "react-bootstrap";
import "./fast-booking.scss";

const FastBooking = () => {
  return (
    <Container>
      <div className="bookingFormWrapper">
        <h1 className="mb-4">Fast Booking</h1>
        <BookingForm />
      </div>
    </Container>
  );
};

export default FastBooking;
