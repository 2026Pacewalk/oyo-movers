"use client";

import {
  useDraftJobBookingStore,
  DraftJobBookingStore,
} from "./DraftjobBookingStore";

export const useDraftJobBooking = () =>
  useDraftJobBookingStore((s: DraftJobBookingStore) => s);
