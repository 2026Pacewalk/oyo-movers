import React, { Suspense } from "react";
import { Container } from "react-bootstrap";
import { redirect } from "next/navigation";
import { verifyPayment, getJobByQuotationId } from "@/lib/serverAction/bookingAction";
import { CheckStep } from "@/components";
import BookingProgress from "./Booking/BookingProgress";
import RestoreBookingData from "@/components/JobBooking/StepHandler/RestoreBookingData";
import BookingQuotationScope from "@/components/JobBooking/BookingQuotationScope";
import { Inter } from "next/font/google";
import Booking from "./Booking";
import { CheckPayment } from "@/components";
import PaymentEmbedBridge from "@/components/PaymentModal/PaymentEmbedBridge";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const JobBooking = async ({ searchParams }: any) => {
  let isPaymentDone = null;
  let jobData = null;

  if (searchParams?.payment_intent) {
    let payload = {
      paymentIntentId: searchParams?.payment_intent,
    };
    const res = await verifyPayment(payload);

    if (res?.status === 200) {
      const quotationId =
        searchParams?.quotationId ||
        res?.data?._id ||
        res?.data?.quotationId ||
        res?.data?.quotationNumber;
      const confirmParams = new URLSearchParams({ payment: "success" });
      if (quotationId) confirmParams.set("quotationId", String(quotationId));
      redirect(`/booking/confirmation?${confirmParams.toString()}`);
    } else {
      isPaymentDone = false;
    }
  }

  // Fetch job data if quotationId is present
  if (searchParams?.quotationId) {
    try {
      const res = await getJobByQuotationId(searchParams.quotationId);
      if (res?.status === 200) {
        jobData = res.data;
      }
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  }

  return (
    <div className={inter.className}>
      <Suspense fallback={null}>
        <BookingQuotationScope />
        <PaymentEmbedBridge />
      </Suspense>
      <Suspense fallback={null}>
        <RestoreBookingData jobData={jobData} />
      </Suspense>
      <CheckStep step={searchParams?.step} />
      {searchParams?.payment_intent && (
        <CheckPayment
          isPaymentDone={isPaymentDone}
          pendingPayment={searchParams?.isCompletePayment}
        />
      )}
      <BookingProgress />
      <Container className="jobBookinContainer">
        <Booking />
      </Container>
    </div>
  );
};

export default JobBooking;
