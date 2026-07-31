"use client";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Select from "../Select";
import "../JobBooking/jobdetails.scss";
import "./rebook.scss";
import Payment from "../Payment";
import { useJobBooking } from "../JobBooking/JobBookingHook";
import moment from "moment";
import CustomDatePicker from "../CustomDatePicker";

const ReBook = ({ reBookJob, timeslots, paymentCards, token }: any) => {
  const [timeSlot, setTimeSlot] = useState<any>([]);
  const [selectedDate, setSelectedDate] = useState<any>("");
  const { setPrice, resetJobBooking, setReBooking } = useJobBooking();
  const [jobInfo, setJobInfo] = useState<any>({
    moverService: reBookJob?.moverService,
    pickUpLocation: reBookJob?.pickUpLocation,
    dropOffLocation: reBookJob?.dropOffLocation,
    stopOvers: reBookJob?.stopOvers,
    spaceInProperty: reBookJob.spaceInProperty,
    howFurnished: reBookJob.howFurnished,
    pickUpDate: "",
    pickUpSlot: "",
    listOfItems: reBookJob.listOfItems,
    dismantlingAndAssembly: reBookJob.dismantlingAndAssembly,
    packingAndUnpacking: reBookJob.packingAndUnpacking,
    vehicleType: reBookJob.vehicleType,
    distance: reBookJob.distance,
    duration: reBookJob.duration,
    callOutFee: reBookJob.callOutFee,
    howWeHelp: reBookJob.howWeHelp,
    howManyHelper: reBookJob.howManyHelper,
    helperTime: reBookJob.helperTime,
    noteForMover: reBookJob?.noteForMover,
  });
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  const handleDateSelect = (date: any) => {
    setJobInfo({ ...jobInfo, pickUpDate: date });
    setSelectedDate(date);
  };

  useEffect(() => {
    if (jobInfo.pickUpDate && jobInfo.pickUpSlot) {
      setReBooking(jobInfo);
      setPrice(reBookJob?.price);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobInfo.pickUpDate, jobInfo.pickUpSlot]);

  useEffect(() => {
    return () => {
      resetJobBooking();
      setPrice(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timeslots?.length) {
      const timeSlotsOptions = timeslots?.map((item: any) => {
        return {
          label: item.name,
          value: item._id,
        };
      });
      setTimeSlot(timeSlotsOptions);
    }
  }, [timeslots]);

  const decsriptionClass =
    "d-flex gap-3 align-items-center justify-content-between mb-2";

  return (
    <div className="d-flex flex-column reBookWrapper">
      <h3 className="mb-3 text-center">
        {!timeslots?.length ? "Complete Payment" : "Re-Booking"}
      </h3>

      <Row className="reBookWrapper__inner">
        <Col md={12} sm={12} className="reBookWrapper__inner__content">
          {!timeslots.length ? (
            <div className={decsriptionClass}>
              <h5>PickUp Date :</h5>{" "}
              <p>{moment(reBookJob?.pickUpDate).format("DD-MM-YYYY")}</p>
            </div>
          ) : (
            <div className="d-flex gap-3 align-items-center justify-content-between mb-2">
              <div className="mb-2 w-50 datePickerField">
                <CustomDatePicker
                  value={selectedDate}
                  onChange={(date: Date) => handleDateSelect(date)}
                  minDate={new Date()}
                  label={"Date"}
                />
              </div>
              <div className="mb-2 w-50">
                <label>Time Slot</label>
                <Select
                  placeholder="Select Time Slot"
                  label=""
                  id="slot"
                  name="slot"
                  value={selectedSlot}
                  option={timeSlot}
                  onChange={(e: any) => {
                    setSelectedSlot(e.target.value);
                    setJobInfo({ ...jobInfo, pickUpSlot: e.target.value });
                  }}
                />
              </div>
            </div>
          )}
          <div className={decsriptionClass}>
            <h5>Service :</h5> <p>{reBookJob?.moverService?.name}</p>
          </div>
          <div className={decsriptionClass}>
            <h5>Pick-up Address :</h5>{" "}
            <p>{reBookJob?.pickUpLocation?.address?.addressLine1}</p>
          </div>{" "}
          {reBookJob?.dropOffLocation?.address && (
            <div className={decsriptionClass}>
              <h5>Drop-off Address :</h5>{" "}
              <p>{reBookJob?.dropOffLocation?.address?.addressLine1}</p>
            </div>
          )}
          <div className={decsriptionClass}>
            <h5>Description :</h5>
            <p>{reBookJob?.moverService?.description}</p>
          </div>
          {reBookJob?.spaceInProperty && (
            <div className={decsriptionClass}>
              <h5>Space in property</h5>
              <p>{reBookJob?.spaceInProperty}</p>
            </div>
          )}
          {reBookJob?.howWeHelp && (
            <div className={decsriptionClass}>
              <h5>How we help</h5>
              <p>{reBookJob?.howWeHelp}</p>
            </div>
          )}
          {reBookJob?.helperTime && (
            <div className={decsriptionClass}>
              <h5>Helper time</h5>
              <p>{reBookJob?.helperTime}hr</p>
            </div>
          )}
          {reBookJob?.howManyHelper && (
            <div className={decsriptionClass}>
              <h5>How many helper</h5>
              <p>{reBookJob?.howManyHelper}</p>
            </div>
          )}
          {reBookJob?.spaceInProperty && (
            <div className={decsriptionClass}>
              <h5>Distance</h5>
              <p>{reBookJob?.distance} km</p>
            </div>
          )}
          <div className={decsriptionClass}>
            <h5>Booking Amount</h5>
            <p>${reBookJob?.callOutFee || 0}</p>
          </div>
          <Col md="12">
            <ul className="ps-3">
              {reBookJob?.dismantlingAndAssembly && (
                <li>Dismantling and Re-assembling</li>
              )}
              {reBookJob?.packingAndUnpacking && <li>Packing Required</li>}
              {reBookJob?.milestoneTimeStamp && <li>Milestone Time-Stamp</li>}
              {reBookJob?.accountJob && <li>Account Job</li>}
            </ul>
          </Col>
        </Col>
        {((jobInfo.pickUpSlot && jobInfo.pickUpDate) || !timeslots?.length) && (
          <Payment
            paymentCards={paymentCards}
            rebooking={true}
            isCompletePayment={{
              id: !timeslots?.length ? reBookJob._id : "",
              amount: reBookJob?.callOutFee,
              token,
            }}
          />
        )}
      </Row>
    </div>
  );
};

export default ReBook;
