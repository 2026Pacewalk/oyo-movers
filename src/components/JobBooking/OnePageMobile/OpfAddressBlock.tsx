"use client";

import React, { useEffect, useMemo, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
import { FaChevronDown, FaChevronUp, FaLocationDot } from "react-icons/fa6";
import { adressLevels } from "@/helper";
import OpfPlacesInput from "./OpfPlacesInput";

type OpfAddressBlockProps = {
  index: number;
  placeholder: string;
  markerClass: "pickup" | "stop" | "dropoff";
  values: any;
  errors: any;
  touched: any;
  setFieldValue: (field: string, value: any) => void;
  setFieldTouched: (field: string, touched?: boolean) => void;
  onRemove?: () => void;
};

const OpfAddressBlock: React.FC<OpfAddressBlockProps> = ({
  index,
  placeholder,
  markerClass,
  values,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
  onRemove,
}) => {
  const [accessOpen, setAccessOpen] = useState(false);
  const [addressDisplay, setAddressDisplay] = useState(
    values?.addresses?.[index]?.address?.addressLine1 || ""
  );

  const savedLine = values?.addresses?.[index]?.address?.addressLine1 || "";

  useEffect(() => {
    setAddressDisplay((prev: string) => (prev === savedLine ? prev : savedLine));
  }, [savedLine]);

  const data = values?.addresses?.[index] || {};
  const addressError = errors?.addresses?.[index]?.address;
  const addressErrorMessage = useMemo(() => {
    if (!touched?.addresses?.[index]?.address || !addressError) return "";

    const addrErr = addressError;
    if (typeof addrErr === "string") return addrErr;
    if (addrErr?.latitude) return addrErr.latitude;

    const nested = Object.values(addrErr || {}).filter((v) => v != null && v !== "");
    if (!nested.length) return "";
    if (!savedLine) return "Address is required";
    return `${nested.join(", ")} is missing in address`;
  }, [addressError, touched?.addresses, index, savedLine]);
  const showError = Boolean(addressErrorMessage);

  const setAddress = (address: any) => {
    const nextAddress = { ...(address || {}) };
    setFieldValue(`addresses[${index}].address`, nextAddress);
    setAddressDisplay(nextAddress?.addressLine1 || "");
  };

  const setLevel = (level: string) => {
    setFieldValue(`addresses[${index}].level`, level);
    if (level !== "stairs") {
      setFieldValue(`addresses[${index}].flightOfStairs`, "0");
    } else if (Number(data?.flightOfStairs || 0) < 1) {
      setFieldValue(`addresses[${index}].flightOfStairs`, "1");
    }
  };

  const stairs = Math.max(1, Number(data?.flightOfStairs || 0));
  const instructionsMax = 160;
  const stairsTooltip = (
    <Tooltip id={`opf-stairs-tooltip-${index}`}>
      10 or less steps classified as 1 flight
    </Tooltip>
  );

  return (
    <div className={`opf-address-block opf-address-block--${markerClass}`}>
      {onRemove ? (
        <button type="button" className="opf-remove-stop" onClick={onRemove}>
          <span className="opf-remove-stop__dash">-</span> Remove Stop
        </button>
      ) : null}
      <div className="opf-field opf-field--address">
        <div className="opf-field__control">
          <span className={`opf-address-icon opf-address-icon--${markerClass}`} aria-hidden>
            <FaLocationDot className="opf-address-icon__svg" />
          </span>
          <OpfPlacesInput
            placeholder={placeholder}
            markerClass={markerClass}
            value={addressDisplay}
            onSelect={setAddress}
            onBlur={(e) => {
              const typed = (e?.target?.value || "").trim().toLowerCase();
              const selected = savedLine.trim().toLowerCase();
              if (!typed || typed !== selected) {
                setFieldValue(`addresses[${index}].address`, {});
              }
              setFieldTouched(`addresses[${index}].address`, true);
            }}
          />
        </div>
        {showError ? (
          <span className="opf-field__error">{addressErrorMessage}</span>
        ) : null}
      </div>

      <button type="button" className="opf-access-toggle" onClick={() => setAccessOpen((o) => !o)}>
        {accessOpen ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
        Access details
      </button>

      {accessOpen && (
        <div className="opf-access-panel">
          <div className="opf-access-levels">
            {adressLevels.map((level) => {
              const label = level.charAt(0).toUpperCase() + level.slice(1);
              const isActive = data?.level === level;

              if (level === "stairs" && !isActive) {
                return (
                  <button
                    key={level}
                    type="button"
                    className="opf-access-level-pill"
                    onClick={() => setLevel(level)}
                  >
                    {label}
                  </button>
                );
              }

              if (level === "stairs") {
                return (
                  <div
                    key={level}
                    className="opf-access-level-pill opf-access-level-pill--stairs active"
                  >
                    <span className="opf-access-level-pill__label">{label}</span>
                    <div className="opf-access-stairs-stepper" role="group" aria-label="Stair flights">
                        <button
                          type="button"
                          onClick={() =>
                            setFieldValue(
                              `addresses[${index}].flightOfStairs`,
                              String(Math.max(1, stairs - 1))
                            )
                          }
                          aria-label="Decrease stair flights"
                        >
                          −
                        </button>
                        <span>{stairs}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setFieldValue(`addresses[${index}].flightOfStairs`, String(stairs + 1))
                          }
                          aria-label="Increase stair flights"
                        >
                          +
                        </button>
                      </div>
                  </div>
                );
              }

              return (
                <button
                  key={level}
                  type="button"
                  className={`opf-access-level-pill ${isActive ? "active" : ""}`}
                  onClick={() => setLevel(level)}
                >
                  {label}
                </button>
              );
            })}
            {data?.level === "stairs" && (
              <OverlayTrigger
                placement="top"
                overlay={stairsTooltip}
                trigger={["hover", "focus", "click"]}
              >
                <button
                  type="button"
                  className="opf-access-info"
                  aria-label="10 or less steps classified as 1 flight"
                >
                  <BsInfoCircle aria-hidden />
                </button>
              </OverlayTrigger>
            )}
          </div>
          <div className="opf-instructions-wrap">
            <textarea
              className="opf-instructions"
              placeholder="Additional Information (Optional)"
              maxLength={instructionsMax}
              value={data?.additionalInformation || ""}
              onChange={(e) => setFieldValue(`addresses[${index}].additionalInformation`, e.target.value)}
            />
            <span className="opf-char-count" aria-live="polite">
              {(data?.additionalInformation || "").length}/{instructionsMax}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpfAddressBlock;
