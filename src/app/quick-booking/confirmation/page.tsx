import { Suspense } from "react";
import { getJobByQuotationId, verifyPayment } from "@/lib/serverAction/bookingAction";
import { fetchPublicQuotationById, fetchQuotationById } from "@/utils/secureQuotation";
import {
  buildConfirmationSnapshotFromJob,
  extractQuotationContact,
  isMongoObjectId,
  mergeConfirmationSnapshots,
  resolveConfirmationJobId,
  resolveQuotationLookupId,
  type BookingConfirmationSnapshot,
} from "@/utils/bookingConfirmationStorage";
import OnePageBookingConfirmation from "./OnePageBookingConfirmation";

type ConfirmationPageProps = {
  searchParams?: {
    quotationId?: string;
    jobId?: string;
    payment?: string;
    payment_intent?: string;
    redirect_status?: string;
  };
};

const LOG = "[OPF Confirmation SSR]";

async function loadSnapshotFromQuotationId(
  quotationId: string,
  displayJobId?: string
): Promise<BookingConfirmationSnapshot | null> {
  let snapshot: BookingConfirmationSnapshot | null = null;
  let jobData: any = null;

  try {
    const res = await getJobByQuotationId(quotationId);
    if (res?.status === 200 && res.data) {
      jobData = res.data;
      snapshot = buildConfirmationSnapshotFromJob(jobData);
    }
  } catch (error) {
    console.error(LOG, "getJobByQuotationId failed", error);
  }

  let displayRef =
    displayJobId ||
    resolveConfirmationJobId(jobData) ||
    (snapshot?.jobId && !isMongoObjectId(snapshot.jobId) ? snapshot.jobId : undefined);

  if (!displayRef || isMongoObjectId(displayRef)) {
    const contact = extractQuotationContact(jobData);
    if (contact.email || contact.phone) {
      try {
        const publicQuotation = await fetchPublicQuotationById(quotationId, contact);
        displayRef = resolveConfirmationJobId(publicQuotation) || displayRef;
      } catch (error) {
        console.error(LOG, "fetchPublicQuotationById failed", error);
      }
    }
  }

  if (!displayRef || isMongoObjectId(displayRef)) {
    try {
      const quotation = await fetchQuotationById(quotationId);
      displayRef = resolveConfirmationJobId(quotation) || displayRef;
    } catch (error) {
      console.error(LOG, "fetchQuotationById failed", error);
    }
  }

  if (displayRef && !isMongoObjectId(displayRef)) {
    return snapshot
      ? { ...snapshot, jobId: displayRef }
      : { jobId: displayRef, pickupLine: "", dropoffLine: "" };
  }

  return snapshot;
}

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  let initialSnapshot: BookingConfirmationSnapshot | null = null;

  const paymentIntent = searchParams?.payment_intent;
  const quotationIdParam = searchParams?.quotationId || searchParams?.jobId;
  const displayJobIdParam = searchParams?.jobId;

  if (
    paymentIntent &&
    (!searchParams?.redirect_status || searchParams.redirect_status === "succeeded")
  ) {
    try {
      const verifyRes = await verifyPayment({ paymentIntentId: paymentIntent });
      if (verifyRes?.status === 200 && verifyRes.data) {
        const quotationId = resolveQuotationLookupId(verifyRes.data) || quotationIdParam;
        initialSnapshot = buildConfirmationSnapshotFromJob(verifyRes.data);

        if (quotationId) {
          const jobSnapshot = await loadSnapshotFromQuotationId(
            quotationId,
            displayJobIdParam
          );
          initialSnapshot = mergeConfirmationSnapshots(jobSnapshot, initialSnapshot);
        }
      }
    } catch {
      /* client will fall back to session snapshot */
    }
  } else if (quotationIdParam) {
    initialSnapshot = await loadSnapshotFromQuotationId(
      quotationIdParam,
      displayJobIdParam
    );
  }

  return (
    <div className="opf-confirmation-page">
      <Suspense fallback={null}>
        <OnePageBookingConfirmation initialSnapshot={initialSnapshot} />
      </Suspense>
    </div>
  );
}
