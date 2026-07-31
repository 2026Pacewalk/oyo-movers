"use client";

import { useEffect } from "react";
import { useJobBookingStore } from "../jobBookingStore";

/**
 * When the Select Vehicle step is shown, if no vehicle is selected yet,
 * default to Medium Truck until the user chooses otherwise.
 */
export default function SetDefaultMediumTruck() {
  const availableRequirements = useJobBookingStore((s) => s.availableRequirements);
  const vehicleType = useJobBookingStore((s) => s.jobBooking.vehicleType);
  const setVehicleType = useJobBookingStore((s) => s.setVehicleType);

  useEffect(() => {
    if (!Array.isArray(availableRequirements) || availableRequirements.length === 0) return;
    if (vehicleType) return;
    const mediumTruck = availableRequirements.find((r: any) => {
      const vehicleName = String(r?.vehicleName || "").toLowerCase();
      const vehicleDisplayName = String(r?.vehicleDisplayName || "").toLowerCase();
      return (
        vehicleName === "medium truck" ||
        vehicleName === "med truck" ||
        vehicleDisplayName.includes("medium truck") ||
        vehicleDisplayName.includes("med truck")
      );
    });
    if (mediumTruck?._id) setVehicleType(mediumTruck._id);
  }, [availableRequirements, vehicleType, setVehicleType]);

  return null;
}
