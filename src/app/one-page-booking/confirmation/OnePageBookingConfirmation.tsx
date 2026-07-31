"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaLocationDot, FaPhone, FaHeadset } from "react-icons/fa6";

const TIP_ICON_30_MINUTES = "/icon/30-minutes%201.png";
const TIP_ICON_LOGISTICS = "/icon/logistics-delivery%201.png";
import { useJobBooking } from "@/components/JobBooking/JobBookingHook";
import { removeCountryFromAddress } from "@/utils/helper";
import { googleApiKey } from "@/config";
import {
  buildConfirmationSnapshot,
  buildConfirmationSnapshotFromJob,
  buildConfirmationStaticMapUrl,
  clearBookingConfirmationSnapshot,
  extractQuotationContact,
  formatConfirmationJobId,
  hasConfirmationSnapshotContent,
  loadBookingConfirmationSnapshot,
  mergeConfirmationSnapshots,
  normalizeDropOffLocation,
  normalizePickUpLocation,
  normalizeStopLocations,
  isMongoObjectId,
  resolveConfirmationJobId,
  resolveDisplayJobIdFromUrl,
  resolveQuotationLookupId,
  type BookingConfirmationSnapshot,
} from "@/utils/bookingConfirmationStorage";
import { getJobByQuotationId, verifyPayment } from "@/lib/serverAction/bookingAction";
import { fetchPublicQuotationById } from "@/utils/secureQuotation";
import OpfBookingHeader from "@/components/JobBooking/OnePageMobile/OpfBookingHeader";
import TruckLoader from "@/components/TruckLoader";
import "@/components/JobBooking/OnePageMobile/one-page-mobile.scss";
import "./one-page-confirmation.scss";

const SUPPORT_PHONE = "tel:1300 01 31 31";
const SUPPORT_DISPLAY = "1300 01 31 31";

const resolveDisplayRef = async (
  lookupId: string | undefined,
  contact: { email: string; phone: string },
  fallbacks: (string | undefined)[]
): Promise<string | undefined> => {
  for (const ref of fallbacks) {
    if (ref && !isMongoObjectId(ref)) return ref;
  }
  if (lookupId && !isMongoObjectId(lookupId)) return lookupId;
  if (!lookupId || (!contact.email && !contact.phone)) return undefined;

  const publicQuotation = await fetchPublicQuotationById(lookupId, contact);
  return resolveConfirmationJobId(publicQuotation);
};

type BookingConfirmationProps = {
  initialSnapshot?: BookingConfirmationSnapshot | null;
};

const OnePageBookingConfirmation = ({ initialSnapshot = null }: BookingConfirmationProps) => {
  const searchParams = useSearchParams();
  const { resetStep, resetJobBooking, resetLabour, setReBooking, setMoverData, jobBooking, quotation } =
    useJobBooking();

  const [snapshot, setSnapshot] = useState<BookingConfirmationSnapshot | null>(initialSnapshot);
  const [isHydrating, setIsHydrating] = useState(
    !hasConfirmationSnapshotContent(initialSnapshot)
  );

  useEffect(() => {
    let cancelled = false;

    const applySnapshot = (next: BookingConfirmationSnapshot | null) => {
      if (!cancelled && next) setSnapshot((prev) => mergeConfirmationSnapshots(next, prev));
    };

    const hydrate = async () => {
      const quotationIdParam = searchParams.get("quotationId") || undefined;
      const urlJobIdParam = searchParams.get("jobId") || undefined;
      const urlDisplayRef = resolveDisplayJobIdFromUrl(urlJobIdParam, quotationIdParam);
      let contact = extractQuotationContact(jobBooking);

      const stored = loadBookingConfirmationSnapshot();
      if (hasConfirmationSnapshotContent(stored)) {
        applySnapshot(stored);
        clearBookingConfirmationSnapshot();
      }

      if (hasConfirmationSnapshotContent(initialSnapshot)) {
        applySnapshot(initialSnapshot);
      }

      if (urlDisplayRef) {
        applySnapshot({
          jobId: urlDisplayRef,
          pickupLine: "",
          dropoffLine: "",
        });
      }

      const fromStore = buildConfirmationSnapshot(jobBooking);
      if (fromStore.pickupLine || fromStore.dropoffLine || fromStore.stopLines?.length) {
        applySnapshot(fromStore);
      }

      const paymentIntent = searchParams.get("payment_intent");
      const redirectStatus = searchParams.get("redirect_status");
      const needsApi =
        paymentIntent &&
        (!redirectStatus || redirectStatus === "succeeded") &&
        !(initialSnapshot?.pickupLine && initialSnapshot?.dropoffLine);

      let jobData: any = null;

      if (needsApi) {
        try {
          const verifyRes = await verifyPayment({ paymentIntentId: paymentIntent });
          if (verifyRes?.status === 200 && verifyRes.data) {
            contact = extractQuotationContact(verifyRes.data) || contact;
            const quotationId =
              resolveQuotationLookupId(verifyRes.data) || quotationIdParam;
            let fromVerify = buildConfirmationSnapshotFromJob(verifyRes.data);

            if (quotationId) {
              const jobRes = await getJobByQuotationId(quotationId);
              if (jobRes?.status === 200 && jobRes.data) {
                jobData = jobRes.data;
                contact = extractQuotationContact(jobData) || contact;
                fromVerify = mergeConfirmationSnapshots(
                  buildConfirmationSnapshotFromJob(jobData),
                  fromVerify
                )!;
              }
            }
            applySnapshot(fromVerify);
          }
        } catch (error) {
          console.error("Error loading confirmation from payment:", error);
        }
      }

      if (quotationIdParam) {
        try {
          const jobRes = await getJobByQuotationId(quotationIdParam);
          if (jobRes?.status === 200 && jobRes.data) {
            jobData = jobRes.data;
            contact = extractQuotationContact(jobData) || contact;
            applySnapshot(buildConfirmationSnapshotFromJob(jobData));
          }
        } catch (error) {
          console.error("Error loading confirmation job:", error);
        }

        const displayRef = await resolveDisplayRef(
          quotationIdParam,
          contact,
          [
            urlDisplayRef,
            resolveConfirmationJobId(jobData),
            resolveConfirmationJobId(quotation),
            initialSnapshot?.jobId,
            stored?.jobId,
          ]
        );

        if (displayRef) {
          applySnapshot({
            jobId: displayRef,
            pickupLine: "",
            dropoffLine: "",
          });
        }
      }

      try {
        resetStep();
        resetJobBooking();
        resetLabour();
        setReBooking({});
        setMoverData("");
      } catch (error) {
        console.error("Error resetting booking data:", error);
      } finally {
        if (!cancelled) setIsHydrating(false);
      }
    };

    hydrate();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  const pickupLine =
    snapshot?.pickupLine ||
    removeCountryFromAddress(jobBooking?.pickUpLocation?.address?.addressLine1) ||
    "";
  const dropoffLine =
    snapshot?.dropoffLine ||
    removeCountryFromAddress(jobBooking?.dropOffLocation?.address?.addressLine1) ||
    "";

  const stopLines = useMemo(() => {
    if (snapshot?.stopLines?.length) return snapshot.stopLines;
    if (!Array.isArray(jobBooking?.stopOvers)) return [];
    return jobBooking.stopOvers
      .map((stop: { address?: { addressLine1?: string } }) =>
        removeCountryFromAddress(stop?.address?.addressLine1) || stop?.address?.addressLine1 || ""
      )
      .filter(Boolean);
  }, [snapshot?.stopLines, jobBooking?.stopOvers]);

  const jobId = formatConfirmationJobId(
    snapshot?.jobId ||
      resolveDisplayJobIdFromUrl(
        searchParams.get("jobId"),
        searchParams.get("quotationId")
      ) ||
      resolveConfirmationJobId(quotation) ||
      undefined
  );

  const mapImageUrl = useMemo(() => {
    const pickUpLocation =
      snapshot?.pickUpLocation || normalizePickUpLocation(jobBooking);
    const dropOffLocation =
      snapshot?.dropOffLocation || normalizeDropOffLocation(jobBooking);
    const stopLocations = snapshot?.stopLocations?.length
      ? snapshot.stopLocations
      : normalizeStopLocations(jobBooking);

    return buildConfirmationStaticMapUrl(
      pickUpLocation,
      stopLocations,
      dropOffLocation,
      googleApiKey
    );
  }, [snapshot, jobBooking]);

  return (
    <>
      {isHydrating && <TruckLoader />}
      <div className="one-page-booking-shell">
      <OpfBookingHeader variant="confirmation" />
      <div className="opf-confirmation">
      {mapImageUrl ? (
        <div className="opf-confirmation__map">
          <img src={mapImageUrl} alt="" className="opf-confirmation__map-img" />
        </div>
      ) : (
        <div className="opf-confirmation__map opf-confirmation__map--placeholder" aria-hidden />
      )}

      <div className="opf-confirmation__body">
        <div className="opf-confirmation__status">
          <div className="opf-confirmation__status-row">
            <img
              src="/images/confirmed%20booking.png"
              alt="Booking Confirmed"
              className="opf-confirmation__status-badge"
            />
          </div>
          <p className="opf-confirmation__job-id">
            <span className="opf-confirmation__job-label">Job#</span>
            <span className="opf-confirmation__job-number"> {jobId}</span>
          </p>
        </div>

        <div className="opf-confirmation__route-card">
          <div className="opf-confirmation__route-inner">
            <div className="opf-confirmation__route-markers" aria-hidden>
              <span className="opf-confirmation__route-dot opf-confirmation__route-dot--pickup" />
              {stopLines.map((_, index) => (
                <React.Fragment key={`stop-marker-${index}`}>
                  <span className="opf-confirmation__route-connector" />
                  <span className="opf-confirmation__route-dot opf-confirmation__route-dot--stop" />
                </React.Fragment>
              ))}
              <span className="opf-confirmation__route-connector" />
              <FaLocationDot className="opf-confirmation__route-pin" />
            </div>
            <div className="opf-confirmation__route-texts">
              <p className="opf-confirmation__route-address">{pickupLine || "Pickup address"}</p>
              {stopLines.map((line, index) => (
                <p key={`stop-line-${index}`} className="opf-confirmation__route-address">
                  {line || `Stop ${index + 1}`}
                </p>
              ))}
              <p className="opf-confirmation__route-address">{dropoffLine || "Drop-off address"}</p>
            </div>
          </div>
        </div>

        <div className="opf-confirmation__next-box">
          <h2 className="opf-confirmation__next-title">What happens next?</h2>
          <p>
            <strong>Advance Bookings:</strong> Mover details will be shared 1 day before your move.
          </p>
          <p>
            <strong>Same Day Bookings:</strong> Once a mover confirms, their details will be shared
            with you.
          </p>
        </div>

        <div className="opf-confirmation__tips">
          <div className="opf-confirmation__tip-row">
            <img
              src={TIP_ICON_30_MINUTES}
              alt=""
              width={36}
              height={36}
              className="opf-confirmation__tip-icon"
              aria-hidden
            />
            <p className="opf-confirmation__tip-text">
              Your mover will contact you approx. 20-30 mins before arrival.
            </p>
          </div>
          <div className="opf-confirmation__tip-row">
            <img
              src={TIP_ICON_LOGISTICS}
              alt=""
              width={36}
              height={36}
              className="opf-confirmation__tip-icon"
              aria-hidden
            />
            <p className="opf-confirmation__tip-text">
              Please make sure everything is ready before arrival
            </p>
          </div>
        </div>

        <div className="opf-confirmation__contact">
          <div className="opf-confirmation__contact-heading">
            <FaHeadset aria-hidden />
            <span>Questions to Ask?</span>
          </div>
          <a href={SUPPORT_PHONE} className="opf-confirmation__phone-btn">
            <FaPhone aria-hidden />
            <span>{SUPPORT_DISPLAY}</span>
          </a>
          <p className="opf-confirmation__hours">MON-SAT 8AM-5PM</p>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default OnePageBookingConfirmation;
