import { Suspense } from "react";
import BookingConfirmation from "./BookingConfirmation";

export default function ConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <BookingConfirmation />
    </Suspense>
  );
}
