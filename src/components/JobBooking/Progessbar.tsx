"use client";

import { useJobBooking } from "./JobBookingHook";

const Progessbar = () => {
  const { activeStep } = useJobBooking();
  const persent = (activeStep / 11) * 100;
  const style = {
    width: `${persent + 10}%`,
  };

  return (
    <div className="movingTruckProgess" style={style}>      
        <img src="/movingtruck1.png" alt="progressbar" />
    </div>
  );
};

export default Progessbar;
