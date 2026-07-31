
"use client"

import { useJobBooking } from "@/components/JobBooking/JobBookingHook"

const ToggleDrawerButton = () => {
  const { activeStep } = useJobBooking();
  
  const toggleDrawer = () => {
    const panel = document.getElementById("bookingDetailsRightPannel")
    if (!panel) return
    if (panel.classList.contains("showDrawer")) {
      panel.classList.remove("showDrawer")
    } else {
      panel.classList.add("showDrawer")
    }
  }

  // Hide button on first step (step 0)
  if (activeStep === 0) {
    return null;
  }

  return (
    <div className="bookingbtn-wrapper">
      <button type="button" onClick={toggleDrawer} className="bookingbtn">
        View Booking
      </button>
    </div>
  )
}

export default ToggleDrawerButton