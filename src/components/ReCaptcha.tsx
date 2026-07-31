"use client";
import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { getRecaptchaSiteKey } from "@/utils/recaptchaSiteKey";

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
  onExpire?: () => void;
  onError?: () => void;
  error?: string;
  touched?: boolean;
}

const ReCaptcha: React.FC<ReCaptchaProps> = ({
  onVerify,
  onExpire,
  onError,
  error,
  touched = false,
}) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleVerify = (token: string | null) => {
    onVerify(token);
  };

  const handleExpire = () => {
    if (onExpire) onExpire();
  };

  const handleError = () => {
    if (onError) onError();
  };

  return (
    <div className="recaptcha-container">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={getRecaptchaSiteKey()}
        onChange={handleVerify}
        onExpired={handleExpire}
        onErrored={handleError}
        theme="light"
        size="normal"
      />
      {error && touched ? (
        <span className="errorMessage">{String(error)}</span>
      ) : null}
    </div>
  );
};

export default ReCaptcha;
