"use client";
import { StripeCardElementOptions, } from "@stripe/stripe-js";
import { FC, useEffect } from "react";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { IoMdSave } from "react-icons/io";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import IconButton from "../IconButton";
import { useJobBooking } from "../JobBooking/JobBookingHook";
import { useRouter } from "next/navigation";
import { postApi } from "@/lib/api";
import { getCookie } from "@/lib/cookies";
import { tokenKey } from "@/config";
import moment from "moment";
import {
  buildConfirmationSnapshot,
  saveBookingConfirmationSnapshot,
} from "@/utils/bookingConfirmationStorage";

const getStripeOptions = (clientSecret?: string) => {
  if (clientSecret) {
    return {
      mode: "payment" as const,
      clientSecret,
      appearance: {},
    };
  }
  return {
    mode: "setup" as const,
    currency: "usd",
    appearance: {
      /*...*/
    },
  };
};
const CARD_ELEMENT_OPTIONS: StripeCardElementOptions = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "#B6C1CE",
      color: "#151147",
      fontSize: "16px",
      "::placeholder": {
        color: "#B6C1CE",
      },
    },
    complete: {},
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#151147",
      },
    },
  },
};
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "";

const stripePromise = loadStripe(stripePublicKey);

const StripePaymentDetails: FC<any> = ({ isCompletePayment, rebooking }) => {
  return (
    <Elements stripe={stripePromise} options={getStripeOptions() as any}>
      <CheckoutForm
        isCompletePayment={isCompletePayment}
        rebooking={rebooking}
      />
    </Elements>
  );
};

export default React.memo(StripePaymentDetails);

const CheckoutForm = ({ isCompletePayment, rebooking }: any) => {
  const stripe: any = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isCardSaving, setIsCardSaving] = useState<boolean>(false);
  const [isSaveDisable, setIsSaveDisable] = useState<boolean>(false);
  const router = useRouter();
  const { price, jobBooking, labour, couponId, couponDetails, reBooking, quotation, setQuotation, services, availableRequirements,} = useJobBooking();

  // ---------- helpers ----------
  const toInt = (v: any, fallback = 0) => {
    const n = typeof v === 'number' ? v : parseInt(String(v ?? ''), 10);
    return Number.isFinite(n) ? n : fallback;
  };

  const inferStairsOrLift = (level: string | undefined, liftBooked: boolean, flights: number) => {
    if (liftBooked) return 'lift';
    const lvl = (level || '').toLowerCase();
    if (lvl.includes('elevator') || lvl.includes('lift')) return 'lift';
    if (flights > 0 || lvl.includes('flight')) return 'stairs';
    return 'stairs';
  };

  const mapAddressBlock = (block: any) => {
    const lat = block?.address?.latitude ?? null;
    const lng = block?.address?.longitude ?? null;
    const level = block?.level || '';
    const flights = toInt(block?.flightOfStairs, 0);
    const liftBooked = !!block?.liftBooking;

    return {
      additionalInformation: block?.additionalInformation || '',
      address: block?.address?.addressLine1 || '',
      lat,
      lng,
      level,
      stairsOrLift: inferStairsOrLift(level, liftBooked, flights),
      liftBooked,
      ...(liftBooked ? { liftBookingTime: block?.bookingTimeSlot || '' } : {}),
      numberOfFlights: flights,
    };
  };

  const mapStops = (arr: any[]) =>
    Array.isArray(arr)
      ? arr.map((s) => ({
        id: s?.id || '',
        ...mapAddressBlock(s),
      }))
      : [];

  const transformBooking = (raw: any) => {
    // console.log('457987347978798347984745:', raw.distance);
    const selectedVahical = (availableRequirements ?? []).find((v: any) => String(v._id) == String(raw.vehicleType)) ?? null;
    const selectedService = (services ?? []).find((v: any) => String(v._id) == String(raw.moverService)) ?? null;
    console.log('selected payload:', selectedService);
    const pick = raw?.pickUpLocation ?? {};
    const drop = raw?.dropOffLocation ?? {};
    const listOfItems = raw?.listOfItems ?? [];
    const howFurnished = raw?.howFurnished ?? "";
    const spaceInProperty = raw?.spaceInProperty ?? "";
    console.log('howFurnished payload:', spaceInProperty);
    
    return {
      
      houseDetails: howFurnished ? {
        numberOfRooms:spaceInProperty,
        furnishingLevel:howFurnished
      } : null,
      officeDetails: !howFurnished ? {
        size:spaceInProperty
      } : null,
      promoCode: couponDetails?.code || "",
      serviceType: selectedService?.name,
      items: listOfItems,
      distance: raw.distance,
      pickup: mapAddressBlock(pick),
      dropoff: mapAddressBlock(drop),
      stops: mapStops(raw?.stopOvers),

      scheduledAt: raw.pickUpDate,
      // => "2025-10-07T00:00:00.000Z"

      timeSlot: { startTime: raw.pickupStartTime || '00:00', endTime: raw.pickupEndTime || '00:00' },

      pricing: {
        baseRate: selectedVahical?.baseDeposit,
        hourlyRate: selectedVahical?.moverPrice,
        estimatedHours: 4,
        additionalCharges: [],
        discount: .0,
        depositPercentage: 0,
        depositOptions: [],
      },
      selectedTeamPricing: {
        ...selectedVahical,
      },

      teamRequirements: { movers: 1, helpers: selectedVahical?.helperCount },
      vehicleRequirements: { type: selectedVahical?.vehicleType },

      ...(raw?.noteForMover ? { driverNotes: raw?.noteForMover } : {}),
      ...(raw?.noteForMover ? { customerNotes: raw?.noteForMover } : {}),

      dismantlingReassemblingRequired: !!raw?.dismantlingAndAssembly,
      packingAndMoving: !!raw?.packingAndUnpacking,

      photos: Array.isArray(raw?.itemImages) ? raw.itemImages : [],

      rawData: raw
    };
  };

  // ---------- quotation creation ----------
  const createQuotation = async () => {
    try {
      const token = await getCookie(tokenKey);
      if (!token) {
        setErrorMessage('Please login to continue');
        return { success: false, error: 'Please login to continue' };
      }

      const payload = transformBooking(jobBooking);
      // console.log('payload:', payload);

      const res = await postApi('quotations', payload);
      // console.log('res payload:', res);
      // return { success: false, error: "waiting for payment link" };

      if (res.status === 201) {
        const quotationData = res.data?.data?.quotation;
        if (quotationData) {
          setQuotation(quotationData);
        }
        console.log('quotationData payload:', quotationData);
        // Return success with payment link
        return {
          success: true,
          paymentLink: quotationData?.paymentLink,
          quotation: quotationData?.quotation,
          clientSecret: quotationData?.clientSecret
        };
      } else {
        const errorMsg = res.data?.message || 'Failed to create quotation';
        console.error('Unexpected status', res.status, res.data);
        setErrorMessage(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (err: any) {
      console.error('Error creating quotation:', err);
      const errorMsg = err?.response?.data?.message || err?.message || 'Failed to create quotation';
      setErrorMessage(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // ---------- handle submit ----------
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setIsCardSaving(true);
    setIsSaveDisable(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // First create quotation
      const quotationResult = await createQuotation();

      if (!quotationResult.success) {
        console.error('Quotation creation failed:', quotationResult.error);
        setErrorMessage(quotationResult.error);
        return;
      }

      // Check if payment link exists
      if (!quotationResult.paymentLink) {
        setErrorMessage('Payment link not available. Please try again.');
        return;
      }

      console.log('Quotation created successfully, redirecting to payment...');
      console.log('Payment link:', quotationResult.paymentLink);

      // Show success message briefly before redirecting
      setErrorMessage(null);
      setSuccessMessage('Quotation created successfully! Redirecting to payment...');
      setIsCardSaving(false);
      setIsSaveDisable(false);

      const q = quotationResult.quotation || quotationResult;
      const jobId = q?._id || q?.quotationNumber || q?.reference;
      saveBookingConfirmationSnapshot(buildConfirmationSnapshot(jobBooking, jobId));

      // Small delay to show success state
      setTimeout(() => {
        window.location.href = quotationResult.paymentLink;
      }, 1500);

    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setIsCardSaving(false);
      setIsSaveDisable(false);
    } finally {
      setIsCardSaving(false);
      setIsSaveDisable(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-100 d-flex align-items-center justify-content-between gap-3 position-relative"
    >
      {/* <CardElement
        options={CARD_ELEMENT_OPTIONS}
        className="stripePayment w-100"
      /> */}

      <IconButton
        isLoading={isCardSaving}
        className="signupButton secureBooking"
        title={isCardSaving ? "" : "Secure Your Booking"}
        icon={<IoMdSave />}
        iconPosition="left"
        type="submit"
        disabled={isCardSaving}
      />
      {errorMessage && <div className="paymentErrorMsg">{errorMessage}</div>}
      {/* {successMessage && <div className="paymentSuccessMsg" style={{ color: 'green', marginTop: '10px' }}>{successMessage}</div>} */}
    </form>
  );
};
