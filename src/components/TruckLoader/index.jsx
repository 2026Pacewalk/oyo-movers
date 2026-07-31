"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./TruckLoader.scss";

const TruckLoader = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div className="loader-wrapper">
      <div className="truck-loader-main" />
      <div className="truck-wrapper">
        <div className="truck">
          <div className="truck-container" />
          <div className="glases" />
          <div className="bonet" />
          <div className="base" />
          <div className="base-aux" />
          <div className="wheel-back" />
          <div className="wheel-front" />
          <div className="smoke" />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TruckLoader;
