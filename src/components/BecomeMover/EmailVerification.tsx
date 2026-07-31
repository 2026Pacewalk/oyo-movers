"use client";
import React, { useState } from "react";
import IconButton from "../IconButton";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { resendVerificationEmail } from "@/lib/serverAction/becomeMoverActions";
import { errorToast, successToast } from "@/lib/toaster";

const EmailVerification = ({ email, onBack, onNext, verified }: { email: string; onBack: () => void; onNext: () => void; verified?: boolean; }) => {
  const [isSending, setIsSending] = useState(false);

  const handleResend = async () => {
    if (!email) {
      errorToast("Email not available");
      return;
    }
    try {
      setIsSending(true);
      const res = await resendVerificationEmail(email);
      if (res.status === 200) {
        // success toast removed per request
      } else {
        errorToast(res.message || "Failed to send verification email");
      }
    } catch (e: any) {
      errorToast(e?.message || "Failed to send verification email");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="profile-form-wrapper tabContainer">
      <div className="form-header">
        <h3>Email Verification</h3>
        <p className="form-description">We sent a verification link to {email || "your email"}. If you didn't receive it, you can resend below.</p>
        <div className="d-flex align-items-center gap-2 mt-2">
          <span className={`badge ${verified ? 'bg-success' : 'bg-warning text-dark'}`}>
            {verified ? 'Verified' : 'Not Verified'}
          </span>
        </div>
      </div>

      <div className="form-section">
        <div className="d-flex gap-2">
          <IconButton
            title={isSending ? "Sending..." : "Resend Email"}
            icon={<FaArrowAltCircleRight />}
            onClick={handleResend}
            className="footerButton"
            type="button"
          />
        </div>
      </div>

      <div className="footerBtn d-flex justify-content-end align-items-center">
        <IconButton
          title="Next Step"
          icon={<FaArrowAltCircleRight />}
          onClick={onNext}
          className="footerButton"
          type="button"
        />
      </div>
    </div>
  );
};

export default EmailVerification;


