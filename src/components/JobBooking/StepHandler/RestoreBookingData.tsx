"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useJobBooking } from "../JobBookingHook";
import { getQuotationId, savePendingQuotationId } from "@/utils/secureQuotation";
import {
    consumeQuoteFlowStorage,
    getQuoteFlowPayload,
    isQuoteFlowPending,
} from "@/utils/quoteAddressStorage";

interface RestoreBookingDataProps {
    jobData?: any;
}

const RestoreBookingData = ({ jobData }: RestoreBookingDataProps) => {
    const searchParams = useSearchParams();
    const fromQuote = searchParams.get("fromQuote") === "1";

    const {
        setJobBooking,
        setServices,
        setAvailableRequirements,
        setStep,
        setMoverData,
        setMoverService,
        setPickUpDate,
        setPickUpSlot,
        setPickupStartTime,
        setPickupEndTime,
        setSpaceInProperty,
        setHowFurnished,
        setVehicleType,
        setDistance,
        setDuration,
        setCallOutFee,
        setItemImages,
        setListOfItems,
        setDismantlingAndAssembly,
        setPackingAndUnpacking,
        setPickUpLocation,
        setDropOffLocation,
        setStopOvers,
        setNoteForMover,
        setQuotation,
        activeStep
    } = useJobBooking();

    useEffect(() => {
        // If we have job data from quotationId, populate the store
        if (jobData?.rawData) {
            const rawData = jobData.rawData;

            // Set all the booking data from rawData
            setJobBooking(rawData);

            // Set individual fields to ensure they're properly updated
            if (rawData.moverService) setMoverService(rawData.moverService);
            if (jobData.serviceType) setMoverData(jobData.serviceType);
            if (rawData.pickUpDate) setPickUpDate(rawData.pickUpDate);
            if (rawData.pickUpSlot) setPickUpSlot(rawData.pickUpSlot);
            if (rawData.pickupStartTime) setPickupStartTime(rawData.pickupStartTime);
            if (rawData.pickupEndTime) setPickupEndTime(rawData.pickupEndTime);
            if (rawData.spaceInProperty) setSpaceInProperty(rawData.spaceInProperty);
            if (rawData.howFurnished) setHowFurnished(rawData.howFurnished);
            if (rawData.vehicleType) setVehicleType(rawData.vehicleType);
            if (rawData.distance) setDistance(rawData.distance);
            if (rawData.duration) setDuration(rawData.duration);
            if (rawData.callOutFee) setCallOutFee(rawData.callOutFee);
            if (rawData.itemImages) setItemImages(rawData.itemImages);
            if (rawData.listOfItems) setListOfItems(rawData.listOfItems);
            if (rawData.dismantlingAndAssembly !== undefined) setDismantlingAndAssembly(rawData.dismantlingAndAssembly);
            if (rawData.packingAndUnpacking !== undefined) setPackingAndUnpacking(rawData.packingAndUnpacking);
            if (rawData.pickUpLocation) setPickUpLocation(rawData.pickUpLocation);
            if (rawData.dropOffLocation) setDropOffLocation(rawData.dropOffLocation);
            if (rawData.stopOvers) setStopOvers(rawData.stopOvers);
            if (rawData.noteForMover) setNoteForMover(rawData.noteForMover);

            // Set the step to a high number to show all completed steps
            setStep(0);

            const continueQuotationId =
                getQuotationId(jobData) ||
                jobData?.quotationId ||
                jobData?.quotationNumber;
            if (continueQuotationId) {
                savePendingQuotationId(continueQuotationId);
                setQuotation({
                    ...jobData,
                    _id: continueQuotationId,
                    quotationId: continueQuotationId,
                });
            }
        }

        // Quote flow: restore only after explicit handoff from /prices (full page load)
        const storedBookingData = fromQuote ? getQuoteFlowPayload() : null;
        const storedStep = sessionStorage.getItem("currentStep");
        const storedServices = sessionStorage.getItem("services");
        const storedAvailableRequirements = sessionStorage.getItem("availableRequirements");
        const shouldRestoreQuote =
            fromQuote && isQuoteFlowPending() && storedBookingData && !jobData;

        if (shouldRestoreQuote) {
            try {
                const bookingData = JSON.parse(storedBookingData);
                setJobBooking(bookingData);

                if (bookingData.pickUpLocation) {
                    setPickUpLocation(bookingData.pickUpLocation);
                }
                if (bookingData.dropOffLocation) {
                    setDropOffLocation(bookingData.dropOffLocation);
                }
                if (bookingData.vehicleType) {
                    setVehicleType(bookingData.vehicleType);
                }

                const step = storedStep ? parseInt(storedStep, 10) : 0;
                if (!isNaN(step) && step >= 0) {
                    setStep(step);
                }

                if (storedServices) {
                    setServices(JSON.parse(storedServices));
                }

                if (storedAvailableRequirements) {
                    setAvailableRequirements(JSON.parse(storedAvailableRequirements));
                }

                consumeQuoteFlowStorage();
            } catch (error) {
                console.error("Error restoring quote flow booking data:", error);
                consumeQuoteFlowStorage();
            }
        }
    }, [
        fromQuote,
        jobData,
        setJobBooking,
        setServices,
        setAvailableRequirements,
        setStep,
        setMoverData,
        setMoverService,
        setPickUpDate,
        setPickUpSlot,
        setPickupStartTime,
        setPickupEndTime,
        setSpaceInProperty,
        setHowFurnished,
        setVehicleType,
        setDistance,
        setDuration,
        setCallOutFee,
        setItemImages,
        setListOfItems,
        setDismantlingAndAssembly,
        setPackingAndUnpacking,
        setPickUpLocation,
        setDropOffLocation,
        setStopOvers,
        setNoteForMover,
        setQuotation,
    ]);

    return null;
};

export default React.memo(RestoreBookingData);
