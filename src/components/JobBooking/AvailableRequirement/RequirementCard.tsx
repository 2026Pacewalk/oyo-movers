"use client";

import { useJobBooking } from "../JobBookingHook";
import { Card, Col } from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";

import Image from "../../Image";
import { recomandedHouseMoving, recomandedOfficeMoving } from "@/helper";
import useCreateDraft from "@/utils/hooks/useCreateDraft";
import { useMediaQuery } from "@/utils/hooks/useMediaQuery";
import VehicleInfoPopup from "@/components/VehicleInfoPopup";
import "@/app/prices/prices.scss";
import {
  buildVehiclePopupFeatures,
  getVehiclePopupDetails,
  isMedTruckVehicle,
} from "@/utils/vehiclePopupDetails";
import {
  getSelectVehicleCardImageSrcDesktop,
  getSelectVehicleCardImageSrcMobile,
  getSelectVehicleCardImageSrcMobileSelected,
  getSelectVehiclePopupImageSrc,
  usesSelectVehicleDimensionlessImage,
} from "@/utils/vehicleS3Images";

const RequirementCard = ({ requirement }: { requirement: any }) => {
  const {
    setVehicleType,
    jobBooking: {
      vehicleType,
      spaceInProperty,
      howFurnished,
      pickUpDate,
      pickUpSlot,
    },
    moverServices,
  } = useJobBooking();
  const { updateDrafQuotationData } = useCreateDraft();
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const isMobile = useMediaQuery("(max-width: 480px)");
  const recomandedObj: any =
    moverServices === "Office Relocation"
      ? recomandedOfficeMoving
      : recomandedHouseMoving;

  if (
    requirement.vehicleDisplayName === "3 Men & 2 Trucks." &&
    recomandedObj?.[spaceInProperty]?.[howFurnished] !== "3 Men & 2 Trucks."
  ) {
    return false;
  }

  if (requirement?.availableOnlyForAdmin) {
    return null;
  }

  const isSelected = vehicleType === requirement._id;
  const isMostPopular =
    recomandedObj?.[spaceInProperty]?.[howFurnished] ===
    requirement.vehicleDisplayName;
  const moverServiceSectionActive = Boolean(moverServices);
  const isMediumTruck = isMedTruckVehicle(requirement);
  const mobileDimensionlessImageSrc = getSelectVehicleCardImageSrcMobile(requirement);
  const selectedMobileImageSrc =
    getSelectVehicleCardImageSrcMobileSelected(requirement);
  const showMedMobileGroundLine =
    isMediumTruck &&
    usesSelectVehicleDimensionlessImage(requirement) &&
    (!isSelected || !requirement.imgSrc);

  const handleSelect = async (id: string, price: any) => {
    setVehicleType(id);
    updateDrafQuotationData(
      {
        vehicleRequirement: id,
        spaceInProperty,
        howFurnished,
        callOutFee: price,
        pickUpDate,
        pickUpSlot,
      },
      "vehicleRequirement"
    );
  };

  const handleInfoClick = (vehicle: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const detailsPopup = getVehiclePopupDetails(vehicle);
    const vehicleData = {
      ...vehicle,
      imgSrc: getSelectVehiclePopupImageSrc(vehicle),
      features: buildVehiclePopupFeatures(detailsPopup),
      capacity: detailsPopup.capacity,
      space: detailsPopup.space,
    };
    setSelectedVehicle(vehicleData);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedVehicle(null);
  };

  const cardContent = (
    <div className="cardContentLeft">
      <div className="cardRow1">
        <div className="cardTitleRow">
          <h3 className="cardTitle">{requirement.vehicleName}</h3>
          {moverServiceSectionActive && (
            <span className="menBadge">{requirement.moverRequired}</span>
          )}
          {isSelected && (
            <button
              type="button"
              className="infoIconBtn"
              onClick={(e) => handleInfoClick(requirement, e)}
              aria-label="Vehicle info"
            >
              <BsInfoCircle size={16} strokeWidth={1} aria-hidden />
            </button>
          )}
        </div>
        <div className="cardPriceMain">
          <span className="priceNow">${requirement.moverPrice}</span>
          <span className="priceDuration">/ 30 mins</span>
        </div>
      </div>
      <div className="cardRow2">
        <p className="cardDesc">{requirement.description}</p>
        {requirement.wasPrice ? (
          <span className="priceWas">${requirement.wasPrice}</span>
        ) : null}
      </div>
    </div>
  );

  // Desktop: original card UI (jobBooking.scss)
  if (!isMobile) {
    return (
      <Col
        xxl={10}
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className="vehicalContainer moverServiceSectionActive"
        onClick={() => handleSelect(requirement._id, requirement.moverPrice)}
      >
        <Card
          className={isSelected ? "vehicalContainer__active" : ""}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isMediumTruck && (
            <div className="mostPopularRibbonDesktop">Most Popular</div>
          )}
          <div
            className={`vehicalImage${isMediumTruck ? " vehicalImage--med" : ""}`}
          >
            <div className="vehicalImage__img">
              <Card.Img
                variant="top"
                src={getSelectVehicleCardImageSrcDesktop(requirement)}
                alt={requirement.vehicleDisplayName}
                className="selectVehicleVehicleImg"
              />
            </div>
            {isMostPopular && (
              <div className="recomendedImg">
                <Image src="/recomend.png" alt="recomend" />
              </div>
            )}
          </div>
          <Card.Body className="vehicalCardBody" style={{ padding: "8px !important" }}>
            <h2>
              {requirement.vehicleName}{" "}
              {moverServiceSectionActive && (
                <span className="card-man rounded-lg text-capitalize">
                  {requirement.moverRequired}
                </span>
              )}
            </h2>
            <Card.Text>{requirement.description}</Card.Text>
            <div className="price-display-wrapper">
              <div className="price-info">
                <div className="was-price-wrapper">
                  <span className="was-label">Was</span>
                  <span className="was-price">${requirement.wasPrice}</span>
                </div>
                <div className="now-price-wrapper">
                  <span className="now-label">NOW</span>
                  <span className="now-price">${requirement.moverPrice}</span>
                  <span className="price-duration">/ 30 mins</span>
                </div>
              </div>
              <BsInfoCircle
                className="info-icon"
                onClick={(e) => handleInfoClick(requirement, e)}
              />
            </div>
          </Card.Body>
        </Card>
        <VehicleInfoPopup
          isOpen={popupOpen}
          onClose={handleClosePopup}
          vehicle={selectedVehicle}
        />
      </Col>
    );
  }

  // Mobile: new expanded card UI (SelectVehicle.scss)
  return (
    <Col
      xxl={10}
      xl={12}
      lg={12}
      md={12}
      sm={12}
      xs={12}
      className="selectVehicleCardCol"
    >
      <div
        role="button"
        tabIndex={0}
        className={`selectVehicleCard${isMediumTruck ? " selectVehicleCard--med" : ""}${isSelected ? " selectVehicleCard--selected" : ""}`}
        onClick={() => handleSelect(requirement._id, requirement.moverPrice)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleSelect(requirement._id, requirement.moverPrice);
          }
        }}
      >
        {isMediumTruck && (
          <div className="mostPopularRibbon">Most Popular</div>
        )}

        {!isSelected && (
          <div
            className={`selectVehicleCard__compact${showMedMobileGroundLine ? " selectVehicleCard__compact--med" : ""}`}
          >
            <div className="cardImageWrap">
              <img
                src={mobileDimensionlessImageSrc}
                alt={requirement.vehicleDisplayName}
                className="selectVehicleVehicleImg"
              />
            </div>
            <div className="cardContent">{cardContent}</div>
          </div>
        )}

        {isSelected && (
          <div
            className={`selectVehicleCard__expanded${showMedMobileGroundLine ? " selectVehicleCard__expanded--med" : ""}`}
          >
            <div className="cardImageWrap">
              <img
                src={selectedMobileImageSrc}
                alt={requirement.vehicleDisplayName}
                className="selectVehicleVehicleImg"
              />
            </div>
            <div className="cardContent">{cardContent}</div>
          </div>
        )}
      </div>

      <VehicleInfoPopup
        isOpen={popupOpen}
        onClose={handleClosePopup}
        vehicle={selectedVehicle}
      />
    </Col>
  );
};

export default RequirementCard;
