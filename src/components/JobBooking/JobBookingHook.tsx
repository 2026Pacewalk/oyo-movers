"use client";
import { JobBookingStore, useJobBookingStore } from "./jobBookingStore";

export const useJobBooking = () =>
  useJobBookingStore((s: JobBookingStore) => s);
