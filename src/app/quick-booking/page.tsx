import React, { Suspense } from "react";
import { Container } from "react-bootstrap";
import { redirect } from "next/navigation";
import { verifyPayment, getJobByQuotationId } from "@/lib/serverAction/bookingAction";
import { resolveConfirmationJobId } from "@/utils/bookingConfirmationStorage";
import RestoreBookingData from "@/components/JobBooking/StepHandler/RestoreBookingData";
import BookingQuotationScope from "@/components/JobBooking/BookingQuotationScope";
import { Inter } from "next/font/google";
import { CheckPayment } from "@/components";
import PaymentEmbedBridge from "@/components/PaymentModal/PaymentEmbedBridge";
import OnePagePaymentGate from "@/components/PaymentModal/OnePagePaymentGate";
import OnePageBooking from "./OnePageBooking";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const OnePageBookingPage = async ({ searchParams }: any) => {
  let isPaymentDone = null;
  let jobData = null;

  if (searchParams?.payment_intent) {
    const payload = {
      paymentIntentId: searchParams?.payment_intent,
    };
    const res = await verifyPayment(payload);

    if (res?.status === 200) {
      const lookupId =
        searchParams?.quotationId ||
        res?.data?._id ||
        res?.data?.quotationId ||
        res?.data?.quotationNumber;
      const displayJobId = resolveConfirmationJobId(res?.data);
      const confirmParams = new URLSearchParams({ payment: "success" });
      if (lookupId) confirmParams.set("quotationId", String(lookupId));
      if (displayJobId) confirmParams.set("jobId", String(displayJobId));
      redirect(`/quick-booking/confirmation?${confirmParams.toString()}`);
    } else {
      isPaymentDone = false;
    }
  }

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
    <div className={`${inter.className} quick-booking-page`}>
      <Suspense fallback={null}>
        <BookingQuotationScope />
        <PaymentEmbedBridge suppressSuccessToast />
      </Suspense>
      <RestoreBookingData jobData={jobData} />
      {searchParams?.payment_intent && (
        <CheckPayment
          isPaymentDone={isPaymentDone}
          pendingPayment={searchParams?.isCompletePayment}
          confirmationPath="/quick-booking/confirmation"
        />
      )}
      <Container className="jobBookinContainer opf-mobile-active">
        <Suspense fallback={null}>
          <OnePagePaymentGate>
            <OnePageBooking />
          </OnePagePaymentGate>
        </Suspense>
      </Container>
    </div>
  );
};

export default OnePageBookingPage;
