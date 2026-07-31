"use client";

import { FC, useEffect, useMemo, useState } from "react";
import Input from "../Input";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";
import { useJobBooking } from "./JobBookingHook";
import CustomModal from "../CustomModal";
import StepHandler from "./StepHandler";
import useCreateDraft from "@/utils/hooks/useCreateDraft";
import { getApi } from "@/lib/api";
import ContinueButton from "./ContinueButton";

const TypeOfSpace: FC<any> = () => {
  const {
    services,
    jobBooking: { moverService, spaceInProperty, pickUpDate, pickUpSlot },
    nextStep,
    setStep,
    labour: { howWeHelp },
    setSpaceInProperty,
    setHowWeHelp,
  } = useJobBooking();
  const [service, setService] = useState<any>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [otherText, setOtherText] = useState<string>("");
  const [showSubtitle, setShowSubtitle] = useState<{ [key: string]: boolean }>({});

  // 68a59e5e7f773dff80e1c2d9
  const moverServices = services;
  const { updateDrafQuotationData } = useCreateDraft();

  const isLabourOnly = service?.name === "Labour Only";
  const isHouseMoving = service?.name === "House or Apartment";


  useEffect(() => {
    if (!moverServices?.length && moverService) {
      getServices();
    } else {
      const serviceData = Array.isArray(moverServices) && moverServices?.find(
        (i: any) => i._id === moverService
      );
      setService(serviceData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moverServices?.length, moverService]);

  const getServices = async () => {
    const servicesData = await getApi("/config/service-types/active");

    const data = servicesData?.find((i: any) => i._id === moverService);
    setService(data);
  };

  const handleSelect = (id: string) => {
    if (service.name === "Office Relocation") {
      setStep(5);
    } else {
      nextStep();
    }
    if (isLabourOnly) {
      setHowWeHelp(id);
    } else {
      setSpaceInProperty(id);
    }
    updateDrafQuotationData(id, "spaceInProperty");
  };

  const handleContinue = () => {
    if (service.name === "Office Relocation") {
      setStep(5);
    } else {
      nextStep();
    }
  };

  const tooltip = (title: any) =>
    title ? (
      <Tooltip id="tooltip">
        <strong>{title}</strong>
      </Tooltip>
    ) : (
      <></>
    );
  const serviceList = useMemo(() => {
    return service?.moreInquiry?.title ? (
      <div>
        <h1 className="mb-4">{service.moreInquiry.title} </h1>
        <p>{service.moreInquiry.description}</p>
        <div className="mt-4 roomContainer spacesection typeOfSpace">
          {service?.moreInquiry?.inputs &&
            Object?.values(service?.moreInquiry?.inputs)?.map(
              ({ input }: any) => {
                const inputKey = input?.title;
                const isSubtitleVisible = showSubtitle[inputKey];
                
                return (
                  <div
                    key={input?.title}
                    className="typeOfSpace__inner space-container"
                  >
                    {input.type === "radio" ? (
                      // Tooltip removed – subtitle shown below title
                      // <OverlayTrigger placement="top" overlay={tooltip(input?.subtitle)}>
                      <Button
                        onClick={() => {
                          input?.title === "Other"
                            ? setModalOpen(true)
                            : handleSelect(input.title);
                          setOtherText("");
                        }}
                        className={`buttonClass ${!isHouseMoving && "typeOfSpaceLabour"
                          } w-100 mt-2 mb-3 text-center justify-content-center ${input?.title === (spaceInProperty || howWeHelp) || (otherText && input?.title === "Other")
                            ? "innerActive"
                            : ""
                          }`}
                      >
                        <span className="typeOfSpaceOptionContent">
                          <span className="typeOfSpaceOptionTitle">
                            {input.title}
                            {/* {input?.subtitle && (
                              <BsInfoCircle 
                                className="typeOfSpaceInfoIcon"
                                onClick={(e: any) => {
                                  e.stopPropagation();
                                  setShowSubtitle((prev) => ({
                                    ...prev,
                                    [inputKey]: !prev[inputKey]
                                  }));
                                }}
                                style={{ 
                                  color: '#666', 
                                  fontSize: '16px',
                                  width: '16px',
                                  height: '14px',
                                  marginLeft: '8px',
                                  cursor: 'pointer',
                                  verticalAlign: 'middle'
                                }}
                              />
                            )} */}
                          </span>
                          {input?.subtitle && isSubtitleVisible && (
                            <span className="typeOfSpaceOptionSubtitle">{input.subtitle}</span>
                          )}
                          {!isHouseMoving && input?.info && <span>{input.info}</span>}
                        </span>
                      </Button>
                      // </OverlayTrigger>
                    ) : (
                      <>
                        <label>{input.title}</label>
                        <Input
                          type={input.type}
                          placeholder={input.placeholder}
                        />
                      </>
                    )}
                  </div>
                );
              }
            )}
        </div>
      </div>
    ) : (
      <>Server Error</>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service, moverService, spaceInProperty, showSubtitle]);

  return (
    <StepHandler step={2}>
      <div>
        {serviceList}

        <ContinueButton
          validationKey={isLabourOnly ? "howWeHelp" : "spaceInProperty"}
          validationMessage={isLabourOnly ? "Please select how we can help" : "Please select a space type"}
          onClick={handleContinue}
        />

        <CustomModal
          title={"Enter Other Type of Help"}
          close={() => setModalOpen(false)}
          show={modalOpen}
          showFooter={false}
          cancelText="Cancel"
          showSaveButton="Confirm"
          mainClassName="otherHelpModal"
          size="lg"
        >
          <Input
            label="Enter Other"
            placeholder="Please explain in notes what kind of help you need so helpers will be prepared."
            onChange={(e: any) => setOtherText(e.target.value)}
            value={otherText}
            className="mt-2"
          />
          <div className="mt-4 mb-2">
            <Button
              className="buttonClass otherButton continueStepButton"
              onClick={() => {
                setModalOpen(false);
                handleSelect(otherText);
              }}
              disabled={!otherText}
            >
              Continue
            </Button>
          </div>
        </CustomModal>
      </div>
    </StepHandler>
  );
};

export default TypeOfSpace;
