'use client';

import { errorToast, successToast } from "@/lib/toaster";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyPayment } from "@/lib/serverAction/bookingAction";
import {
  buildConfirmationSnapshotFromJob,
  saveBookingConfirmationSnapshot,
} from "@/utils/bookingConfirmationStorage";

const VerifyPayment = ({ job }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');

  useEffect(() => {
    const verifyPaymentStatus = async () => {
      if (!job) {
        errorToast("Job not found");
        router.push('/booking');
        return;
      }

      if (job?.status !== 'pending') {
        successToast("Payment already completed");
        router.push('/booking');
        return;
      }

      // Check if we have payment intent parameters from Stripe redirect
      const paymentIntent = searchParams.get('payment_intent');
      const clientSecret = searchParams.get('client_secret');

      if (paymentIntent && clientSecret) {
        setIsVerifying(true);

        // Add timeout for verification
        const timeoutId = setTimeout(() => {
          setVerificationStatus('error');
          setIsVerifying(false);
          errorToast("Payment verification timed out. Please try again.");
        }, 30000); // 30 second timeout

        try {
          const verificationResult = await verifyPayment({
            paymentIntentId: paymentIntent,
            quotationId: job.quotationId || job._id
          });

          clearTimeout(timeoutId);

          if (verificationResult?.status === 200) {
            setVerificationStatus('success');
            successToast("Payment verified successfully!");

            const quotationId = job.quotationId || job._id;
            if (job?.rawData || job?.pickUpLocation) {
              saveBookingConfirmationSnapshot(
                buildConfirmationSnapshotFromJob(job, quotationId)
              );
            }

            const params = new URLSearchParams({ payment: "success" });
            if (quotationId) params.set("quotationId", String(quotationId));
            router.replace(`/booking/confirmation?${params.toString()}`);
          } else {
            setVerificationStatus('error');
            errorToast(verificationResult?.message || "Payment verification failed");
          }
        } catch (error: any) {
          clearTimeout(timeoutId);
          console.error("Payment verification error:", error);
          setVerificationStatus('error');
          errorToast("Payment verification failed. Please try again.");
        } finally {
          setIsVerifying(false);
        }
      }
    };

    verifyPaymentStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job, searchParams]);

  if (isVerifying) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5>Verifying your payment...</h5>
          <p className="text-muted">Please wait while we confirm your payment.</p>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'success') {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="text-success mb-3">
            <i className="fas fa-check-circle" style={{ fontSize: '3rem' }}></i>
          </div>
          <h5 className="text-success">Payment Successful!</h5>
          <p className="text-muted">Your payment has been verified. Redirecting to booking confirmation...</p>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'error') {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="text-danger mb-3">
            <i className="fas fa-exclamation-circle" style={{ fontSize: '3rem' }}></i>
          </div>
          <h5 className="text-danger">Payment Verification Failed</h5>
          <p className="text-muted">There was an issue verifying your payment. Please try again.</p>
          <div className="mt-3">
            <button
              className="btn btn-primary me-2"
              onClick={() => {
                // Retry verification
                setVerificationStatus('pending');
                window.location.reload();
              }}
            >
              Retry Verification
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => router.push('/booking')}
            >
              Back to Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
      <div className="text-center">
        <div className="text-muted mb-3">
          <i className="fas fa-clock" style={{ fontSize: '3rem' }}></i>
        </div>
        <h5>Waiting for Payment</h5>
        <p className="text-muted">Please complete your payment to continue.</p>
      </div>
    </div>
  );
};

export default VerifyPayment;