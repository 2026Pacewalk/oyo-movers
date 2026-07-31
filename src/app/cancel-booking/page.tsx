"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import CustomModal from "@/components/CustomModal";
import { cancelJob, getCancellationPolicy } from "@/lib/serverAction/bookingAction";
import { errorToast, successToast } from "@/lib/toaster";
import "./cancelBooking.scss";
import { PiWarningCircle } from "react-icons/pi";
import { TbCheck, TbPhone } from "react-icons/tb";
import { FiCheckCircle } from "react-icons/fi";
const CancelBooking = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const jobId = searchParams.get("jobId");
    const quotationId = searchParams.get("quotationId");
    const hasShownModalRef = useRef(false);

    const [selectedReason, setSelectedReason] = useState<string>("");
    const [otherReason, setOtherReason] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [policyData, setPolicyData] = useState<any>(null);
    const [cancelMessage, setCancelMessage] = useState<string>("");
    const [cancellationComplete, setCancellationComplete] = useState<boolean>(false);

    // Modal states
    const [showNeedHelpModal, setShowNeedHelpModal] = useState<boolean>(false);
    const [showNoCancellationFeeModal, setShowNoCancellationFeeModal] = useState<boolean>(false);
    const [showConfirmCancellationModal, setShowConfirmCancellationModal] = useState<boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

    const cancellationReasons = [
        { id: "1", label: "Request Wrong Vehicle" },
        { id: "2", label: "Select wrong address" },
        { id: "3", label: "Moving Date is changed" },
        { id: "4", label: "Other" },
    ];

    useEffect(() => {
        if (!quotationId && !cancellationComplete) {
            errorToast("No quotation ID provided");
            router.push("/booking-list");
        }
    }, [quotationId, router, cancellationComplete]);

    // Restore modal state from localStorage on mount
    useEffect(() => {
        if (quotationId) {
            const storageKey = `cancellationModal_${quotationId}`;
            const storedModalState = localStorage.getItem(storageKey);
            
            if (storedModalState) {
                try {
                    const modalData = JSON.parse(storedModalState);
                    if (modalData.modalType === "noFee") {
                        setShowNoCancellationFeeModal(true);
                        setCancelMessage(modalData.message || "");
                        setCancellationComplete(true);
                    } else if (modalData.modalType === "success") {
                        setShowSuccessModal(true);
                        setCancelMessage(modalData.message || "");
                        setCancellationComplete(true);
                    }
                } catch (error) {
                    console.error("Error parsing stored modal state:", error);
                    localStorage.removeItem(storageKey);
                }
            }
        }
    }, [quotationId]);

    const handleReasonSelect = (reasonId: string) => {
        setSelectedReason(reasonId);
        if (reasonId !== "4") {
            setOtherReason("");
            // Show "Need Help?" popup for first 3 options
            setShowNeedHelpModal(true);
        }
    };

    const handleOtherReasonCancel = () => {
        if (!otherReason.trim()) {
            errorToast("Please enter a reason for cancellation");
            return;
        }
        handleCancelBooking();
    };

    const handleCancelBooking = async () => {
        if (!quotationId) {
            errorToast("Quotation ID not found");
            return;
        }

        setIsLoading(true);

        try {
            // First, check the cancellation policy
            const policyResponse = await getCancellationPolicy(quotationId);
            console.log("Policy response:", policyResponse);
            if (policyResponse.status === 200 && policyResponse.data) {
                setPolicyData(policyResponse.data);
                const policyApplied = policyResponse.data?.feeCalculation?.policyApplied;

                if (policyApplied === "no_fee") {
                    // Pass the policy data directly to avoid state update delay
                    await proceedWithCancellation(policyResponse.data);
                } else {
                    // Close need help modal and show confirmation modal with charges
                    setShowNeedHelpModal(false);
                    setShowConfirmCancellationModal(true);
                    setIsLoading(false);
                }
            } else {
                errorToast(policyResponse.message || "Failed to get cancellation policy");
                setIsLoading(false);
            }
        } catch (error: any) {
            errorToast(error?.message || "Something went wrong");
            setIsLoading(false);
        }
    };

    const proceedWithCancellation = async (passedPolicyData?: any) => {
        if (!quotationId) {
            errorToast("Quotation ID not found");
            return;
        }

        setIsLoading(true);

        try {
            const reason = selectedReason === "4"
                ? otherReason
                : cancellationReasons.find(r => r.id === selectedReason)?.label || "";

            const response = await cancelJob(quotationId, reason);
            const currentPolicyData = passedPolicyData || policyData;

            if (response.status === 200) {
                console.log("Cancellation successful, showing modal...");
                const message = response.message || response.data?.data?.message || "Job cancelled successfully";
                setCancelMessage(message);
                setCancellationComplete(true);
                hasShownModalRef.current = true;

                // Close all modals first
                setShowNeedHelpModal(false);
                setShowConfirmCancellationModal(false);
                setIsLoading(false);

                // Show success modal immediately based on policy
                const isNoFee = currentPolicyData?.feeCalculation?.policyApplied === "no_fee";
                console.log("Policy applied:", currentPolicyData?.feeCalculation?.policyApplied);
                console.log("Is no fee:", isNoFee);
                
                // Save modal state to localStorage
                const storageKey = `cancellationModal_${quotationId}`;
                if (isNoFee) {
                    localStorage.setItem(storageKey, JSON.stringify({
                        modalType: "noFee",
                        message: message,
                        quotationId: quotationId
                    }));
                } else {
                    localStorage.setItem(storageKey, JSON.stringify({
                        modalType: "success",
                        message: message,
                        quotationId: quotationId
                    }));
                }

                // Use setTimeout to ensure state updates are batched
                setTimeout(() => {
                    if (isNoFee) {
                        console.log("Setting showNoCancellationFeeModal to true");
                        setShowNoCancellationFeeModal(true);
                    } else {
                        console.log("Setting showSuccessModal to true");
                        setShowSuccessModal(true);
                    }
                }, 100);

            } else {
                errorToast(response.message || "Failed to cancel booking");
                setIsLoading(false);
            }
        } catch (error: any) {
            errorToast(error?.message || "Something went wrong");
            setIsLoading(false);
        }
    };

    const handleFinalConfirm = () => {
        proceedWithCancellation();
    };


    const handleBookNewJob = () => {
        console.log("Book new job clicked");
        setShowNoCancellationFeeModal(false);
        setShowSuccessModal(false);
        
        // Clear localStorage for this quotationId
        if (quotationId) {
            const storageKey = `cancellationModal_${quotationId}`;
            localStorage.removeItem(storageKey);
        }
        
        router.push("/booking");
    };

    const handleKeepBooking = () => {
        setShowConfirmCancellationModal(false);
        router.push("/booking-list");
    };

    return (
        <div className="cancelBookingPage">
            <div className="cancelBookingContainer">
                <div className="cancelBookingCard">
                    <div className="cardHeader">
                        <h2>Cancel Booking</h2>
                        <p>Please select a reason for cancellation</p>
                    </div>

                    <div className="cardBody">
                        <div className="reasonsSection">
                            <div className="reasonsList">
                                {cancellationReasons.map((reason) => (
                                    <div key={reason.id} className="reasonOption">
                                        <Input
                                            type="radio"
                                            id={`reason-${reason.id}`}
                                            name="cancellationReason"
                                            checked={selectedReason === reason.id}
                                            onChange={() => handleReasonSelect(reason.id)}
                                        />
                                        <label htmlFor={`reason-${reason.id}`}>{reason.label}</label>
                                    </div>
                                ))}
                            </div>

                            {selectedReason === "4" && (
                                <>
                                    <div className="otherReasonInput">
                                        <textarea
                                            placeholder="Please enter your reason for cancellation..."
                                            value={otherReason}
                                            onChange={(e: any) => setOtherReason(e.target.value)}
                                            className="otherReasonTextarea"
                                            rows={4}
                                            maxLength={500}
                                        />
                                        <div className="characterCount">
                                            {otherReason.length}/500
                                        </div>
                                    </div>
                                    <Button
                                        className="confirmCancelButton"
                                        onClick={handleOtherReasonCancel}
                                        disabled={!otherReason.trim()}
                                        isLoading={isLoading}
                                    >
                                        Confirm to Cancel
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Need Help Modal - Shows for first 3 options */}
            <CustomModal
                title=""
                show={showNeedHelpModal}
                close={() => {
                    setShowNeedHelpModal(false);
                    setSelectedReason("");
                }}
                showFooter={false}
                mainClassName="needHelpModal"
            >
                <div className="needHelpModalContent">
                    <div className="iconWrapper">
                        <i><TbPhone /></i>
                    </div>
                    <h2>Need Help?</h2>
                    <p>We are happy to assist</p>

                    <div className="phoneSection">
                        <p className="callText">Please Call Support on:</p>
                        <a href="tel:1300 01 31 31" className="phoneNumber">
                            1300 01 31 31
                        </a>
                    </div>

                    <div className="divider">OR</div>

                    <Button
                        className="confirmCancelButton"
                        onClick={handleCancelBooking}
                        isLoading={isLoading}
                    >
                        Confirm to Cancel
                    </Button>
                </div>
            </CustomModal>

            {/* No Cancellation Fee Modal */}
            <CustomModal
                title=""
                show={showNoCancellationFeeModal}
                close={() => {
                    console.log("No cancellation fee modal close called");
                    // Don't close - user must use button
                }}
                showFooter={false}
                mainClassName="successCancellationModal"
                backdrop="static"
                keyboard={false}
                closeButton={false}
            >
                <div className="successModalContent">
                    <div className="successIcon">
                        <i><FiCheckCircle /></i>
                    </div>
                    <h2>{cancelMessage || "Your Booking is Cancelled"}</h2>
                    <div className="noCancellationFeeBox">
                        <h4>No Cancellation Fees Apply</h4>
                        <p>You will get full refund soon</p>
                    </div>
                    <div className="modalButtons">
                        {/* <Button className="reBookButton" onClick={handleReBook}>
                            Re-Book
                        </Button> */}
                        <Button className="bookNewButton" onClick={handleBookNewJob}>
                            Book New Job
                        </Button>
                    </div>
                </div>
            </CustomModal>

            {/* Confirm Cancellation with Charges Modal */}
            <CustomModal
                title=""
                show={showConfirmCancellationModal}
                close={() => setShowConfirmCancellationModal(false)}
                showFooter={false}
                mainClassName="confirmCancellationChargesModal"
            >
                <div className="chargesModalContent">
                    <div className="warningIcon">
                        <i><PiWarningCircle /></i>
                    </div>
                    <h2>Confirm Cancellation</h2>
                    <div className="cancellationChargesBox">
                        <h4>Cancellation charges</h4>
                        <p>
                            Cancel less than 24 hours before scheduled move time will incur a <strong>1-hour</strong> of quoted fee.
                        </p>
                    </div>
                    <div className="modalButtons">
                        <Button className="keepBookingButton" onClick={handleKeepBooking} disabled={isLoading}>
                            No, Keep Current Booking
                        </Button>
                        <Button className="proceedButton" onClick={handleFinalConfirm} isLoading={isLoading}>
                            Yes, Proceed
                        </Button>
                    </div>
                </div>
            </CustomModal>

            {/* Final Success Modal */}
            <CustomModal
                title=""
                show={showSuccessModal}
                // show={true}
                close={() => {}}
                showFooter={false}
                mainClassName="successCancellationModal"
                backdrop="static"
                keyboard={false}
                closeButton={false}
            >
                <div className="successModalContent">
                    <div className="successIcon">
                        <i><FiCheckCircle /></i>
                    </div>
                    <h2>{cancelMessage || "Your Booking is Cancelled"}</h2>
                    <div className="modalButtons d-flex gap-3" style={{ flexDirection: "row" }}>
                        <Button className="bookNewButton" onClick={handleBookNewJob}>
                            Book New Job
                        </Button>
                        {/* <Button className="bookNewButton" onClick={handleBookNewJob}>
                            Book New Job
                        </Button> */}
                    </div>
                </div>
            </CustomModal>
        </div>
    );
};

export default CancelBooking;

