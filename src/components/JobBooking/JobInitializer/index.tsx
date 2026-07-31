"use client";
import React, { useEffect } from "react";
import { useJobBookingStore } from "../jobBookingStore";

const AppInitializer = ({
  children,
  services,
  timeslots,
  availableRequirements,
  savePaymetCards,
}: {
  children: React.ReactNode;
  services?: any;
  timeslots?: any;
  availableRequirements?: any;
  savePaymetCards?: any;
}) => {
  useEffect(() => {
    const patch: Record<string, unknown> = {};
    if (services) patch.services = services;
    if (timeslots) patch.timeslots = timeslots;
    if (availableRequirements) patch.availableRequirements = availableRequirements;
    if (savePaymetCards) patch.savePaymetCards = savePaymetCards;
    if (Object.keys(patch).length) {
      useJobBookingStore.setState(patch);
    }
  }, [services, timeslots, availableRequirements, savePaymetCards]);

  return <>{children}</>;
};

export default React.memo(AppInitializer);
