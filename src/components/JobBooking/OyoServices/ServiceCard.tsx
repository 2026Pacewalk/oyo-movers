"use client";
import React from "react";
import { useJobBooking } from "../JobBookingHook";
import { Card } from "react-bootstrap";
import Image from "../../Image";
import "../jobBooking.scss";
import useCreateDraft from "@/utils/hooks/useCreateDraft";
import { deleteQuotation } from "@/lib/serverAction/bookingAction";

const ServiceCard = ({ service }: { service: any }) => {
  const {
    nextStep,
    setMoverService,
    jobBooking,
    setMoverData,
    setCallOutFee,
    moverServices,
    resetJobBooking,
    resetLabour,
    setActiveTab,
    setPickUpLocation,
    setDropOffLocation,
  } = useJobBooking();

  const { draftData, setDraftData } = useCreateDraft();

  const handleSelect = (id: string, name: string) => {
    const savedPickup = jobBooking?.pickUpLocation;
    const savedDropoff = jobBooking?.dropOffLocation;

    if (moverServices && (name !== moverServices)) {
      resetJobBooking();
      resetLabour();
      if (savedPickup?.address?.addressLine1) {
        setPickUpLocation(savedPickup);
      }
      if (savedDropoff?.address?.addressLine1) {
        setDropOffLocation(savedDropoff);
      }
    }
    setActiveTab("1");
    nextStep();
    setMoverData(name);
    setMoverService(id);

    if (moverServices && draftData && (!jobBooking?.isDraft || moverServices !== name)) {
      try {
        deleteQuotation(draftData?._id);
        setDraftData(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      className="inner"
      onClick={() => handleSelect(service._id, service.name)}
    >
      <Card
        className={` moverServiceSection ${moverServices === service.name ? "moverServiceSectionActive" : ""
          } `}
      >
        <Card.Body>
          <Image
            src={service.imgSrc || service.img}
            alt="Oyo Movers Logo"
            className="moverCardImage"
          />

          <div className="w-100">
            <Card.Title>{service.name}</Card.Title>
            <div className="moverServiceSection__inner">
              <Card.Text className="subtitle">{service.description}</Card.Text>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default React.memo(ServiceCard);
