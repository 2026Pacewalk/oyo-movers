"use client";
import React, { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import Input from "../Input";
import { Col, Row } from "react-bootstrap";
import {
  createReview,
  deleteQuotation,
  getJobByQuotationId,
  rateJob,
} from "@/lib/serverAction/bookingAction";
import { errorToast, successToast } from "@/lib/toaster";
import Button from "../Button";
import moment from "moment";
import { useUserData } from "../User/UserDataHook";
import Link from "next/link";
import Image from "../Image";
import Rating from "../Rating";
import EmptyState from "../EmptyState";
import {
  fetchQuotationById,
  getQuotationId,
  getQuotationPaymentLink,
  savePendingQuotationId,
} from "@/utils/secureQuotation";
import { PaymentModal, usePaymentModal } from "@/components/PaymentModal";
import PaymentEmbedBridge from "@/components/PaymentModal/PaymentEmbedBridge";
import { getApi, postApi } from "@/lib/api";
import { removeCountryFromAddress } from "@/utils/helper";
import axios from "axios";
import { apiUrl, tokenKey } from "@/config";
import { getCookie } from "@/lib/cookies";
import { getMoverDisplayName, getPublicJobRating } from "@/lib/rateMoverApi";

const JobBooking = ({ jobs, searchParams }: any) => {
  const [jobsData, setJobsData] = useState<any>(jobs || []);
  const showCancelButton = ["pending", "new", "escalated", "assigned", "pending_dispatch"];
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteReason, setDeleteReason] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteQuotationId, setDeleteQuotationId] = useState<string>("");
  const [continuingQuotationId, setContinuingQuotationId] = useState<string | null>(null);
  const [continuePaymentQuotationId, setContinuePaymentQuotationId] = useState<string | null>(null);
  const {
    show: paymentModalOpen,
    paymentLink: pendingPaymentLink,
    open: openPaymentModal,
    close: closePaymentModal,
  } = usePaymentModal();
  const [isCancelling, setIsCancelling] = useState<boolean>(false);
  const [downloadingInvoiceId, setDownloadingInvoiceId] = useState<string | null>(null);
  const { user } = useUserData();
  const [dataForReview, setDataForReview] = useState<any>(null);
  const [reviewMoverName, setReviewMoverName] = useState<string>("");
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);
  const checkCancelBooking = (pickUpDate: any) => {
    const pickUpDateObj = new Date(pickUpDate);
    const currentDate = new Date();
    const diff = Math.abs(pickUpDateObj.getTime() - currentDate.getTime());
    const hours = Math.floor(diff / 36e5);
    return hours < 48;
  };
  const checkIfJobCreatedInLast48Hours = (createdAt: any) => {
    const jobCreatedAt = new Date(createdAt);
    const currentDate = new Date();
    const diff = Math.abs(jobCreatedAt.getTime() - currentDate.getTime());
    const hours = Math.floor(diff / 36e5);
    return hours < 48;
  };

  useEffect(() => {
    if (searchParams?.review && searchParams?.id) {
      const reviewData = jobsData.find(
        (item: any) => item._id === searchParams.id
      );
      setDataForReview(reviewData);
    }
  }, [searchParams?.review]);

  useEffect(() => {
    if (jobs) {
      setJobsData(jobs);
    }
  }, [jobs]);

  useEffect(() => {
    if (!dataForReview) {
      setReviewMoverName("");
      return;
    }

    let cancelled = false;

    const applyName = (name: string) => {
      if (!cancelled && name && name !== "your mover") {
        setReviewMoverName(name);
        return true;
      }
      return false;
    };

    (async () => {
      if (applyName(getMoverDisplayName(dataForReview))) return;

      const jobKeys = [
        dataForReview.jobId,
        dataForReview.jobRef,
        dataForReview._id,
        dataForReview.quotationId,
      ]
        .filter(Boolean)
        .map(String);
      const uniqueKeys = Array.from(new Set(jobKeys));

      for (const key of uniqueKeys) {
        const publicRes = await getPublicJobRating(key);
        if (publicRes.ok && publicRes.data?.moverName) {
          if (applyName(publicRes.data.moverName)) return;
        }
      }

      for (const key of uniqueKeys) {
        try {
          const apiRes = await getApi(`customers/jobs/${key}`);
          const job = (apiRes as { job?: Record<string, unknown> })?.job ?? apiRes;
          if (job && typeof job === "object" && applyName(getMoverDisplayName(job as Record<string, unknown>))) {
            return;
          }
        } catch {
          // try next key
        }
      }

      for (const key of uniqueKeys) {
        const res = await getJobByQuotationId(key);
        if (res.status === 200 && res.data) {
          if (applyName(getMoverDisplayName(res.data as Record<string, unknown>))) {
            return;
          }
        }
      }

      if (!cancelled) {
        setReviewMoverName("");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [dataForReview]);


  const colorObject: any = {
    canceled: "cancel",
    pending: "pending",
    started: "started",
    new: "new",
    completed: "completed",
    escalated: "escalated",
  };

  const handelReview = async (data: any, item: any) => {
    const { mover, customer } = item;

    const payload = {
      quotationID: item._id,
      reviewType: "customerReview",
      reviewData: {
        rating: data.rating,
        comment: data.reviewMsg,
        from: {
          userType: "customer",
          user: customer?._id,
        },
        to: {
          userType: "mover",
          user: mover?.user?._id,
        },
      },
    };
    await createReview(payload)
      .then((res: any) => {
        if (res.status === 200) {
          successToast("Review Submitted Successfully");
          setDataForReview(null);
          if (searchParams?.review && searchParams?.id) {
            window.location.href = `/booking-list`;
          }
        } else {
          errorToast("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err, "err in review");
      });
  };

  const handleJobRating = async (data: any, item: any) => {
    setIsSubmittingReview(true);
    try {
      const response = await rateJob(item._id, data.rating, data.reviewMsg);
      if (response?.status === 200) {
        successToast("Review submitted successfully");
        setDataForReview(null);
        // Update the job data to reflect the new review
        setJobsData((prev: any) =>
          prev.map((job: any) =>
            job._id === item._id
              ? {
                ...job,
                reviewStatus: true,
                reviewCount: data.rating,
                customerReview: {
                  rating: data.rating,
                  comment: data.reviewMsg
                }
              }
              : job
          )
        );
      } else {
        errorToast(response?.message || "Failed to submit review");
      }
    } catch (error: any) {
      console.error("Error submitting review:", error);
      errorToast("Something went wrong");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const renderStarRating = (rating: number) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const starValue = i + 1;
      const isHalfStar = rating === i + 0.5;
      const isFullStar = rating >= starValue;

      if (isFullStar) {
        stars.push(
          <span key={i} className="star-filled">★</span>
        );
      } else if (isHalfStar) {
        stars.push(
          <span key={i} className="star-half">★</span>
        );
      } else {
        stars.push(
          <span key={i} className="star-empty">☆</span>
        );
      }
    }

    return stars;
  };
  const handelDelete = (id: string) => {
    setDeleteQuotationId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteReason.trim()) {
      errorToast("Please provide a reason for deletion");
      return;
    }

    setIsLoading(true);
    try {
      const response = await deleteQuotation(deleteQuotationId, deleteReason);
      if (response?.status === 200) {
        const updatedJobsData = jobsData.filter((item: any) => item.quotationId !== deleteQuotationId);
        setJobsData(updatedJobsData);
        successToast("Job deleted successfully");
        setDeleteModalOpen(false);
        setDeleteReason("");
        setDeleteQuotationId("");
      } else {
        errorToast("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      errorToast("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const handleContinue = async (quotation: any) => {
    const quotationId = getQuotationId(quotation);
    if (!quotationId) {
      errorToast("No quotation found. Please try again.");
      return;
    }

    setContinuingQuotationId(quotationId);
    try {
      let paymentLink = getQuotationPaymentLink(quotation);

      if (!paymentLink) {
        const full = await fetchQuotationById(quotationId);
        paymentLink = full ? getQuotationPaymentLink(full) : null;
      }

      savePendingQuotationId(quotationId);

      if (paymentLink) {
        setContinuePaymentQuotationId(quotationId);
        openPaymentModal(paymentLink, { quotationId });
        return;
      }

      successToast("Loading your quotation...");
      window.location.href = `/booking?quotationId=${encodeURIComponent(quotationId)}&step=9`;
    } catch (error: any) {
      console.error("Quotation continue error:", error);
      errorToast("Something went wrong");
    } finally {
      setContinuingQuotationId(null);
    }
  };

  const HandleCancelBooking = async (id: any) => {
    try {
      setIsCancelling(true);
      const body = {
        reason: "User cancelled the booking",
      };
      const response = await postApi(`customers/jobs/${id}/cancel`, body);
      if (response.status === 200) {
        successToast("Booking cancelled successfully");
        // Refresh the jobs list after cancellation
        setJobsData((prev: any) => prev.filter((job: any) => job._id !== id));
      } else {
        errorToast(response.data.message || "Failed to cancel booking");
      }
    } catch (error: any) {
      errorToast(error?.response?.data?.message || "Failed to cancel booking");
    } finally {
      setIsCancelling(false);
    }
  };

  const handleDownloadInvoice = async (jobId: string) => {
    try {
      setDownloadingInvoiceId(jobId);
      const token = await getCookie(tokenKey);
      const headers: Record<string, string> = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      // console.log("111111111", `${apiUrl}/customers/jobs/${jobId}/tax-invoice`);
      const response = await axios.get(`${apiUrl}/customers/jobs/${jobId}/tax-invoice`, {
        headers,
        responseType: 'text', // Get HTML as text
      });
      // console.log("222222222", response);
      if (response.status === 200 && response.data) {
        // Create a blob from the HTML
        const blob = new Blob([response.data], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);

        // Open in new window for printing/downloading
        const printWindow = window.open(url, '_blank');
        if (printWindow) {
          printWindow.onload = () => {
            printWindow.print();
            // Clean up the URL after a delay
            setTimeout(() => {
              window.URL.revokeObjectURL(url);
            }, 1000);
          };
        } else {
          // If popup blocked, create download link
          const link = document.createElement('a');
          link.href = url;
          link.download = `invoice-${jobId}.html`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => {
            window.URL.revokeObjectURL(url);
          }, 100);
        }
        successToast("Invoice opened for download/print");
      } else {
        errorToast("Failed to fetch invoice");
      }
    } catch (error: any) {
      console.error("Error downloading invoice:", error);
      errorToast(error?.response?.data?.message || "Failed to download invoice");
    } finally {
      setDownloadingInvoiceId(null);
    }
  };

  return (
    <div className=" moversBookingStatus">
      <Row className="g-4">
        {jobsData?.length
          ? jobsData.map((item: any) => {
            const { status, jobId, quotationId, scheduledAt, timeSlot } = item;
            return (
              <Col lg={4} md={6} sm={12} key={"item._id" + item._id}>
                <div className=" bookingStatusWrapper">
                  <div className=" px-3 mb-3">
                    <div className="d-flex my-3 flex-wrap statusJob justify-content-between w-100">
                      <div className=" statusAvailable" style={{ fontWeight: 800 }}>
                        {/* <span className={`${colorObject[status] || 'pending'}`}>
                          {status === "escalated"
                            ? "Escalated"
                            : status === "pending"
                              ? "Draft"
                              : status === "completed"
                                ? "Completed"
                                : status === "canceled"
                                  ? "Canceled"
                                  : status}
                        </span> */}
                        {item?.serviceType && <h6>{item?.serviceType}</h6>}
                        {item?.spaceInProperty && (
                          <h6 style={{ fontWeight: 800 }}>{item?.spaceInProperty}</h6>
                        )}
                      </div>
                      <h2>
                        {status === "pending" ? "Quote " : "Job"}
                        <span className="ms-2">#{status === "pending" ? quotationId : jobId}</span>
                      </h2>
                    </div>
                    {/* <div className="statusAvailable d-flex gap-3 align-items-center  mb-2">
                      {item?.serviceType && <h6>{item?.serviceType}</h6>}
                      {item?.spaceInProperty && (
                        <h6>{item?.spaceInProperty}</h6>
                      )}
                    </div> */}
                    <div className="addressTime">
                      <div className="d-flex flex-wrap  gap-3 align-items-center">
                        <h4 className={`d-flex flex-wrap gap-2 ${!scheduledAt ? 'chooseDate' : ""}`}>
                          <Image src="/clender.svg" alt="edit" />
                          {scheduledAt
                            ? moment(scheduledAt).format("DD-MM-YYYY (ddd)")
                            : "Choose a date"}
                        </h4>
                        <h6 className="d-flex flex-wrap gap-2">
                          ⏰ {moment(timeSlot?.startTime, "HH:mm").format("h A")} - {moment(timeSlot?.endTime, "HH:mm").format("h A")}
                        </h6>
                      </div>
                    </div>
                    <div className="addressTime">
                      <div className="d-flex flex-wrap gap-3 align-items-center">
                        <ul className="p-0 m-0">
                          <li className="listStyleType mb-2">
                            <h6 className="d-flex flex-wrap gap-2">
                              <Image src="/pickup.png" alt="Pickup" />
                              {removeCountryFromAddress(item?.pickup?.address)}
                            </h6>
                            {item?.stops?.length
                              ? item.stops.map((stopItem: any) => (
                                <ul
                                  key={stopItem?._id}
                                  className="sublistStatus my-2"
                                >
                                  <li>
                                    <p>
                                      {removeCountryFromAddress(stopItem?.address)}
                                    </p>
                                  </li>
                                </ul>
                              ))
                              : null}
                          </li>
                          <li className="listStyleType mb-2 ">
                            <h6 className="d-flex flex-wrap gap-2">
                              <Image src="/delivery.png" alt="Delivery" />
                              {removeCountryFromAddress(item?.dropoff?.address)}
                            </h6>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {item?.selectedTeamPricing && (
                      <div className="addressTime">
                        <div className="d-flex flex-wrap gap-3  statusJobalign-items-center">

                          <h4 className="d-flex flex-wrap gap-2">
                            {item?.selectedTeamPricing?.vehicleDisplayName} @ $
                            {item?.selectedTeamPricing?.moverPrice} {item?.selectedTeamPricing?.timeUnit === "per_half_hour" ? "Per 1⁄2Hr" : "Per Hour"}
                          </h4>
                        </div>
                      </div>
                    )}

                    {/* Payment and Refund Information */}
                    {item?.paymentRecords?.length > 0 && (
                      <div className="addressTime">
                        <div className="d-flex flex-wrap gap-3 align-items-center">
                          {
                            status !== "pending" && < h6 className="d-flex flex-wrap gap-2">
                              💳 Deposit: ${item?.totalPaid} {item?.paymentRecords[0]?.currency}
                            </h6>
                          }

                          {item?.refundDetails && (
                            <h6 className="d-flex flex-wrap gap-2 text-success">
                              💰 Refunded: ${item?.refundAmount || 0} {item?.paymentRecords[0]?.currency}
                            </h6>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Review Information for Completed Jobs */}
                    {item?.status === "completed" && (
                      <div className="addressTime">
                        <div className="d-flex flex-wrap gap-3 align-items-center">
                          {item?.reviewStatus ? (
                            <div className="d-flex align-items-center gap-2">
                              <span className="text-muted">Your Rating:</span>
                              <div className="star-rating">
                                {renderStarRating(item?.customerRating?.rating || 0)}
                              </div>
                              <span className="text-muted">({item?.customerRating?.rating || 0}/5)</span>
                            </div>
                          ) : (
                            <div className="d-flex align-items-center gap-2">
                              <span className="text-muted">Rate this job:</span>
                              <div className="star-rating">
                                {renderStarRating(item?.customerRating?.rating || 0)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className=" footerBottom border-top p-3 text-center">
                    <div className="d-flex gap-3 justify-content-end">
                      {showCancelButton.includes(item?.status) && (
                        <Button
                          type="submit"
                          className="signupButton cancelButtonColor "
                          onClick={() => {
                            if (item.status === "pending") {
                              handelDelete(item.quotationId);
                            } else {
                              // HandleCancelBooking(item._id);
                              const urlParams = new URLSearchParams({
                                jobId: item.jobId || '',
                                quotationId: item.quotationId || item._id || ''
                              }).toString();
                              window.location.href = `/cancel-booking?${urlParams}`;
                            }
                          }}
                          disabled={isCancelling}
                        >
                          {isCancelling ? "Cancelling..." : item.status === "pending" ? "Delete" : "Cancel"}
                        </Button>
                      )}

                      {item?.callOutFee && item.status !== "pending" ? (
                        // {true && item.status !== "pending" ? (
                        <Link
                          className={`reebook border-0 ${status === "completed" && "rebookColor"
                            }`}
                          href={{
                            pathname: "/re-book",
                            query: { id: item?._id },
                          }}
                        >
                          Re-Book
                        </Link>
                      ) : null}
                      {item.status === "pending" && (
                        <button
                          type="button"
                          className="completePayment"
                          disabled={continuingQuotationId === getQuotationId(item)}
                          onClick={() => handleContinue(item)}
                        >
                          {continuingQuotationId === getQuotationId(item)
                            ? "Loading..."
                            : "Continue"}
                        </button>
                      )}

                      {item?.status === "completed" && (
                        <>
                          <Button
                            type="submit"
                            className="signupButton invoice-button"
                            onClick={() => handleDownloadInvoice(item._id)}
                            disabled={downloadingInvoiceId === item._id}
                            isLoading={downloadingInvoiceId === item._id}
                          >
                            {downloadingInvoiceId === item._id ? "Downloading..." : "Download Invoice"}
                          </Button>
                          {!item?.customerRating && (
                            <Button
                              type="submit"
                              className={`signupButton ${status === "completed" && "review"
                                }`}
                              onClick={() => {
                                setDataForReview(item);
                              }}
                            >
                              Submit Review
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            );
          })
          : <EmptyState />}
      </Row>
      {/* Review Modal */}
      <CustomModal
        title=""
        close={() => setDataForReview(null)}
        handleClose={() => setDataForReview(null)}
        show={Boolean(dataForReview)}
        showFooter={false}
        mainClassName={"reviewModal"}
      >
        <div className="d-flex flex-column">
          <Rating
            review={dataForReview?.customerReview?.rating || dataForReview?.reviewCount || 0}
            comment={dataForReview?.customerReview?.comment || ""}
            moverName={reviewMoverName}
            readOnly={Boolean(
              dataForReview?.reviewStatus || dataForReview?.customerReview?.rating
            )}
            handelReview={(data: any) => {
              if (dataForReview?.status === "completed") {
                handleJobRating(data, dataForReview);
              } else {
                handelReview(data, dataForReview);
              }
            }}
            isLoading={isSubmittingReview || isLoading}
          />
        </div>
      </CustomModal>

      {/* Delete Reason Modal */}
      <CustomModal
        title="Delete Job"
        close={() => {
          setDeleteModalOpen(false);
          setDeleteReason("");
        }}
        handleClose={() => {
          setDeleteModalOpen(false);
          setDeleteReason("");
        }}
        show={deleteModalOpen}
        showFooter={true}
        cancelText="Cancel"
        showSaveButton="Delete"
        mainClassName={"deleteBookingModal"}
        handelConfirm={handleDeleteConfirm}
        isLoading={isLoading}
        buttonVariant="danger"
      >
        <div className="d-flex flex-column deleteBookingModal__inner">
          <p className="mb-3">
            Are you sure you want to delete this job? This action cannot be undone.
          </p>
          <label>Reason for deletion <span className="text-danger">*</span></label>
          <textarea
            name="deleteReason"
            placeholder="Please provide a reason for deleting this job..."
            onChange={(e: any) => setDeleteReason(e.target.value)}
            value={deleteReason}
            required
          />
        </div>
      </CustomModal>

      <PaymentEmbedBridge />
      <PaymentModal
        show={paymentModalOpen}
        paymentLink={pendingPaymentLink}
        onClose={() => {
          closePaymentModal();
          setContinuePaymentQuotationId(null);
        }}
        quotationId={continuePaymentQuotationId}
      />
    </div>
  );
};

export default JobBooking;
