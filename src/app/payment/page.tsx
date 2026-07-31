import ReBook from "@/components/ReBook";
import { getApi } from "@/lib/api";
import { getQuotationById } from "@/lib/serverAction/bookingAction";
import { redirect } from "next/navigation";
import React from "react";
import VerifyPayment from "./VerifyPayment";
import { getCookie } from "@/lib/cookies";
import { tokenKey } from "@/config";

const page = async ({ searchParams }: any) => {
  // Check if we have payment intent parameters (from Stripe redirect)
  const paymentIntent = searchParams.payment_intent;
  const clientSecret = searchParams.client_secret;
  const quotationId = searchParams.quotationId;

  if (paymentIntent && clientSecret && quotationId) {
    // This is a payment verification flow
    const token = await getCookie(tokenKey);
    let jobData = null;

    if (token || searchParams.token) {
      jobData = await getQuotationById(quotationId, searchParams.token);
    }

    return (
      <div>
        <VerifyPayment job={jobData} />
      </div>
    );
  }

  // Original flow for quotation acceptance
  if (!searchParams.id) {
    return redirect("/booking");
  }

  const token = await getCookie(tokenKey);
  let jobData = null;
  let paymentCards = null;

  if (token || searchParams.token) {
    jobData = await getQuotationById(searchParams.id, searchParams.token);
    paymentCards = await getApi("me/cards", [], token || searchParams.token);
  }

  return (
    <div>
      <VerifyPayment job={jobData} />
      {jobData?.status === "pending" && (
        <ReBook reBookJob={jobData} timeslots={[]} paymentCards={paymentCards} token={searchParams?.token} />
      )}
    </div>
  );
};

export default page;
